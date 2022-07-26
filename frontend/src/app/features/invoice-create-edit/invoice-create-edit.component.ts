import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerCreateEditPopupService } from '@features/views/buyer-create-edit/buyer-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { UserWebService } from 'src/app/web-services/user.web-service';
import { InvoiceWebService } from 'src/app/web-services/invoice.web-service';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import { INVOICE_TYPES, UOM_TYPES } from 'src/app/shared/constants';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import {
  compareByValue,
  getWorkOrderNumber,
  roundOnDigits,
} from 'src/app/shared/utils';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { Observable } from 'rxjs';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { InvoiceSelectionComponentService } from '@features/invoice-selection-popup/invoice-selection-component.service';
import { MatSelectChange } from '@angular/material/select';
import { map, startWith } from 'rxjs/operators';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { WorkOrderItemModel } from 'src/app/shared/models/work-order-item';
import { WorkOrderSelectionComponentService } from '@features/work-order-selection-popup/work-order-selection-component.service';

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
    WorkOrderWebService,
    WorkOrderSelectionComponentService,
  ],
})
export class InvoiceCreateEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  invoiceOID: string | null = null;
  invoice!: InvoiceModel;
  formGroup!: FormGroup;
  isEdit: boolean = false;
  typesOptions: EnumValueModel[] = INVOICE_TYPES;
  uomOptions: EnumValueModel[] = UOM_TYPES;
  settings?: AppSettings;
  invoiceItemsOptions: string[] = [];
  filteredOptions: (Observable<string[]> | undefined)[] = [];

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: FormControl = new FormControl();
  selectedBuyer?: BuyerModel;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  get numberOfCashBillControl(): AbstractControl | null {
    return this.formGroup.get('numberOfCashBill');
  }

  getDescription(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('description');
  }
  getUOM(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('uom');
  }
  getQuantity(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('quantity');
  }
  getPricePerUnit(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('pricePerUnit');
  }
  getNetPrice(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('netPrice');
  }
  getVatRate(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('vatRate');
  }
  getVatAmount(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('vatAmount');
  }
  getGrossPrice(index: number): AbstractControl | null {
    return this.invoiceItemsFormArr.controls[index].get('grossPrice');
  }
  getWorkOrderItemsFormArr(invoiceItemIndex: number): FormArray {
    return this.invoiceItemsFormArr.controls[invoiceItemIndex].get(
      'workOrderItems'
    ) as FormArray;
  }

  isBuyerSelected?: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private webService: InvoiceWebService,
    private workOrderWebService: WorkOrderWebService,
    private buyerWebService: BuyerWebService,
    private buyerCreateEditPopupService: BuyerCreateEditPopupService,
    private settingsStoreService: SettingsStoreService,
    private translateService: TranslateService,
    private invoiceSelectionComponentService: InvoiceSelectionComponentService,
    private listEntities: ListEntities<BuyerModel>,
    private el: ElementRef,
    private workOrderSelectionComponentService: WorkOrderSelectionComponentService
  ) {}

  ngOnInit(): void {
    this.invoiceOID = this.route.snapshot.paramMap.get('invoiceOID');
    const workOrderOID = this.route.snapshot.paramMap.get('workOrderOID');

    this.subs.sink = this.webService
      .getAllInvoiceItemDescriptions()
      .subscribe((options) => {
        this.invoiceItemsOptions = options;
      });

    this.subs.sink = this.listEntities
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();

          this.isEdit = !!this.invoiceOID;
          if (this.isEdit && this.invoiceOID) {
            this.webService
              .getEntityByOid(this.invoiceOID)
              .subscribe((invoice) => {
                this.invoice = invoice;
                this.initializeCreate(true);
              });
            this.isBuyerSelected = true;
          } else {
            this.initializeCreate();
            if (workOrderOID) {
              this.workOrderWebService
                .getEntityByOid(workOrderOID)
                .subscribe((workOrder) => {
                  this.selectedBuyer = workOrder.buyer;
                  this.addWorkOrderToNewInvoiceItem(workOrder);
                });
              this.isBuyerSelected = true;
            } else {
              this.isBuyerSelected = false;
            }
          }
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
      this.invoice.invoiceItems.forEach((item, index) => this.addNewItem(item));
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

  addNewItem(invoiceItem?: InvoiceItemModel): void {
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
        workOrderItems: new FormArray([]),
      })
    );
    setTimeout(() => {
      const filterOpt = this.getDescription(
        this.invoiceItemsFormArr.length - 1
      )?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
      this.filteredOptions.push(filterOpt);
    });
    invoiceItem?.workOrderItems.forEach((woi) => {
      this.addNewWorkOrderItemToInvoiceItem(
        this.invoiceItemsFormArr.length - 1,
        woi
      );
    });
    this.calculateInvoiceAmount();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.invoiceItemsOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private addWorkOrderToNewInvoiceItem(workOrder: WorkOrderModel): void {
    const invoiceItems: InvoiceItemModel[] = [];
    const excludedOids = this.getAllImportedWorkOrderItemOIDS();

    workOrder.workOrderItems.forEach((woi) => {
      if (!excludedOids.includes(woi.oid)) {
        let invoiceItem: InvoiceItemModel = {
          oid: '',
          description: woi.description,
          uom: woi.uom,
          quantity: woi.sumQuantity,
          pricePerUnit: 0,
          netPrice: 0,
          vatRate: this.settings?.invoiceVatRate || 20,
          vatAmount: 0,
          grossPrice: 0,
          workOrderItems: [woi],
        };
        const alreadyExists: InvoiceItemModel = invoiceItems.filter(
          (item) =>
            item.description === invoiceItem.description &&
            item.uom === invoiceItem.uom
        )[0];
        if (alreadyExists) {
          alreadyExists.quantity =
            alreadyExists.quantity + invoiceItem.quantity;
          alreadyExists.workOrderItems.push(woi);
        } else {
          invoiceItems.push(invoiceItem);
        }
      }
    });
    invoiceItems.forEach((item) => {
      this.addNewItem(item);
    });
    this.addWorkOrderToComment(workOrder);
  }

  private addWorkOrderItemsToNewInvoiceItem(
    workOrderItems: WorkOrderItemModel[],
    workOrder: WorkOrderModel
  ): void {
    const invoiceItems: InvoiceItemModel[] = [];

    workOrderItems.forEach((woi) => {
      let invoiceItem: InvoiceItemModel = {
        oid: '',
        description: woi.description,
        uom: woi.uom,
        quantity: woi.sumQuantity,
        pricePerUnit: 0,
        netPrice: 0,
        vatRate: this.settings?.invoiceVatRate || 20,
        vatAmount: 0,
        grossPrice: 0,
        workOrderItems: [woi],
      };
      const alreadyExists: InvoiceItemModel = invoiceItems.filter(
        (item) => item.uom === invoiceItem.uom
      )[0];
      if (alreadyExists) {
        alreadyExists.quantity = alreadyExists.quantity + invoiceItem.quantity;
        alreadyExists.workOrderItems.push(woi);
      } else {
        invoiceItems.push(invoiceItem);
      }
    });
    invoiceItems.forEach((item) => {
      this.addNewItem(item);
    });
    this.addWorkOrderToComment(workOrder);
  }

  private addWorkOrderToComment(workOrder: WorkOrderModel): void {
    const commentControl = this.formGroup.get('comment');
    if (commentControl?.value.length) {
      commentControl.setValue(
        commentControl.value + ', ' + getWorkOrderNumber(workOrder)
      );
    } else {
      commentControl?.setValue(
        this.translateService.instant('attachmentWorkOrderNumber') +
          ' ' +
          getWorkOrderNumber(workOrder)
      );
    }
  }

  addNewWorkOrderItemToInvoiceItem(
    invoiceItemIndex: number,
    workOrderItem: WorkOrderItemModel
  ): void {
    this.getWorkOrderItemsFormArr(invoiceItemIndex).push(
      new FormGroup({
        oid: new FormControl(workOrderItem.oid),
        description: new FormControl(workOrderItem.description),
        uom: new FormControl(workOrderItem.uom),
        dimension1: new FormControl(workOrderItem.dimension1),
        dimension2: new FormControl(workOrderItem.dimension2),
        dimension3: new FormControl(workOrderItem.dimension3),
        quantity: new FormControl(workOrderItem.quantity),
        sumQuantity: new FormControl(workOrderItem.sumQuantity),
        note: new FormControl(workOrderItem.note),
      })
    );
  }

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

    // this.workOrderSelectionComponentService
    //   .openDialog(this.selectedBuyer?.oid || '', excludedOids)
    //   .subscribe((workOrders: WorkOrderModel[]) => {
    //     console.log('workOrders');
    //     console.log(workOrders);
    // if (workOrder as WorkOrderModel) {
    //   this.addWorkOrderToNewInvoiceItem(<WorkOrderModel>workOrder);
    // } else {
    //   // this.addWorkOrderItemsToNewInvoiceItem(workOrder,)
    // }
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
    // });
  }

  removeWorkOrderItemFromInvoiceItem(
    invoiceItemIndex: number,
    workOrderItemIndex: number
  ): void {
    this.getWorkOrderItemsFormArr(invoiceItemIndex).removeAt(
      workOrderItemIndex
    );
  }

  buyerChanged(): void {
    setTimeout(() => {
      this.isBuyerSelected = this.formGroup.get('buyer')?.value;

      // remove all invoice items which has workOrderItems imported
      for (let i = this.invoiceItemsFormArr.controls.length - 1; i >= 0; i--) {
        if (
          this.invoiceItemsFormArr.controls[i].value.workOrderItems &&
          this.invoiceItemsFormArr.controls[i].value.workOrderItems.length
        ) {
          this.invoiceItemsFormArr.removeAt(i);
        }
      }
      this.setFocusOn('dateOfCreate');
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
          setTimeout(() => {
            this.setFocusOn('numberOfCashBill');
          });
          break;
        case 'FOREIGN':
          this.formGroup.get('currency')?.setValue('EUR');
          break;
        default:
          this.formGroup.removeControl('numberOfCashBill');
          this.formGroup
            .get('currency')
            ?.setValue(this.settings?.invoiceCurrency);
          this.setFocusOn('currency');
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
    let quantityControl =
      this.invoiceItemsFormArr.controls[index].get('quantity');
    let quantity: number = quantityControl?.value * 1;
    let pricePerUnitControl =
      this.invoiceItemsFormArr.controls[index].get('pricePerUnit');
    let pricePerUnit: number = pricePerUnitControl?.value * 1;
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
      case 'quantity':
        netPrice = quantity * pricePerUnit;
        netPriceControl?.setValue(netPrice);
        vatAmount = (netPrice * vatRate) / 100;
        vatAmountControl?.setValue(vatAmount);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'pricePerUnit':
        netPrice = quantity * pricePerUnit;
        netPriceControl?.setValue(netPrice);
        vatAmount = (netPrice * vatRate) / 100;
        vatAmountControl?.setValue(vatAmount);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'netPrice':
        if (quantity <= 0) {
          quantity = 1;
          quantityControl?.setValue(quantity);
        }
        pricePerUnit = netPrice / quantity;
        pricePerUnitControl?.setValue(pricePerUnit);
        vatAmount = (netPrice * vatRate) / 100;
        vatAmountControl?.setValue(vatAmount);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'vatRate':
        vatAmount = (netPrice * vatRate) / 100;
        vatAmountControl?.setValue(vatAmount);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'vatAmount':
        netPrice = (vatAmount * 100) / vatRate;
        netPriceControl?.setValue(netPrice);
        if (quantity <= 0) {
          quantity = 1;
          quantityControl?.setValue(quantity);
        }
        pricePerUnit = netPrice / quantity;
        pricePerUnitControl?.setValue(pricePerUnit);
        grossPriceControl?.setValue(netPrice + vatAmount);
        break;
      case 'grossPrice':
        vatAmount = (grossPrice * vatRate) / (100 + vatRate);
        vatAmountControl?.setValue(vatAmount);
        netPrice = grossPrice - vatAmount;
        netPriceControl?.setValue(netPrice);
        if (quantity <= 0) {
          quantity = 1;
          quantityControl?.setValue(quantity);
        }
        pricePerUnit = netPrice / quantity;
        pricePerUnitControl?.setValue(pricePerUnit);
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
    const excludedOids: string[] = [];
    this.workOrderSelectionComponentService
      .openDialog(this.selectedBuyer?.oid || '', excludedOids)
      .subscribe((workOrders: WorkOrderModel[] | undefined) => {
        workOrders?.forEach((wo) => {
          this.workOrderWebService
            .getEntityByOid(wo.oid)
            .subscribe((workOrder) => {
              this.addWorkOrderToNewInvoiceItem(workOrder);
            });
        });
      });
  }

  private getAllImportedWorkOrderItemOIDS(): string[] {
    const excludedOids: string[] = [];
    this.invoiceItemsFormArr.controls.forEach((invItem, index) => {
      this.getWorkOrderItemsFormArr(index).controls.forEach((woi) => {
        excludedOids.push(woi.value.oid);
      });
    });
    return excludedOids;
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

  onKeypress(event: KeyboardEvent, input: string, index: number = -1): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      switch (input) {
        case 'numberOfCashBill':
          this.setFocusOn('currency');
          break;
        case 'currency':
          this.setFocusOn('number');
          break;
        case 'number':
          this.setFocusOn('buyer');
          break;
        case 'dateOfCreate':
          this.setFocusOn('dateOfTurnover');
          break;
        case 'dateOfTurnover':
          this.setFocusOn('dateOfMaturity');
          break;
        case 'dateOfMaturity':
          this.setFocusOn('country');
          break;
        case 'country':
          this.setFocusOn('placeOfIssue');
          break;
        case 'placeOfIssue':
          this.setFocusOn('methodOfPayment');
          break;
        case 'methodOfPayment':
          this.setFocusOn('description', 0, true);
          break;
        case 'description':
          this.setFocusOn('uom', index);
          break;
        case 'uom':
          this.setFocusOn('quantity', index, true);
          break;
        case 'quantity':
          this.setFocusOn('pricePerUnit', index, true);
          break;
        case 'pricePerUnit':
          this.setFocusOn('netPrice', index, true);
          break;
        case 'netPrice':
          this.setFocusOn('vatRate', index, true);
          break;
        case 'vatRate':
          this.setFocusOn('vatAmount', index, true);
          break;
        case 'vatAmount':
          this.setFocusOn('grossPrice', index, true);
          break;
        case 'grossPrice':
          if (this.invoiceItemsFormArr.length === index + 1) {
            this.addNewItem();
          }
          setTimeout(() => {
            this.setFocusOn('description', index + 1);
          });
          break;
      }
    }
  }

  setFocusOn(
    formControlName: string,
    index: number = 0,
    markAll: boolean = false
  ): void {
    const element = this.el.nativeElement.querySelectorAll(
      '[formcontrolname="' + formControlName + '"]'
    )[index < 0 ? 0 : index];
    element?.focus();
    if (markAll) element.select();
  }

  openedToggleOnUomSelect(isOppened: boolean, index: number): void {
    if (!isOppened && this.getUOM(index)?.value) {
      this.uomChanged(this.getUOM(index)?.value, index);
    }
  }

  uomChanged(uom: string, index: number): void {
    setTimeout(() => {
      this.setFocusOn('quantity', index, true);
    });
    // this.getSumQuantity(index);
    // this.calculateSum();
  }

  getFilteredOptions(index: number): Observable<string[]> | undefined {
    return this.filteredOptions[index];
  }

  getUOMDisplayValue(uom: string): string {
    return this.uomOptions.filter((u) => u.value === uom)[0].displayName;
  }

  getInvoiceItemitemOid(_index: number, control: AbstractControl): string {
    return control.value.oid + _index;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
