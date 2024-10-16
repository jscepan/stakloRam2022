import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerCreateEditPopupService } from '@features/views/buyer-create-edit/buyer-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { UOM_TYPES } from 'src/app/shared/constants';
import { EnumValueModel } from 'src/app/shared/enums/enum.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { WorkOrderItemModel } from 'src/app/shared/models/work-order-item';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import {
  compareByValue,
  getConstructionMeasure,
  getWorkOrderImageUrl,
  roundOnDigits,
} from 'src/app/shared/utils';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { AuthStoreService } from 'src/app/shared/services/auth-store.service';
import { ImageWebService } from 'src/app/web-services/image.web-service';
import { ImageModel } from 'src/app/shared/models/image.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { SweetAlertService } from 'src/app/shared/components/sweet-alert/sweet-alert.service';
import {
  SweetAlertI,
  SweetAlertTypeEnum,
} from 'src/app/shared/components/sweet-alert/sweet-alert.interface';

@Component({
  selector: 'app-work-order-create-edit',
  templateUrl: './work-order-create-edit.component.html',
  styleUrls: ['./work-order-create-edit.component.scss'],
  providers: [
    WorkOrderWebService,
    BuyerCreateEditPopupService,
    BuyerWebService,
    ListEntities,
    ImageWebService,
  ],
})
export class WorkOrderCreateEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  workOrderOID: string | null = null;
  workOrder!: WorkOrderModel;
  formGroup!: UntypedFormGroup;
  isEdit: boolean = false;
  settings?: AppSettings;
  isBuyerSelected?: boolean;
  uomOptions: EnumValueModel[] = UOM_TYPES;
  workOrderItemsOptions: string[] = [];
  filteredOptions: (Observable<string[]> | undefined)[] = [];

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: UntypedFormControl = new UntypedFormControl();
  selectedBuyer?: BuyerModel;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  getDescription(index: number): AbstractControl | null {
    return this.workOrderItemsFormArr.controls[index].get('description');
  }
  getUOM(index: number): AbstractControl | null {
    return this.workOrderItemsFormArr.controls[index].get('uom');
  }
  getDimension1(index: number): AbstractControl | null {
    return this.workOrderItemsFormArr.controls[index].get('dimension1');
  }
  getDimension2(index: number): AbstractControl | null {
    return this.workOrderItemsFormArr.controls[index].get('dimension2');
  }
  getQuantity(index: number): AbstractControl | null {
    return this.workOrderItemsFormArr.controls[index].get('quantity');
  }
  getSumQuantity(index: number): AbstractControl | null {
    return this.workOrderItemsFormArr.controls[index].get('sumQuantity');
  }

  sumMeter2: number = 0;
  sumMeter2Quantity: number = 0;
  sumMeter: number = 0;
  sumMeterQuantity: number = 0;
  sumPieces: number = 0;
  sumHours: number = 0;
  sumKilogrames: number = 0;

  workOrderImages: {
    oid: string;
    url: string;
    description: string;
    file?: Blob;
    fullUrl: string;
  }[] = [];
  @ViewChildren('fileCtrl') fileCtrls!: QueryList<ElementRef>;

  sumOfGrinding: number = 0;
  sumForGrindingsItems: { isCalculated: boolean; value: number }[] = [];

  allowChangeBuyer: boolean = false;
  selectedBuyerOnChange?: BuyerModel;
  buyersEntitiesOnChange: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoadingOnChange?: Observable<boolean> = this.listEntities.isLoading;
  searchControlOnChange: UntypedFormControl = new UntypedFormControl();

  private inputSearchControlSubscription!: Subscription;
  private inputSearchControlOnChangeSubscription!: Subscription;
  @Input() debounceTime: number = 500;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private listEntities: ListEntities<BuyerModel>,
    private listEntitiesOnChange: ListEntities<BuyerModel>,
    private buyerCreateEditPopupService: BuyerCreateEditPopupService,
    private buyerWebService: BuyerWebService,
    private translateService: TranslateService,
    private settingsStoreService: SettingsStoreService,
    private webService: WorkOrderWebService,
    private imageWebService: ImageWebService,
    private el: ElementRef,
    private sweetAlertService: SweetAlertService,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.workOrderOID = this.route.snapshot.paramMap.get('workOrderOID');

    this.subs.sink = this.webService
      .getAllWorkOrderItemDescriptions()
      .subscribe((options) => {
        this.workOrderItemsOptions = options;
      });

    this.subs.sink = this.listEntities
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    this.subs.sink = this.settingsStoreService.dataLoaded$.subscribe(
      (dataLoaded) => {
        if (dataLoaded) {
          this.settings = this.settingsStoreService.getSettings();

          this.isEdit = !!this.workOrderOID;
          this.isEdit && this.workOrderOID
            ? this.webService
                .getEntityByOid(this.workOrderOID)
                .subscribe((wo) => {
                  this.workOrder = wo;
                  this.initializeEdit();
                })
            : this.initializeCreate();
          this.isBuyerSelected = this.isEdit || false;
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

  initializeCreate(): void {
    this.formGroup = new UntypedFormGroup({
      number: new UntypedFormControl(0, [Validators.required]),
      buyer: new UntypedFormControl('', [Validators.required]),
      dateOfCreate: new UntypedFormControl(new Date().toISOString().substring(0, 10), [
        Validators.required,
      ]),
      placeOfIssue: new UntypedFormControl(
        this.settings?.workOrderPlaceOfIssue || '',
        [Validators.required]
      ),
      forPerson: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
      note: new UntypedFormControl(''),
      workOrderItems: new UntypedFormArray([]),
    });
    this.setWorkOrderNumber();
  }

  initializeEdit(): void {
    this.selectedBuyer = this.workOrder.buyer;
    this.formGroup = new UntypedFormGroup({
      number: new UntypedFormControl(this.workOrder.number, [Validators.required]),
      buyer: new UntypedFormControl(this.selectedBuyer, [Validators.required]),
      dateOfCreate: new UntypedFormControl(this.workOrder.dateOfCreate, [
        Validators.required,
      ]),
      placeOfIssue: new UntypedFormControl(this.workOrder.placeOfIssue, [
        Validators.required,
      ]),
      forPerson: new UntypedFormControl(this.workOrder.forPerson, []),
      description: new UntypedFormControl(this.workOrder.description, []),
      note: new UntypedFormControl(this.workOrder.note, []),
      workOrderItems: new UntypedFormArray([]),
    });
    this.workOrder.workOrderItems.forEach((item, index) =>
      this.addNewItem(item)
    );
    this.workOrder.images.forEach((item, index) => this.addNewImage(item));
  }

  get workOrderItemsFormArr(): UntypedFormArray {
    return this.formGroup.get('workOrderItems') as UntypedFormArray;
  }

  addNewItem(workOrderItem?: WorkOrderItemModel): void {
    this.workOrderItemsFormArr.push(
      new UntypedFormGroup({
        oid: new UntypedFormControl(workOrderItem?.oid || ''),
        description: new UntypedFormControl(workOrderItem?.description || '', [
          Validators.required,
        ]),
        uom: new UntypedFormControl(workOrderItem?.uom || this.uomOptions[0].value, [
          Validators.required,
        ]),
        dimension1: new UntypedFormControl(workOrderItem?.dimension1 || 0),
        dimension2: new UntypedFormControl(workOrderItem?.dimension2 || 0),
        quantity: new UntypedFormControl(workOrderItem?.quantity || 0),
        sumQuantity: new UntypedFormControl(workOrderItem?.sumQuantity || 0, [
          Validators.required,
        ]),
        note: new UntypedFormControl(workOrderItem?.note || ''),
      })
    );
    setTimeout(() => {
      const filterOpt = this.getDescription(
        this.workOrderItemsFormArr.length - 1
      )?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
      this.filteredOptions.push(filterOpt);
    });
    this.calculateSum();
    this.sumForGrindingsItems.push({
      isCalculated:
        (workOrderItem?.uom === 'M2' &&
          workOrderItem?.description.includes('kp obrad')) ||
        false,
      value: 0,
    });
  }

  removeItem(index: number): void {
    this.workOrderItemsFormArr.removeAt(index);
    this.calculateSum();
    this.formGroup.markAsDirty();
    this.sumForGrindingsItems.splice(index, 1);
    this.calculateWorkOrderSumOfGrinding();
  }

  calculateWorkOrderSum(
    index: number,
    useOfConstructionMeasure: boolean = true
  ): void {
    switch (this.getUOM(index)?.value) {
      case 'M2':
        // calculate area
        const area =
          ((useOfConstructionMeasure
            ? getConstructionMeasure(
                (this.getDimension1(index)?.value * 1) / 10,
                this.settings?.constructionMeasureCM
              )
            : (this.getDimension1(index)?.value * 1) / 10) *
            (useOfConstructionMeasure
              ? getConstructionMeasure(
                  (this.getDimension2(index)?.value * 1) / 10,
                  this.settings?.constructionMeasureCM
                )
              : (this.getDimension2(index)?.value * 1) / 10)) /
          10000;
        this.getSumQuantity(index)?.setValue(
          this.getDescription(index)
            ?.value.toLowerCase()
            .includes('termoizolaciono') &&
            area < (this.settings?.termoizolacGlassMinArea || 0.2)
            ? roundOnDigits(
                (this.settings?.termoizolacGlassMinArea || 0.2) *
                  (this.getQuantity(index)?.value * 1),
                3
              )
            : roundOnDigits(area * this.getQuantity(index)?.value * 1, 3)
        );
        break;
      case 'M':
        // calculate meters
        const length =
          ((((this.getDimension1(index)?.value * 1) / 10) * 2) / 100 +
            (((this.getDimension2(index)?.value * 1) / 10) * 2) / 100) *
          (this.getQuantity(index)?.value * 1);
        this.getSumQuantity(index)?.setValue(roundOnDigits(length, 3));
        break;
      case 'PCS':
      case 'HOUR':
      case 'KG':
        // don't calculate
        break;
    }
    this.calculateSum();
  }

  calculateSum(): void {
    this.sumMeter2 = 0;
    this.sumMeter2Quantity = 0;
    this.sumMeter = 0;
    this.sumMeterQuantity = 0;
    this.sumPieces = 0;
    this.sumHours = 0;
    this.sumKilogrames = 0;
    this.workOrderItemsFormArr.controls.forEach((item, index) => {
      switch (this.getUOM(index)?.value) {
        case 'M2':
          this.sumMeter2 += this.getSumQuantity(index)?.value * 1;
          this.sumMeter2Quantity += this.getQuantity(index)?.value * 1;
          break;
        case 'M':
          this.sumMeter += this.getSumQuantity(index)?.value * 1;
          this.sumMeterQuantity += this.getQuantity(index)?.value * 1;
          break;
        case 'PCS':
          this.sumPieces += this.getSumQuantity(index)?.value * 1;
          break;
        case 'HOUR':
          this.sumHours += this.getSumQuantity(index)?.value * 1;
          break;
        case 'KG':
          this.sumKilogrames += this.getSumQuantity(index)?.value * 1;
          break;
      }
    });
  }

  uomChanged(uom: string, index: number): void {
    if (uom === 'PCS' || uom === 'HOUR' || uom === 'KG') {
      this.getDimension1(index)?.setValue(0);
      this.getDimension1(index)?.disable();
      this.getDimension2(index)?.setValue(0);
      this.getDimension2(index)?.disable();
      this.getQuantity(index)?.setValue(0);
      this.getQuantity(index)?.disable();
      setTimeout(() => {
        this.setFocusOn('sumQuantity', index, true);
      });
    } else {
      this.getDimension1(index)?.enable();
      this.getDimension2(index)?.enable();
      this.getQuantity(index)?.enable();
      setTimeout(() => {
        this.setFocusOn('dimension1', index, true);
      });
    }
    this.getSumQuantity(index);
    this.calculateSum();
  }

  setWorkOrderNumber(): void {
    this.webService
      .getNextWorkOrderNumber(this.formGroup.get('dateOfCreate')?.value)
      .subscribe((number) => {
        this.formGroup.get('number')?.setValue(number);
      });
  }

  buyerChanged(): void {
    // TODO
    setTimeout(() => {
      this.isBuyerSelected = this.formGroup.get('buyer')?.value;

      if (this.workOrderItemsFormArr.controls.length === 0) {
        this.addNewItem();
      }
      this.setFocusOn('forPerson');
    });
  }

  bottomReachedHandlerBuyers(): void {
    this.listEntities.requestNextPage();
  }

  bottomReachedHandlerBuyersOnChange(): void {
    this.listEntitiesOnChange.requestNextPage();
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
            this.workOrderOID &&
            this.selectedBuyerOnChange?.oid
          ) {
            this.subs.sink = this.webService
              .changeBuyer(this.workOrderOID, this.selectedBuyerOnChange?.oid)
              .subscribe((changed) => {
                if (changed) {
                  this.globalService.showBasicAlert(
                    MODE.success,
                    this.translateService.instant('successfully'),
                    this.translateService.instant(
                      'workOrderIsSuccessfullyUpdated'
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
          'areYouSureYouWantToAllowChangeOfBuyerWithAllConsequencesWorkOrder'
        ),
      };
      this.sweetAlertService.openMeSweetAlert(sweetAlertModel);
    }
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

  createBuyer(): void {
    this.buyerCreateEditPopupService.openDialog().subscribe((buyer) => {
      if (buyer) {
        this.listEntities.requestFirstPage();
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  handleSubmitButton(createInvoice: boolean = false): void {
    const formData = new FormData();
    let hasUploadedImages: boolean = false;
    const workOrder: WorkOrderModel = this.formGroup.value;
    workOrder.images = [];
    this.workOrderImages.forEach((imageObj) => {
      if (imageObj.file) {
        formData.append('files', imageObj.file);
        hasUploadedImages = true;
        workOrder.images.push({
          oid: '',
          url: '',
          description: imageObj.description || '',
        });
      } else if (imageObj.oid) {
        workOrder.images.push({
          oid: imageObj.oid,
          url: imageObj.url,
          description: imageObj.description,
        });
      }
    });
    if (hasUploadedImages) {
      this.subs.sink = this.imageWebService
        .upload(formData)
        .subscribe((response) => {
          response.forEach((imageName, index) => {
            for (let i = 0; i < workOrder.images.length; i++) {
              if (workOrder.images[i].url === '') {
                workOrder.images[i].url = imageName;
                break;
              }
            }
          });
          this.submit(createInvoice, workOrder);
        });
    } else {
      this.submit(createInvoice, workOrder);
    }
  }

  private submit(createInvoice: boolean, workOrder: WorkOrderModel): void {
    if (this.isEdit && this.workOrderOID) {
      this.webService
        .updateEntity(this.workOrderOID, workOrder)
        .subscribe((invoice) => {
          if (invoice) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('workOrderIsSuccessfullyUpdated')
            );
          }
        });
    } else {
      this.createWorkOrderRequest(createInvoice, workOrder);
    }
  }

  private createWorkOrderRequest(
    createInvoice: boolean,
    wo: WorkOrderModel
  ): void {
    this.subs.sink = this.webService.createEntity(wo).subscribe((workOrder) => {
      if (workOrder) {
        this.globalService.showBasicAlert(
          MODE.success,
          this.translateService.instant('successfully'),
          this.translateService.instant('newWorkOrderIsSuccessfullyCreated')
        );
        window.open('#/print/work-order-view/' + workOrder.oid);
        if (createInvoice) {
          this.router.navigate(['invoices', 'create'], {
            queryParams: { workOrderOID: workOrder.oid },
          });
        } else {
          location.reload();
        }
      }
    });
  }

  openedToggleOnUomSelect(isOppened: boolean, index: number): void {
    if (!isOppened && this.getUOM(index)?.value) {
      this.uomChanged(this.getUOM(index)?.value, index);
    }
  }

  onKeypress(event: KeyboardEvent, input: string, index: number = -1): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      switch (input) {
        case 'number':
          this.setFocusOn('buyer');
          break;
        case 'forPerson':
          this.setFocusOn('description');
          break;
        case 'description':
          if (index < 0) {
            this.setFocusOn('dateOfCreate', 0, true);
          } else {
            this.setFocusOn('uom', index);
          }
          break;
        case 'dateOfCreate':
          this.setFocusOn('placeOfIssue', 0, true);
          break;
        case 'placeOfIssue':
          this.setFocusOn('description', index + 2, true);
          break;
        case 'dimension1':
          this.setFocusOn('dimension2', index, true);
          break;
        case 'dimension2':
          this.setFocusOn('quantity', index, true);
          break;
        case 'quantity':
          this.setFocusOn('sumQuantity', index, true);
          break;
        case 'sumQuantity':
          this.setFocusOn('note', index, true);
          break;
        case 'note':
          if (
            index >= 0 &&
            !this.workOrderItemsFormArr.controls[index + 1]?.value
          ) {
            this.addNewItem(this.workOrderItemsFormArr.controls[index].value);
          }
          setTimeout(() => {
            this.setFocusOn('description', index + 2, true);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.workOrderItemsOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(index: number): Observable<string[]> | undefined {
    return this.filteredOptions[index];
  }

  onFileSelected(event: any, index: number): void {
    const file: Blob | undefined = event.target.files[0];
    if (file) {
      this.workOrderImages[index].file = file;
      const url = URL.createObjectURL(file);
      this.workOrderImages[index].oid = '';
      this.workOrderImages[index].url = url;
      this.workOrderImages[index].fullUrl = url;
    }
    this.formGroup.markAsDirty();
  }

  addNewImage(image?: ImageModel): void {
    this.workOrderImages.push({
      oid: image?.oid || '',
      url: image?.url || '',
      fullUrl: image?.url ? getWorkOrderImageUrl(image.url) : '',
      description: image?.description || '',
      file: undefined,
    });
  }

  removeImage(index: number): void {
    this.workOrderImages.splice(index, 1);
    this.formGroup.markAsDirty();
  }

  uploadFile(index: number): void {
    this.fileCtrls.get(index)?.nativeElement.click();
  }

  addSumOfGrindingItems(): void {
    this.addNewItem({
      oid: '',
      description: this.translateService.instant('grinding'),
      uom: 'M',
      dimension1: 0,
      dimension2: 0,
      dimension3: 0,
      quantity: this.sumOfGrinding,
      sumQuantity: this.sumOfGrinding,
      note: '',
      settled: false,
    });
    this.sumOfGrinding = 0;
  }

  calculateWorkOrderSumOfGrinding(): void {
    this.sumOfGrinding = 0;
    let sum = 0;
    this.sumForGrindingsItems.forEach((item) => {
      if (item.isCalculated) sum += Number(item.value);
    });
    this.sumOfGrinding = sum / 1000;
  }

  calculateGrindingLengthForItem(index: number): void {
    const length: number =
      (this.getDimension1(index)?.value * 2 +
        this.getDimension2(index)?.value * 2) *
        this.getQuantity(index)?.value +
      0;
    this.sumForGrindingsItems[index].value = length;
    this.calculateWorkOrderSumOfGrinding();
  }

  switchOnCalcBasedOnDescription(index: number): void {
    const desc: string = this.getDescription(index)?.value;
    if (desc.toLowerCase().includes('kp obrad')) {
      this.sumForGrindingsItems[index].isCalculated = true;
    }
  }

  ngOnDestroy(): void {
    this.inputSearchControlSubscription.unsubscribe();
    this.inputSearchControlOnChangeSubscription.unsubscribe();
    this.subs.unsubscribe();
  }
}
