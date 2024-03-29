import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { IncomeWebService } from 'src/app/web-services/income.web-service';
import { compareByValue } from 'src/app/shared/utils';
import { Observable, Subject, Subscription } from 'rxjs';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';

export interface DialogData {
  oid: string;
  buyerOID: string;
  amount: number;
}

@Component({
  selector: 'app-income-create-edit',
  templateUrl: './income-create-edit.component.html',
  styleUrls: ['./income-create-edit.component.scss'],
  providers: [IncomeWebService, BuyerWebService, ListEntities],
})
export class IncomeCreateEditComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  incomeOID!: string;
  formGroup!: UntypedFormGroup;
  isEdit: boolean = false;

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: UntypedFormControl = new UntypedFormControl();
  selectedBuyer?: BuyerModel;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

  private inputSearchControlSubscription!: Subscription;
  @Input() debounceTime: number = 500;

  constructor(
    private dialogRef: MatDialogRef<IncomeCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private webService: IncomeWebService,
    private buyerWebService: BuyerWebService,
    private translateService: TranslateService,
    private el: ElementRef,
    private listEntities: ListEntities<BuyerModel>
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.oid;
    this.incomeOID = this.data.oid;

    this.subs.sink = this.listEntities
      .setWebService(this.buyerWebService)
      .requestFirstPage();

    this.isEdit
      ? this.initializeEdit()
      : this.initializeCreate(this.data.buyerOID, this.data.amount);

    this.inputSearchControlSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe(() => {
        this.searchHandler(this.searchControl.value);
      });
  }

  initializeCreate(buyerOID: string, amount: number): void {
    this.subs.sink = this.buyerWebService
      .getEntityByOid(buyerOID)
      .subscribe((buyer) => {
        if (buyerOID) {
          this.selectedBuyer = buyer;
        }
        this.formGroup = new UntypedFormGroup({
          date: new UntypedFormControl(new Date().toISOString().substring(0, 10), [
            Validators.required,
          ]),
          bankStatementNumber: new UntypedFormControl(''),
          amount: new UntypedFormControl(amount || 0, [
            Validators.required,
            Validators.min(0),
          ]),
          comment: new UntypedFormControl('', []),
          buyer: new UntypedFormControl(this.selectedBuyer, Validators.required),
        });
      });
  }

  initializeEdit(): void {
    this.subs.sink = this.webService
      .getEntityByOid(this.incomeOID)
      .subscribe((income) => {
        if (income) {
          this.selectedBuyer = income.buyer;
          this.formGroup = new UntypedFormGroup({
            date: new UntypedFormControl(income.date, [Validators.required]),
            bankStatementNumber: new UntypedFormControl(income.bankStatementNumber),
            amount: new UntypedFormControl(income.amount, [
              Validators.required,
              Validators.min(0),
            ]),
            comment: new UntypedFormControl(income.comment, []),
            buyer: new UntypedFormControl(this.selectedBuyer, Validators.required),
          });
        }
      });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  handleSubmitButton(): void {
    const income = this.formGroup.value;

    if (this.isEdit) {
      this.webService
        .updateEntity(this.incomeOID, income)
        .subscribe((income) => {
          if (income) {
            this.globalService.showBasicAlert(
              MODE.success,
              this.translateService.instant('successfully'),
              this.translateService.instant('incomeIsSuccessfullyUpdated')
            );
            this.dialogRef.close(income);
          }
        });
    } else {
      this.webService.createEntity(income).subscribe((income) => {
        if (income) {
          this.globalService.showBasicAlert(
            MODE.success,
            this.translateService.instant('successfully'),
            this.translateService.instant('newIncomeIsSuccessfullyCreated')
          );
          this.dialogRef.close(income);
        }
      });
    }
  }

  bottomReachedHandler(): void {
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
    this.inputSearchControlSubscription.unsubscribe();
    this.subs.unsubscribe();
  }
}
