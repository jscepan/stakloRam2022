import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerCreateEditPopupService } from '@features/settings/buyer-create-edit/buyer-create-edit-popup.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { WORK_ORDER_UOM } from 'src/app/shared/constants';
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
  roundOnDigits,
} from 'src/app/shared/utils';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { WorkOrderWebService } from 'src/app/web-services/work-order.web-service';

@Component({
  selector: 'app-work-order-create-edit',
  templateUrl: './work-order-create-edit.component.html',
  styleUrls: ['./work-order-create-edit.component.scss'],
  providers: [
    WorkOrderWebService,
    BuyerCreateEditPopupService,
    BuyerWebService,
    ListEntities,
  ],
})
export class WorkOrderCreateEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  workOrderOID: string | null = null;
  workOrder!: WorkOrderModel;
  formGroup!: FormGroup;
  isEdit: boolean = false;
  settings?: AppSettings;
  isBuyerSelected?: boolean;
  uomOptions: EnumValueModel[] = WORK_ORDER_UOM;

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: FormControl = new FormControl();
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private listEntities: ListEntities<BuyerModel>,
    private buyerCreateEditPopupService: BuyerCreateEditPopupService,
    private buyerWebService: BuyerWebService,
    private translateService: TranslateService,
    private settingsStoreService: SettingsStoreService,
    private webService: WorkOrderWebService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.workOrderOID = this.route.snapshot.paramMap.get('workOrderOID');

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
  }

  initializeCreate(): void {
    this.formGroup = new FormGroup({
      number: new FormControl(0, [Validators.required]),
      buyer: new FormControl('', [Validators.required]),
      dateOfCreate: new FormControl(new Date().toISOString().substring(0, 10), [
        Validators.required,
      ]),
      placeOfIssue: new FormControl(
        this.settings?.workOrderPlaceOfIssue || '',
        [Validators.required]
      ),
      forPerson: new FormControl(''),
      description: new FormControl(''),
      note: new FormControl(''),
      workOrderItems: new FormArray([]),
    });
    this.setWorkOrderNumber();
  }

  initializeEdit(): void {
    this.selectedBuyer = this.workOrder.buyer;
    this.formGroup = new FormGroup({
      number: new FormControl(this.workOrder.number, [Validators.required]),
      buyer: new FormControl(this.selectedBuyer, [Validators.required]),
      dateOfCreate: new FormControl(this.workOrder.dateOfCreate, [
        Validators.required,
      ]),
      placeOfIssue: new FormControl(this.workOrder.placeOfIssue, [
        Validators.required,
      ]),
      forPerson: new FormControl(this.workOrder.forPerson, []),
      description: new FormControl(this.workOrder.description, []),
      note: new FormControl(this.workOrder.note, []),
      workOrderItems: new FormArray([]),
    });
    this.workOrder.workOrderItems.forEach((item, index) =>
      this.addNewItem(item)
    );
  }

  get workOrderItemsFormArr(): FormArray {
    return this.formGroup.get('workOrderItems') as FormArray;
  }

  addNewItem(workOrderItem?: WorkOrderItemModel): void {
    this.workOrderItemsFormArr.push(
      new FormGroup({
        oid: new FormControl(workOrderItem?.oid || ''),
        description: new FormControl(workOrderItem?.description || '', [
          Validators.required,
        ]),
        uom: new FormControl(workOrderItem?.uom || this.uomOptions[0].value, [
          Validators.required,
        ]),
        dimension1: new FormControl(workOrderItem?.dimension1 || 0),
        dimension2: new FormControl(workOrderItem?.dimension2 || 0),
        quantity: new FormControl(workOrderItem?.quantity || 0),
        sumQuantity: new FormControl(workOrderItem?.sumQuantity || 0, [
          Validators.required,
        ]),
        note: new FormControl(workOrderItem?.note || ''),
      })
    );
    this.calculateSum();
  }

  removeItem(index: number): void {
    this.workOrderItemsFormArr.removeAt(index);
    this.calculateSum();
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
                this.getDimension1(index)?.value / 10,
                this.settings?.constructionMeasureCM
              )
            : this.getDimension1(index)?.value / 10) *
            (useOfConstructionMeasure
              ? getConstructionMeasure(
                  this.getDimension2(index)?.value / 10,
                  this.settings?.constructionMeasureCM
                )
              : this.getDimension2(index)?.value / 10) *
            this.getQuantity(index)?.value) /
          10000;
        this.getSumQuantity(index)?.setValue(
          this.getDescription(index)
            ?.value.toLowerCase()
            .includes('termoizolaciono') &&
            area < (this.settings?.termoizolacGlassMinArea || 0.2)
            ? this.settings?.termoizolacGlassMinArea || 0.2
            : roundOnDigits(area, 3)
        );
        break;
      case 'M':
        // calculate meters
        const length =
          (((this.getDimension1(index)?.value / 10) * 2) / 100 +
            ((this.getDimension2(index)?.value / 10) * 2) / 100) *
          this.getQuantity(index)?.value;
        this.getSumQuantity(index)?.setValue(roundOnDigits(length, 3));
        break;
      case 'PCS':
      case 'HOUR':
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
    this.workOrderItemsFormArr.controls.forEach((item, index) => {
      switch (this.getUOM(index)?.value) {
        case 'M2':
          this.sumMeter2 += this.getSumQuantity(index)?.value;
          this.sumMeter2Quantity += this.getQuantity(index)?.value;
          break;
        case 'M':
          this.sumMeter += this.getSumQuantity(index)?.value;
          this.sumMeterQuantity += this.getQuantity(index)?.value;
          break;
        case 'PCS':
          this.sumPieces += this.getSumQuantity(index)?.value;
          break;
        case 'HOUR':
          this.sumHours += this.getSumQuantity(index)?.value;
          break;
      }
    });
  }

  uomChanged(uom: string, index: number): void {
    if (uom === 'PCS' || uom === 'HOUR') {
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

  selectBuyer(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  searchHandler(text: any): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
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

  handleSubmitButton(): void {
    // this.setAllInvoiceAmounts();
    if (this.isEdit && this.workOrderOID) {
      this.webService
        .updateEntity(this.workOrderOID, this.formGroup.value)
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
      this.webService
        .createEntity(this.formGroup.value)
        .subscribe((workOrder) => {
          if (workOrder) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('newWorkOrderIsSuccessfullyCreated')
            );
            window.open('print/work-order-view/' + workOrder.oid);
            this.router.navigate(['workOrders', 'edit', workOrder.oid]);
          }
        });
    }
  }

  openedToggleOnUomSelect(isOppened: boolean, index: number): void {
    if (!isOppened && this.getUOM(index)?.value) {
      this.uomChanged(this.getUOM(index)?.value, index);
    }
  }

  onKeypress(event: KeyboardEvent, input: string, index: number = -1) {
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
