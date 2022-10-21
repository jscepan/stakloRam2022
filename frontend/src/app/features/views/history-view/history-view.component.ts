import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { BuyerWebService } from 'src/app/web-services/buyer.web-service';
import { ListEntities } from 'src/app/shared/services/list-entities';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoryWebService } from 'src/app/web-services/history.web-service';
import { HistoryModel } from 'src/app/shared/models/history.model';
import { finalize } from 'rxjs/operators';
import { IncomeModel } from 'src/app/shared/models/income.model';
import { InvoiceModel } from 'src/app/shared/models/invoice.model';
import {
  mapBuyerToTable,
  mapCityToTable,
  mapCountryToTable,
  mapIncomeToTable,
  mapInvoiceToTable,
  mapOutcomeToTable,
  mapUserToTable,
  mapWorkOrderToTable,
} from './map-object-to-table.service';

export interface DialogData {
  oid: string;
}
export interface TableRow {
  fields: TableField[];
}
export interface TableField {
  dataType: DataType;
  value: any;
}

export enum DataType {
  STRING = 'string',
  DATE = 'date',
  TIME = 'time',
  NUMBER = 'number',
  NUMBER_DEC = 'numberDecimal',
  OBJECT = 'object',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
}

export interface DataObject {
  type: DataType;
  propertyName: string;
  objectAttr?: string;
  arrayElementMapFunction?: any;
}

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
  providers: [HistoryWebService, BuyerWebService, ListEntities],
})
export class HistoryViewComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  isLoading?: boolean = true;
  history?: HistoryModel;

  tableHeader: { value: string }[] = [];
  tableRow: TableRow[] = [];

  constructor(
    private dialogRef: MatDialogRef<HistoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private webService: HistoryWebService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subs.sink = this.webService
      .getEntityByOid(this.data.oid)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((history) => {
        this.history = history;
        this.convertHistoryToTable();
      });
  }

  convertHistoryToTable(): void {
    if (this.history) {
      this.tableHeader = [
        { value: this.translateService.instant('attribute') },
      ];
      if (
        this.history.action === 'UPDATE' ||
        this.history.action === 'DELETE'
      ) {
        this.tableHeader.push({
          value: this.translateService.instant('previousValue'),
        });
      }
      if (
        this.history.action === 'UPDATE' ||
        this.history.action === 'CREATE'
      ) {
        this.tableHeader.push({
          value: this.translateService.instant('newValue'),
        });
      }
      this.tableRow = [];
      const prevValue = this.history.previousValue
        ? JSON.parse(this.history.previousValue)
        : null;
      const newValue = this.history.newValue
        ? JSON.parse(this.history.newValue)
        : null;
      console.log(prevValue);
      console.log(newValue);

      let mapOfAttr: Map<string, DataObject> = new Map<string, DataObject>();
      switch (this.history.objectType) {
        case 'user':
          mapOfAttr = mapUserToTable();
          break;
        case 'workorder':
          mapOfAttr = mapWorkOrderToTable();
          break;
        case 'invoice':
          mapOfAttr = mapInvoiceToTable();
          break;
        case 'income':
          mapOfAttr = mapIncomeToTable();
          break;
        case 'outcome':
          mapOfAttr = mapOutcomeToTable();
          break;
        case 'buyer':
          mapOfAttr = mapBuyerToTable();
          break;
        case 'city':
          mapOfAttr = mapCityToTable();
          break;
        case 'country':
          mapOfAttr = mapCountryToTable();
          break;
      }
      for (var [key, value] of mapOfAttr) {
        const row: TableField[] = [
          {
            dataType: DataType.STRING,
            value: this.translateService.instant(value.propertyName),
          },
        ];
        if (prevValue) {
          if (value.type === DataType.OBJECT && value.objectAttr) {
            row.push({
              dataType: DataType.STRING,
              value: prevValue[key][value.objectAttr],
            });
          } else if (value.type === DataType.ARRAY) {
            let elementDescription = '';
            prevValue[key].forEach((element: any) => {
              value.arrayElementMapFunction.forEach((el: any) => {
                elementDescription += this.translateService.instant(el);
                elementDescription += ': ';
                elementDescription += element[el];
                elementDescription += ', ';
              });
            });
            row.push({
              dataType: DataType.STRING,
              value: elementDescription,
            });
          } else {
            row.push({ dataType: value.type, value: prevValue[key] });
          }
        }
        if (newValue) {
          if (value.type === DataType.OBJECT && value.objectAttr) {
            row.push({
              dataType: DataType.STRING,
              value: newValue[key][value.objectAttr],
            });
          } else if (value.type === DataType.ARRAY) {
            let elementDescription = '';
            newValue[key].forEach((element: any) => {
              value.arrayElementMapFunction.forEach((el: any) => {
                elementDescription += this.translateService.instant(el);
                elementDescription += ': ';
                elementDescription += element[el];
                elementDescription += ', ';
              });
            });
            row.push({
              dataType: DataType.STRING,
              value: elementDescription,
            });
          } else {
            row.push({ dataType: value.type, value: newValue[key] });
          }
        }
        this.tableRow.push({
          fields: row,
        });
      }
    }
  }

  exit(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
