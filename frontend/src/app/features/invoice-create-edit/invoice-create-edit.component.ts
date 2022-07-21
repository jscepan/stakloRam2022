import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerCreateEditPopupService } from '@features/settings/buyer-create-edit/buyer-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { UserWebService } from 'src/app/web-services/user.web-service';
import { InvoiceWebService } from 'src/app/web-services/invoice.web-service';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import { INVOICE_TYPES, WORK_ORDER_UOM } from 'src/app/shared/constants';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import { compareByValue, roundOnDigits } from 'src/app/shared/utils';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { Observable } from 'rxjs';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { InvoiceSelectionComponentService } from '@features/invoice-selection-popup/invoice-selection-component.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.component.html',
  styleUrls: ['./invoice-create-edit.component.scss'],
  providers: [
    InvoiceWebService,
    BuyerCreateEditPopupService,
    BuyerWebService,
    UserWebService,
    InvoiceSelectionComponentService,
    ListEntities,
  ],
})
export class InvoiceCreateEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  invoiceOID: string | null = null;
  invoice!: InvoiceModel;
  formGroup!: FormGroup;
  isEdit: boolean = false;
  typesOptions: EnumValueModel[] = INVOICE_TYPES;
  uomOptions: EnumValueModel[] = WORK_ORDER_UOM;
  settings?: AppSettings;

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: FormControl = new FormControl();
  selectedBuyer?: BuyerModel;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  get numberOfCashBillControl(): AbstractControl | null {
    return this.formGroup.get('numberOfCashBill');
  }

  isBuyerSelected?: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private webService: InvoiceWebService,
    private buyerWebService: BuyerWebService,
    private buyerCreateEditPopupService: BuyerCreateEditPopupService,
    private settingsStoreService: SettingsStoreService,
    private translateService: TranslateService,
    private invoiceSelectionComponentService: InvoiceSelectionComponentService,
    private listEntities: ListEntities<BuyerModel>
  ) {}

  ngOnInit(): void {
    this.invoiceOID = this.route.snapshot.paramMap.get('invoiceOID');

    this.subs.sink = this.listEntities
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();

          this.isEdit = !!this.invoiceOID;
          this.isEdit && this.invoiceOID
            ? this.webService
                .getEntityByOid(this.invoiceOID)
                .subscribe((invoice) => {
                  this.invoice = invoice;
                  this.initializeCreate(true);
                })
            : this.initializeCreate();
          this.isBuyerSelected = this.isEdit || false;
        }
      }
    );
  }

  initializeCreate(isEdit: boolean = false): void {
    if (isEdit) this.selectedBuyer = this.invoice.buyer;

    this.formGroup = new FormGroup({
      type: new FormControl(this.invoice?.type || this.typesOptions[0].value, [
        Validators.required,
      ]),
      number: new FormControl(this.invoice?.number || 0, [Validators.required]),
      dateOfCreate: new FormControl(
        this.invoice?.dateOfCreate || new Date().toISOString().substring(0, 10),
        [Validators.required]
      ),
      dateOfTurnover: new FormControl(
        this.invoice?.dateOfTurnover ||
          new Date().toISOString().substring(0, 10),
        [Validators.required]
      ),
      dateOfMaturity: new FormControl(
        this.invoice?.dateOfMaturity ||
          new Date().toISOString().substring(0, 10),
        [Validators.required]
      ),
      placeOfIssue: new FormControl(
        this.invoice?.placeOfIssue || this.settings?.invoicePlaceOfIssue || '',
        [Validators.required]
      ),
      methodOfPayment: new FormControl(
        this.invoice?.methodOfPayment || this.settings?.invoiceMethodOfPayment,
        [Validators.required]
      ),
      comment: new FormControl(this.invoice?.comment || '', []),
      netAmount: new FormControl(this.invoice?.netAmount || 0, [
        Validators.required,
        Validators.min(0.01),
      ]),
      vatRate: new FormControl(this.invoice?.vatRate || 0, [
        Validators.required,
      ]),
      vatAmount: new FormControl(this.invoice?.vatAmount || 0, [
        Validators.required,
      ]),
      grossAmount: new FormControl(this.invoice?.grossAmount || 0, [
        Validators.required,
        Validators.min(0.01),
      ]),
      currency: new FormControl(
        this.invoice?.currency || this.settings?.invoiceCurrency || '',
        [Validators.required]
      ),
      country: new FormControl(
        this.invoice?.country || this.settings?.invoiceCountry || '',
        [Validators.required]
      ),
      buyer: new FormControl(this.selectedBuyer || '', [Validators.required]),
      invoiceItems: new FormArray([]),
      notes: new FormArray([]),
    });
    if (this.formGroup.get('type')?.value === 'CASH') {
      this.formGroup.addControl(
        'numberOfCashBill',
        new FormControl(this.invoice.numberOfCashBill || '', [
          Validators.required,
        ])
      );
    }
    if (isEdit) {
      this.invoice.invoiceItems.forEach((item, index) =>
        this.addNewItem(index, item)
      );
    } else {
      this.setInvoiceNumber();
    }
  }

  selectBuyer(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  get invoiceItemsFormArr(): FormArray {
    return this.formGroup.get('invoiceItems') as FormArray;
  }

  // getTasksFormArr(invoiceItemIndex: number): FormArray {
  //   return this.invoiceItemsFormArr.controls[invoiceItemIndex].get(
  //     'tasks'
  //   ) as FormArray;
  // }

  addNewItem(index: number = 0, invoiceItem?: InvoiceItemModel): void {
    this.invoiceItemsFormArr.push(
      new FormGroup({
        oid: new FormControl(invoiceItem?.oid || ''),
        description: new FormControl(invoiceItem?.description || '', [
          Validators.required,
        ]),
        uom: new FormControl(invoiceItem?.uom || this.uomOptions[0].value, [
          Validators.required,
        ]),
        quantity: new FormControl(invoiceItem?.quantity || 0, [
          Validators.required,
          Validators.min(0),
        ]),
        pricePerUnit: new FormControl(invoiceItem?.pricePerUnit || 0, [
          Validators.required,
          Validators.min(0),
        ]),
        netPrice: new FormControl(invoiceItem?.netPrice || 0, [
          Validators.required,
          Validators.min(0),
        ]),
        vatRate: new FormControl(
          invoiceItem
            ? invoiceItem.vatRate
            : this.settings?.invoiceVatRate || 0,
          [Validators.required, Validators.min(0)]
        ),
        vatAmount: new FormControl(invoiceItem?.vatAmount || 0, [
          Validators.required,
          Validators.min(0),
        ]),
        grossPrice: new FormControl(invoiceItem?.grossPrice || 0, [
          Validators.required,
          Validators.min(0),
        ]),
        // tasks: new FormArray([]),
      })
    );
    // invoiceItem?.tasks.forEach((task) => {
    //   this.addNewTaskToInvoiceItem(index, task);
    // });
    this.calculateInvoiceAmount();
  }

  // addNewTaskToInvoiceItem(invoiceItemIndex: number, task: TaskModel): void {
  //   this.getTasksFormArr(invoiceItemIndex).push(
  //     new FormGroup({
  //       oid: new FormControl(task.oid),
  //       number: new FormControl(task.number),
  //       date: new FormControl(task.dateOfCreate),
  //       status: new FormControl(task.status),
  //       title: new FormControl(task.title),
  //       description: new FormControl(task.description),
  //       buyer: new FormControl(task.buyer),
  //       currentUser: new FormControl(task.currentUser),
  //     })
  //   );
  // }

  importTasks(index: number): void {
    // TODO
    console.log(index);
    //   const alreadyImportedTasks: string[] = [];
    //   this.invoiceItemsFormArr.controls.forEach((item, index) => {
    //     let taskControls = this.getTasksFormArr(index);
    //     taskControls.controls.forEach((task) => {
    //       alreadyImportedTasks.push(task.value.oid);
    //     });
    //   });

    //   this.tasksSelectionComponentService
    //     .openDialog(alreadyImportedTasks, this.formGroup.get('buyer')?.value.oid)
    //     .subscribe((tasks: TaskModel[]) => {
    //       if (tasks?.length) {
    //         tasks.forEach((task) => this.addNewTaskToInvoiceItem(index, task));
    //         let description = '';
    //         tasks.forEach((t, i) =>
    //           i > 0 ? (description += ', ' + t.title) : (description += t.title)
    //         );
    //         this.invoiceItemsFormArr.controls[index]
    //           .get('description')
    //           ?.setValue(
    //             this.invoiceItemsFormArr.controls[index].get('description')
    //               ?.value === ''
    //               ? this.invoiceItemsFormArr.controls[index].get('description')
    //                   ?.value + description
    //               : this.invoiceItemsFormArr.controls[index].get('description')
    //                   ?.value +
    //                   ', ' +
    //                   description
    //           );
    //       }
    //     });
  }

  // removeTaskFromInvoiceItem(invoiceItemIndex: number, taskIndex: number): void {
  //   this.getTasksFormArr(invoiceItemIndex).removeAt(taskIndex);
  // }

  buyerChanged(): void {
    setTimeout(() => {
      this.isBuyerSelected = this.formGroup.get('buyer')?.value;

      // // remove all invoice items which has tasks imported
      // for (let i = this.invoiceItemsFormArr.controls.length - 1; i >= 0; i--) {
      //   if (
      //     this.invoiceItemsFormArr.controls[i].value.tasks &&
      //     this.invoiceItemsFormArr.controls[i].value.tasks.length
      //   ) {
      //     this.invoiceItemsFormArr.removeAt(i);
      //   }
      // }
      if (this.invoiceItemsFormArr.controls.length === 0) {
        this.addNewItem();
      }
    });
  }

  removeItem(index: number): void {
    this.invoiceItemsFormArr.removeAt(index);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  handleSubmitButton(): void {
    this.setAllInvoiceAmounts();
    if (this.isEdit && this.invoiceOID) {
      this.webService
        .updateEntity(this.invoiceOID, this.formGroup.value)
        .subscribe((invoice) => {
          if (invoice) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('invoiceIsSuccessfullyUpdated')
            );
          }
        });
    } else {
      this.webService
        .createEntity(this.formGroup.value)
        .subscribe((invoice) => {
          if (invoice) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('newInvoiceIsSuccessfullyCreated')
            );
            window.open('print/invoice-view/' + invoice.oid);
            this.router.navigate(['invoices', 'edit', invoice.oid]);
          }
        });
    }
  }

  invoiceTypeChanged(type: string): void {
    setTimeout(() => {
      switch (type) {
        case 'CASH':
          this.formGroup.addControl(
            'numberOfCashBill',
            new FormControl('', [Validators.required])
          );
          this.formGroup
            .get('currency')
            ?.setValue(this.settings?.invoiceCurrency);
          break;
        case 'FOREIGN':
          this.formGroup.get('currency')?.setValue('EUR');
          break;
        default:
          this.formGroup.removeControl('numberOfCashBill');
          this.formGroup
            .get('currency')
            ?.setValue(this.settings?.invoiceCurrency);
      }
      if (!this.isEdit) {
        this.setInvoiceNumber();
      }
    });
  }

  setInvoiceNumber(): void {
    this.webService
      .getNextInvoiceNumber(
        this.formGroup.get('type')?.value,
        this.formGroup.get('dateOfCreate')?.value
      )
      .subscribe((number) => {
        this.formGroup
          .get('number')
          ?.setValue(
            number +
              '/' +
              new Date(this.formGroup.get('dateOfCreate')?.value)
                .getFullYear()
                .toString()
          );
      });
  }

  createBuyer(): void {
    this.buyerCreateEditPopupService.openDialog().subscribe((buyer) => {
      if (buyer) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  calculateInvoiceItemAmount(index: number, formControlName: string): void {
    let netPriceControl =
      this.invoiceItemsFormArr.controls[index].get('netPrice');
    let netPrice: number = netPriceControl?.value * 1;
    let vatRateControl =
      this.invoiceItemsFormArr.controls[index].get('vatRate');
    let vatRate: number = vatRateControl?.value * 1;
    let vatAmountControl =
      this.invoiceItemsFormArr.controls[index].get('vatAmount');
    let vatAmount: number = vatAmountControl?.value * 1;
    let grossPriceControl =
      this.invoiceItemsFormArr.controls[index].get('grossPrice');
    let grossPrice: number = grossPriceControl?.value * 1;
    switch (formControlName) {
      case 'netPrice':
        vatAmount = (netPrice * vatRate) / 100;
        vatAmountControl?.setValue(vatAmount);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'vatRate':
        vatAmountControl?.setValue((netPrice * vatRate) / 100);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'vatAmount':
        netPriceControl?.setValue((vatAmount * 100) / vatRate);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'grossPrice':
        vatAmountControl?.setValue((grossPrice * vatRate) / (100 + vatRate));
        netPriceControl?.setValue(grossPrice - vatAmount);
        break;
    }
    this.calculateInvoiceAmount();
  }

  calculateInvoiceAmount(): void {
    setTimeout(() => {
      let netAmount = 0;
      let vatRate = 0;
      let vatAmount = 0;
      let grossAmount = 0;
      this.invoiceItemsFormArr.value.forEach((element: InvoiceItemModel) => {
        netAmount += element.netPrice;
        vatRate += element.vatRate;
        vatAmount += element.vatAmount;
        grossAmount += element.grossPrice;
      });
      this.formGroup.get('netAmount')?.setValue(roundOnDigits(netAmount));
      this.formGroup
        .get('vatRate')
        ?.setValue(roundOnDigits(vatRate / this.invoiceItemsFormArr.length));
      this.formGroup.get('vatAmount')?.setValue(roundOnDigits(vatAmount));
      this.formGroup.get('grossAmount')?.setValue(roundOnDigits(grossAmount));
    });
  }

  setAllInvoiceAmounts(): void {
    this.invoiceItemsFormArr.controls.forEach((element) => {
      const grossPrice: number = element.get('grossPrice')?.value * 1;
      const vatAmount: number = element.get('vatAmount')?.value * 1;
      const vatRate: number = element.get('vatRate')?.value * 1;
      element.get('grossPrice')?.setValue(roundOnDigits(grossPrice));
      element
        .get('vatAmount')
        ?.setValue(roundOnDigits((grossPrice * vatRate) / (100 + vatRate)));
      element.get('netPrice')?.setValue(roundOnDigits(grossPrice - vatAmount));
    });
    this.calculateInvoiceAmount();
  }

  autoImport(): void {
    // TODO
    //   this.subs.sink = this.taskWebService
    //     .searchEntities(new SearchModel(), 0, 9999)
    //     .subscribe((response) => {
    //       if (response && response.totalCount > 0) {
    //         response.entities.forEach((task, index) => {
    //           let invoiceItem = new InvoiceItemModel();
    //           invoiceItem.description = task.title;
    //           this.addNewItem(index, invoiceItem);
    //         });
    //       }
    //     });
  }

  searchHandler(text: any): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
  }

  // importInvoiceFrom(type: 'advanceInvoice' | 'preInvoice'): void {
  //   if (type === 'advanceInvoice') {
  //     this.invoiceSelectionComponentService
  //       .openDialog('ADVANCE_INVOICE', this.formGroup.get('buyer')?.value.oid)
  //       .subscribe((invoices: InvoiceModel[]) => {
  //         // if (tasks?.length) {
  //         //   tasks.forEach((task) => this.addNewTaskToInvoiceItem(index, task));
  //         //   let description = '';
  //         //   tasks.forEach((t, i) =>
  //         //     i > 0 ? (description += ', ' + t.title) : (description += t.title)
  //         //   );
  //         //   this.invoiceItemsFormArr.controls[index]
  //         //     .get('description')
  //         //     ?.setValue(
  //         //       this.invoiceItemsFormArr.controls[index].get('description')
  //         //         ?.value === ''
  //         //         ? this.invoiceItemsFormArr.controls[index].get('description')
  //         //             ?.value + description
  //         //         : this.invoiceItemsFormArr.controls[index].get('description')
  //         //             ?.value +
  //         //             ', ' +
  //         //             description
  //         //     );
  //         // }
  //       });
  //     //
  //   } else {
  //     //
  //   }
  // }

  bottomReachedHandlerBuyers(): void {
    this.listEntities.requestNextPage();
  }

  consolidateAllDates(): void {
    this.formGroup
      .get('dateOfTurnover')
      ?.setValue(this.formGroup.get('dateOfCreate')?.value);
    this.formGroup
      .get('dateOfMaturity')
      ?.setValue(this.formGroup.get('dateOfCreate')?.value);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
