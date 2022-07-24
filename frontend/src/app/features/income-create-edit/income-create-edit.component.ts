import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MODE } from 'src/app/shared/components/basic-alert/basic-alert.interface';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { IncomeWebService } from 'src/app/web-services/income.web-service';
import { compareByValue } from 'src/app/shared/utils';
import { Observable, Subject } from 'rxjs';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { BuyerModel } from 'src/app/shared/models/buyer.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { BaseModel } from 'src/app/shared/models/base-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

export interface DialogData {
  oid: string;
  buyer: BuyerModel;
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
  formGroup!: FormGroup;
  isEdit: boolean = false;

  buyersEntities: Observable<BuyerModel[]> = this.listEntities.entities;
  isLoading?: Observable<boolean> = this.listEntities.isLoading;
  searchControl: FormControl = new FormControl();
  selectedBuyer?: BuyerModel;
  compareFn: (f1: BaseModel, f2: BaseModel) => boolean = compareByValue;

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
      : this.initializeCreate(this.data.buyer, this.data.amount);
  }

  initializeCreate(buyer: BuyerModel, amount: number): void {
    if (buyer) {
      this.selectedBuyer = buyer;
    }
    this.formGroup = new FormGroup({
      date: new FormControl(new Date().toISOString().substring(0, 10), [
        Validators.required,
      ]),
      bankStatementNumber: new FormControl(''),
      amount: new FormControl(amount || 0, [
        Validators.required,
        Validators.min(0),
      ]),
      comment: new FormControl('', []),
      buyer: new FormControl(this.selectedBuyer, Validators.required),
    });
  }

  initializeEdit(): void {
    this.subs.sink = this.webService
      .getEntityByOid(this.incomeOID)
      .subscribe((income) => {
        if (income) {
          this.selectedBuyer = income.buyer;
          this.formGroup = new FormGroup({
            date: new FormControl(income.date, [Validators.required]),
            bankStatementNumber: new FormControl(income.bankStatementNumber),
            amount: new FormControl(income.amount, [
              Validators.required,
              Validators.min(0),
            ]),
            comment: new FormControl(income.comment, []),
            buyer: new FormControl(this.selectedBuyer, Validators.required),
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
    this.subs.unsubscribe();
  }
}
