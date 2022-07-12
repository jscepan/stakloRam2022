import { Type } from 'class-transformer';
import { BuyerModel } from './buyer.model';
import { IncomeModel } from './income.model';
import { InvoiceModel } from './invoice.model';
import { OutcomeModel } from './outcome.model';

export class DebtorModel {
  @Type(() => BuyerModel)
  buyer?: BuyerModel;
  positiveSum: number = 0;
  negativeSum: number = 0;
  debtSum: number = 0;
  @Type(() => InvoiceModel)
  invoices?: InvoiceModel[];
  @Type(() => IncomeModel)
  incomes?: IncomeModel[];
  @Type(() => OutcomeModel)
  outcomes?: OutcomeModel[];
}
