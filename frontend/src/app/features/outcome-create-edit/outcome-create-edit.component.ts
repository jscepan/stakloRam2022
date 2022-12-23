import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { compareByValue } from 'src/app/shared/utils';
import { Observable, Subscription } from 'rxjs';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OutcomeWebService } from 'src/app/web-services/outcome.web-service';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';

export interface DialogData {
  oid: string;
}

@Component({
  selector: 'app-outcome-create-edit',
  templateUrl: './outcome-create-edit.component.html',
  styleUrls: ['./outcome-create-edit.component.scss'],
  providers: [OutcomeWebService, BuyerWebService, ListEntities],
})
export class OutcomeCreateEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  outcomeOID!: string;
  formGroup!: FormGroup;
  isEdit: boolean = false;

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: FormControl = new FormControl();
  selectedBuyer?: BuyerModel;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  private inputSearchControlSubscription!: Subscription;
  @Input() debounceTime: number = 500;

  constructor(
    private dialogRef: MatDialogRef<OutcomeCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private webService: OutcomeWebService,
    private buyerWebService: BuyerWebService,
    private translateService: TranslateService,
    private listEntities: ListEntities<BuyerModel>
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.oid;
    this.outcomeOID = this.data.oid;

    this.subs.sink = this.listEntities
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    this.isEdit ? this.initializeEdit() : this.initializeCreate();

    this.inputSearchControlSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe(() => {
        this.searchHandler(this.searchControl.value);
      });
  }

  initializeCreate(): void {
    this.formGroup = new FormGroup({
      date: new FormControl(new Date().toISOString().substring(0, 10), [
        Validators.required,
      ]),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      comment: new FormControl('', []),
      buyer: new FormControl('', Validators.required),
    });
  }

  initializeEdit(): void {
    this.subs.sink = this.webService
      .getEntityByOid(this.outcomeOID)
      .subscribe((outcome) => {
        if (outcome) {
          this.selectedBuyer = outcome.buyer;
          this.formGroup = new FormGroup({
            date: new FormControl(outcome.date, [Validators.required]),
            amount: new FormControl(outcome.amount, [
              Validators.required,
              Validators.min(0),
            ]),
            comment: new FormControl(outcome.comment, []),
            buyer: new FormControl(this.selectedBuyer, Validators.required),
          });
        }
      });
  }

  selectBuyer(event: MatSelectChange): void {
    if (event && event.value) {
      this.selectedBuyer = event.value;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  handleSubmitButton(): void {
    const outcome = this.formGroup.value;

    if (this.isEdit) {
      this.webService
        .updateEntity(this.outcomeOID, outcome)
        .subscribe((outc) => {
          if (outc) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('outcomeIsSuccessfullyUpdated')
            );
            this.dialogRef.close(outc);
          }
        });
    } else {
      this.webService.createEntity(outcome).subscribe((outc) => {
        if (outc) {
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('successfully'),
            this.translateService.instant('newOutcomeIsSuccessfullyCreated')
          );
          this.dialogRef.close(outc);
        }
      });
    }
  }

  bottomReachedHandler(): void {
    this.listEntities.requestNextPage();
  }

  searchHandler(text: any): void {
    let searchFilter: SearchModel = new SearchModel();
    searchFilter.criteriaQuick = text;
    this.listEntities.setFilter(searchFilter);
  }

  ngOnDestroy(): void {
    this.inputSearchControlSubscription.unsubscribe();
    this.subs.unsubscribe();
  }
}
