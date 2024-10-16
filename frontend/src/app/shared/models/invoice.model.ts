import { Type } from 'class-transformer';
import { BaseModel } from './base-model';
import { BuyerModel } from './buyer.model';
import { InvoiceItemModel } from './invoice-item.model';
import { NoteModel } from './note.model';

export class InvoiceModel extends BaseModel {
  type: string = '';
  number: string = '';
  dateOfCreate: Date = new Date();
  dateOfTurnover: Date = new Date();
  dateOfMaturity: Date = new Date();
  placeOfIssue: string = '';
  methodOfPayment: string = '';
  comment: string = '';
  netAmount: number = 0;
  vatRate: number = 0;
  vatAmount: number = 0;
  grossAmount: number = 0;
  numberOfCashBill: string = '';
  currency: string = '';
  country: string = '';
  advanceInvoiceOid?: string = '';
  advancePayAmount: number = 0;
  preInvoiceOid?: string = '';
  @Type(() => BuyerModel)
  buyer: BuyerModel = new BuyerModel();
  @Type(() => InvoiceItemModel)
  invoiceItems: InvoiceItemModel[] = [];
  @Type(() => NoteModel)
  notes: NoteModel[] = [];
}
