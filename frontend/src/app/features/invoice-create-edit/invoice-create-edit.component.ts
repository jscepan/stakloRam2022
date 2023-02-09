import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
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
  getUOMDisplayValue,
  getWorkOrderNumber,
  roundOnDigits,
} from 'src/app/shared/utils';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { Observable, Subscription } from 'rxjs';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { WorkOrderItemModel } from 'src/app/shared/models/work-order-item';
import { WorkOrderSelectionComponentService } from '@features/work-order-selection-popup/work-order-selection-component.service';
import { WorkOrderItemSelectionComponentService } from '@features/work-order-item-selection-popup/work-order-item-selection-component.service';
import { NoteModel } from 'src/app/shared/models/note.model';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import {
  SweetAlertI,
  SweetAlertTypeEnum,
} from 'src/app/shared/components/sweet-alert/sweet-alert.interface';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.component.html',
  styleUrls: ['./invoice-create-edit.component.scss'],
  providers: [
    InvoiceWebService,
    BuyerCreateEditPopupService,
    BuyerWebService,
    UserWebService,
    ListEntities,
    WorkOrderWebService,
    WorkOrderSelectionComponentService,
    WorkOrderItemSelectionComponentService,
  ],
})
export class InvoiceCreateEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  invoiceOID: string | null = null;
  invoice!: InvoiceModel;
  preInvoice!: InvoiceModel;
  advanceInvoice!: InvoiceModel;
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
  isInvoiceTaxFree: boolean = false;

  allowChangeBuyer: boolean = false;
  selectedBuyerOnChange?: BuyerModel;
  buyersEntitiesOnChange: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoadingOnChange?: Observable<boolean> = this.listEntities.isLoading;
  searchControlOnChange: FormControl = new FormControl();

  private inputSearchControlSubscription!: Subscription;
  private inputSearchControlOnChangeSubscription!: Subscription;
  @Input() debounceTime: number = 500;

  getUOMDisplayValue = getUOMDisplayValue;

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

  get invoiceItemsFormArr(): FormArray {
    return this.formGroup.get('invoiceItems') as FormArray;
  }

  get notesFormArr(): FormArray {
    return this.formGroup.get('notes') as FormArray;
  }

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
    private listEntities: ListEntities<BuyerModel>,
    private listEntitiesOnChange: ListEntities<BuyerModel>,
    private el: ElementRef,
    private workOrderSelectionComponentService: WorkOrderSelectionComponentService,
    private workOrderItemSelectionComponentService: WorkOrderItemSelectionComponentService,
    private sweetAlertService: SweetAlertService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.invoiceOID = this.route.snapshot.paramMap.get('invoiceOID');
    const workOrderOID = this.route.snapshot.queryParamMap.get('workOrderOID');
    const preInvoiceOID =
      this.route.snapshot.queryParamMap.get('preInvoiceOID');
    const advanceInvoiceOID =
      this.route.snapshot.queryParamMap.get('advanceInvoiceOID');

    this.subs.sink = this.webService
      .getAllInvoiceItemDescriptions()
      .subscribe((options) => {
        this.invoiceItemsOptions = options;
      });

    this.subs.sink = this.listEntities
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    if (this.isEdit) {
      this.subs.sink = this.listEntitiesOnChange
        .setWebService(this.buyerWebService)
        .requestFirstPage();
    }

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();

          this.isEdit = !!this.invoiceOID;
          if (this.isEdit && this.invoiceOID) {
            this.subs.sink = this.webService
              .getEntityByOid(this.invoiceOID)
              .subscribe((invoice) => {
                this.invoice = invoice;
                if (this.invoice.preInvoiceOid) {
                  this.subs.sink = this.webService
                    .getEntityByOid(this.invoice.preInvoiceOid)
                    .subscribe((inv) => {
                      this.preInvoice = inv;
                    });
                }
                if (this.invoice.advanceInvoiceOid) {
                  this.subs.sink = this.webService
                    .getEntityByOid(this.invoice.advanceInvoiceOid)
                    .subscribe((inv) => {
                      this.preInvoice = inv;
                    });
                }
                this.initializeCreate();
              });
          } else {
            this.initializeCreate();
            if (workOrderOID) {
              this.workOrderWebService
                .getEntityByOid(workOrderOID)
                .subscribe((workOrder) => {
                  this.formGroup.get('buyer')?.setValue(workOrder.buyer);
                  this.selectedBuyer = workOrder.buyer;
                  this.addWorkOrderToNewInvoiceItem([workOrder]);
                });
            } else if (preInvoiceOID) {
              this.importInvoiceFrom('preInvoice', preInvoiceOID);
            } else if (advanceInvoiceOID) {
              this.importInvoiceFrom('advanceInvoice', advanceInvoiceOID);
            }
          }
        }
      }
    );

    this.inputSearchControlSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe(() => {
        this.searchHandler(this.searchControl.value);
      });

    this.inputSearchControlOnChangeSubscription =
      this.searchControlOnChange.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe(() => {
          this.searchHandlerOnChange(this.searchControlOnChange.value);
        });
  }

  hasPrivilege(privilege: string): boolean {
    return this.authStoreService.isAllowed(privilege);
  }

  initializeCreate(isFinalInvoice: boolean = false): void {
    if (this.isEdit) this.selectedBuyer = this.invoice.buyer;

    this.formGroup = new FormGroup({
      type: new FormControl(
        isFinalInvoice
          ? this.typesOptions[5].value
          : this.invoice?.type || this.typesOptions[0].value,
        [Validators.required]
      ),
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
      preInvoiceOid: new FormControl(this.preInvoice?.oid),
      advanceInvoiceOid: new FormControl(this.advanceInvoice?.oid),
      advancePayAmount: new FormControl(
        this.invoice?.advancePayAmount || this.advanceInvoice?.grossAmount || 0
      ),
    });
    if (this.formGroup.get('type')?.value === 'CASH') {
      this.formGroup.addControl(
        'numberOfCashBill',
        new FormControl(this.invoice.numberOfCashBill || '', [
          Validators.required,
        ])
      );
    }
    if (this.isEdit) {
      this.invoice.invoiceItems.forEach((item) => this.addNewItem(item));
      this.invoice.notes.forEach((item) => this.addNote(item));
    } else {
      this.setInvoiceNumber();
    }
  }

  selectBuyer(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  selectBuyerOnChange(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyerOnChange = event.value;
      this.subs.sink.$markWorkOrder = this.sweetAlertService
        .getDataBackFromSweetAlert()
        .subscribe((data) => {
          if (
            data &&
            data.confirmed &&
            this.invoiceOID &&
            this.selectedBuyerOnChange?.oid
          ) {
            this.subs.sink = this.webService
              .changeBuyer(this.invoiceOID, this.selectedBuyerOnChange?.oid)
              .subscribe((changed) => {
                if (changed) {
                  this.globalService.showBasicAlert(
                    MODE.success,
                    this.translateService.instant('successfully'),
                    this.translateService.instant(
                      'invoiceIsSuccessfullyUpdated'
                    )
                  );
                  window.location.reload();
                }
              });
          }
        });
      const sweetAlertModel: SweetAlertI = {
        mode: 'warning',
        icon: 'alert-triangle',
        type: {
          name: SweetAlertTypeEnum.submit,
          buttons: {
            submit: this.translateService.instant('change'),
            cancel: this.translateService.instant('cancel'),
          },
        },
        title: this.translateService.instant('changeBuyer'),
        message: this.translateService.instant(
          'areYouSureYouWantToAllowChangeOfBuyerWithAllConsequences'
        ),
      };
      this.sweetAlertService.openMeSweetAlert(sweetAlertModel);
    }
  }

  isBuyerSelected(): boolean {
    return !!this.formGroup.get('buyer')?.value;
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
            : (this.isInvoiceTaxFree ? 0 : this.settings?.invoiceVatRate) || 0,
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
        [woi]
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

  private addWorkOrderToNewInvoiceItem(workOrders: WorkOrderModel[]): void {
    const invoiceItems: InvoiceItemModel[] = [];
    const excludedOids = this.getAllImportedWorkOrderItemOIDS();
    workOrders.forEach((workOrder) => {
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
      this.addWorkOrderToComment(workOrder);
    });
    invoiceItems.forEach((item) => {
      this.addNewItem(item);
    });
  }

  private addWorkOrderToComment(workOrder: WorkOrderModel): void {
    const commentControl = this.formGroup.get('comment');
    if (
      commentControl?.value.length &&
      !commentControl?.value.includes(getWorkOrderNumber(workOrder))
    ) {
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
    workOrderItems: WorkOrderItemModel[]
  ): void {
    workOrderItems.forEach((workOrderItem) => {
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
    });
  }

  importWorkOrderItems(index: number): void {
    this.workOrderItemSelectionComponentService
      .openDialog(
        this.selectedBuyer?.oid || '',
        this.getAllImportedWorkOrderItemOIDS()
      )
      .subscribe((wos: WorkOrderModel[] | undefined) => {
        if (wos) {
          const invoiceItems: InvoiceItemModel[] = [];

          wos.forEach((workOrder) => {
            workOrder.workOrderItems.forEach((woi) => {
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
                if (!alreadyExists.description.includes(woi.description)) {
                  alreadyExists.description =
                    alreadyExists.description + ', ' + woi.description;
                } else {
                  alreadyExists.description = woi.description;
                }
                alreadyExists.quantity =
                  alreadyExists.quantity + invoiceItem.quantity;
                alreadyExists.workOrderItems.push(woi);
              } else {
                invoiceItems.push(invoiceItem);
              }
            });
          });
          invoiceItems.forEach((item, i) => {
            const currDesc: string = this.getDescription(index)?.value;
            if (
              (!currDesc && this.getQuantity(index)?.value === 0) ||
              (this.getDescription(index)?.value.includes(item.description) &&
                this.getUOM(index)?.value === item.uom)
            ) {
              // PUT in current invoiceItem else create new
              if (!currDesc.includes(item.description)) {
                this.getDescription(index)?.setValue(
                  currDesc.length ? ', ' + item.description : item.description
                );
              }
              this.getUOM(index)?.setValue(item.uom);
              this.getQuantity(index)?.setValue(
                this.getQuantity(index)?.value + item.quantity
              );
              this.addNewWorkOrderItemToInvoiceItem(index, item.workOrderItems);
            } else {
              this.addNewItem(item);
            }
          });
          wos.forEach((workOrder) => {
            this.addWorkOrderToComment(workOrder);
          });
        }
      });
  }

  removeWorkOrderItemFromInvoiceItem(
    invoiceItemIndex: number,
    workOrderItemIndex: number
  ): void {
    this.getWorkOrderItemsFormArr(invoiceItemIndex).removeAt(
      workOrderItemIndex
    );
    this.formGroup.markAsDirty();
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
    this.calculateInvoiceAmount();
    this.formGroup.markAsDirty();
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
            window.open('#/print/invoice-view/' + invoice.oid);
            this.router.navigate(['invoices', 'edit', invoice.oid]);
          }
        });
    }
  }

  invoiceTypeChanged(type: string): void {
    setTimeout(() => {
      this.formGroup.get('comment')?.setValue('');
      if (type !== 'FOREIGN' && this.notesFormArr.controls.length) {
        for (let i = this.notesFormArr.controls.length - 1; i >= 0; i--) {
          this.removeNote(i);
        }
      }
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
          this.formGroup
            .get('methodOfPayment')
            ?.setValue(this.settings?.invoiceMethodOfPaymentForCashBill);
          break;
        case 'FOREIGN':
          this.formGroup.get('currency')?.setValue('EUR');
          this.formGroup
            .get('comment')
            ?.setValue(this.settings?.invoiceForeignNote);
          this.settings?.invoiceForeignNotes?.forEach((note) => {
            this.addNote({ oid: '', name: note.key, description: note.value });
          });
          this.formGroup
            .get('methodOfPayment')
            ?.setValue(this.settings?.invoiceMethodOfPayment);
          break;
        case 'FINAL':
          this.globalService.showBasicAlert(
            MODE.error,
            this.translateService.instant('invoiceTypeError'),
            this.translateService.instant(
              'finalInvoiceCanBeSelectedOnlyFromAdvanceInvoice'
            )
          );
          this.formGroup.get('type')?.setValue(this.typesOptions[0].value);
          this.invoiceTypeChanged(this.typesOptions[0].value);
          break;
        default:
          this.formGroup.removeControl('numberOfCashBill');
          this.formGroup
            .get('currency')
            ?.setValue(this.settings?.invoiceCurrency);
          this.setFocusOn('currency');
          this.formGroup
            .get('methodOfPayment')
            ?.setValue(this.settings?.invoiceMethodOfPayment);
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

  changeIsInvoiceTaxFree(): void {
    const commentCtrl = this.formGroup.get('comment');
    const comment: string = commentCtrl?.value || '';
    if (this.isInvoiceTaxFree) {
      this.invoiceItemsFormArr.controls.forEach((control, index) => {
        control.get('vatRate')?.setValue(0);
        this.calculateInvoiceItemAmount(index, 'vatRate');
      });
      if (
        !(
          this.settings?.invoiceTaxFreeText &&
          comment.includes(this.settings?.invoiceTaxFreeText)
        )
      ) {
        commentCtrl?.setValue(
          comment +
            (comment.length > 0 ? ', ' : '') +
            this.settings?.invoiceTaxFreeText
        );
      }
    } else {
      this.invoiceItemsFormArr.controls.forEach((control, index) => {
        control.get('vatRate')?.setValue(this.settings?.invoiceVatRate);
        this.calculateInvoiceItemAmount(index, 'vatRate');
      });
      if (
        this.settings?.invoiceTaxFreeText &&
        comment.includes(this.settings.invoiceTaxFreeText)
      ) {
        commentCtrl?.setValue(
          comment.replace(this.settings.invoiceTaxFreeText, '')
        );
      }
    }
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
        if (workOrders) {
          this.addWorkOrderToNewInvoiceItem(workOrders);
        }
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

  searchHandlerOnChange(text: any): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntitiesOnChange.setFilter(searchFilter);
  }

  importInvoiceFrom(
    type: 'advanceInvoice' | 'preInvoice',
    invoiceOID: string
  ): void {
    this.webService.getEntityByOid(invoiceOID).subscribe((previousInvoice) => {
      type === 'advanceInvoice'
        ? (this.advanceInvoice = previousInvoice)
        : (this.preInvoice = previousInvoice);
      this.selectedBuyer = previousInvoice.buyer;
      this.initializeCreate(type === 'advanceInvoice');
      this.formGroup.get('comment')?.setValue(
        this.formGroup.get('comment')?.value +
          this.translateService.instant(
            type === 'advanceInvoice'
              ? 'invoiceCreatedOnAdvanceInvoice'
              : 'invoiceCreatedOnPreInvoice',
            {
              invoiceNumber: previousInvoice.number,
              invoiceDate:
                new Date(previousInvoice.dateOfCreate).getDay() +
                '/' +
                new Date(previousInvoice.dateOfCreate).getMonth() +
                '/' +
                new Date(previousInvoice.dateOfCreate).getFullYear(),
            }
          )
      );
      previousInvoice.invoiceItems.forEach((item, index) => {
        item.oid = '';
        item.workOrderItems = [];
        this.addNewItem(item);
      });
      this.formGroup.markAsDirty();
    });
  }

  bottomReachedHandlerBuyers(): void {
    this.listEntities.requestNextPage();
  }

  bottomReachedHandlerBuyersOnChange(): void {
    this.listEntitiesOnChange.requestNextPage();
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
  }

  getFilteredOptions(index: number): Observable<string[]> | undefined {
    return this.filteredOptions[index];
  }

  addNote(note?: NoteModel): void {
    this.notesFormArr.push(
      new FormGroup({
        oid: new FormControl(note?.oid || ''),
        name: new FormControl(note?.name || '', [Validators.required]),
        description: new FormControl(note?.description || '', [
          Validators.required,
        ]),
      })
    );
  }

  removeNote(index: number): void {
    this.notesFormArr.removeAt(index);
  }

  generateXMLFile(): void {
    if (this.invoiceOID) {
      this.subs.sink = this.webService
        .getXMLForInvoice(this.invoiceOID)
        .subscribe((invoiceXML) => {
          const fileName: string =
            'XML_' +
              this.translateService.instant('invoiceNumber') +
              '_' +
              this.formGroup.get('number')?.value || '';

          this.saveTextAsFile(invoiceXML.xmlText, fileName + '.xml');
        });
    }
  }

  registrate(): void {
    if (this.invoiceOID) {
      this.subs.sink = this.webService
        .registrationOfInvoice(this.invoiceOID)
        .subscribe((success) => {
          console.log('success: ' + success);
        });
    }
  }

  saveTextAsFile(data: string, filename: string) {
    if (!data) {
      console.error('Console.save: No data');
      return;
    }

    if (!filename) filename = 'invoice.xml';

    var blob = new Blob([data], { type: 'xml' }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
    var e = document.createEvent('MouseEvents'),
      a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
    e.initEvent('click', true, false);
    a.dispatchEvent(e);
  }

  ngOnDestroy(): void {
    this.inputSearchControlSubscription.unsubscribe();
    this.inputSearchControlOnChangeSubscription.unsubscribe();
    this.subs.unsubscribe();
  }
}
