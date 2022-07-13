import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerCreateEditPopupService } from '@features/settings/buyer-create-edit/buyer-create-edit-popup.service';
import { Observable } from 'rxjs';
import { BaseModel } from 'src/app/shared/models/base-model';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { WorkOrderModel } from 'src/app/shared/models/work-order';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import {
  AppSettings,
  SettingsStoreService,
} from 'src/app/shared/services/settings-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { compareByValue } from 'src/app/shared/utils';
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

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: FormControl = new FormControl();
  selectedBuyer?: BuyerModel;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private listEntities: ListEntities<BuyerModel>,
    private buyerCreateEditPopupService: BuyerCreateEditPopupService,
    private buyerWebService: BuyerWebService,
    private settingsStoreService: SettingsStoreService,
    private webService: WorkOrderWebService
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
      dateOfCreate: new FormControl(new Date().toISOString().substring(0, 10), [
        Validators.required,
      ]),
      dateOfTurnover: new FormControl(
        new Date().toISOString().substring(0, 10),
        [Validators.required]
      ),
      dateOfMaturity: new FormControl(
        new Date().toISOString().substring(0, 10),
        [Validators.required]
      ),
      placeOfIssue: new FormControl(this.settings?.invoicePlaceOfIssue || '', [
        Validators.required,
      ]),
      netAmount: new FormControl(0, [
        Validators.required,
        Validators.min(0.01),
      ]),
      vatAmount: new FormControl(0, [
        Validators.required,
        Validators.min(0.01),
      ]),
      grossAmount: new FormControl(0, [
        Validators.required,
        Validators.min(0.01),
      ]),
      currency: new FormControl(this.settings?.invoiceCurrency || '', [
        Validators.required,
      ]),
      country: new FormControl(this.settings?.invoiceCountry || '', [
        Validators.required,
      ]),
      comment: new FormControl('', []),
      buyer: new FormControl('', [Validators.required]),
      invoiceItems: new FormArray([]),
    });
    // this.setInvoiceNumber();
  }

  initializeEdit(): void {
    this.selectedBuyer = this.workOrder.buyer;
    this.formGroup = new FormGroup({
      number: new FormControl(this.workOrder.number, [Validators.required]),
      dateOfCreate: new FormControl(this.workOrder.dateOfCreate, [
        Validators.required,
      ]),
      // dateOfTurnover: new FormControl(this.workOrder.dateOfTurnover, [
      //   Validators.required,
      // ]),
      // dateOfMaturity: new FormControl(this.workOrder.dateOfMaturity, [
      //   Validators.required,
      // ]),
      placeOfIssue: new FormControl(this.workOrder.placeOfIssue, [
        Validators.required,
      ]),
      // netAmount: new FormControl(this.workOrder.netAmount, [Validators.required]),
      // vatAmount: new FormControl(this.workOrder.vatAmount, [Validators.required]),
      // grossAmount: new FormControl(this.workOrder.grossAmount, [
      //   Validators.required,
      // ]),
      // currency: new FormControl(this.workOrder.currency, [Validators.required]),
      // country: new FormControl(this.workOrder.country, [Validators.required]),
      // comment: new FormControl(this.workOrder.comment, []),
      buyer: new FormControl(this.selectedBuyer, [Validators.required]),
      invoiceItems: new FormArray([]),
    });
    // if (this.formGroup.get('type')?.value === 'CASH') {
    //   this.formGroup.addControl(
    //     'numberOfCashBill',
    //     new FormControl(this.workOrder.numberOfCashBill, [Validators.required])
    //   );
    // }
    // this.invoice.invoiceItems.forEach((item, index) =>
    //   this.addNewItem(index, item)
    // );
  }

  buyerChanged(): void {
    // TODO
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
