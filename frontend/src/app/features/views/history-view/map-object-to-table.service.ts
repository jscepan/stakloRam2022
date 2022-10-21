import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import { DataObject, DataType } from './history-view.component';

export function mapInvoiceToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('buyer', {
    type: DataType.OBJECT,
    propertyName: 'buyer',
    objectAttr: 'name',
  });
  map.set('number', { type: DataType.STRING, propertyName: 'number' });
  map.set('numberOfCashBill', {
    type: DataType.STRING,
    propertyName: 'numberOfCashBill',
  });
  map.set('country', { type: DataType.STRING, propertyName: 'country' });
  map.set('currency', { type: DataType.STRING, propertyName: 'currency' });
  map.set('methodOfPayment', {
    type: DataType.STRING,
    propertyName: 'methodOfPayment',
  });
  map.set('placeOfIssue', {
    type: DataType.STRING,
    propertyName: 'placeOfIssue',
  });
  map.set('dateOfCreate', {
    type: DataType.DATE,
    propertyName: 'dateOfCreate',
  });
  map.set('dateOfMaturity', {
    type: DataType.DATE,
    propertyName: 'dateOfMaturity',
  });
  map.set('dateOfTurnover', {
    type: DataType.DATE,
    propertyName: 'dateOfTurnover',
  });
  map.set('comment', { type: DataType.STRING, propertyName: 'comment' });
  map.set('netAmount', {
    type: DataType.NUMBER_DEC,
    propertyName: 'netAmount',
  });
  map.set('vatAmount', {
    type: DataType.NUMBER_DEC,
    propertyName: 'vatAmount',
  });
  map.set('vatRate', { type: DataType.NUMBER_DEC, propertyName: 'vatRate' });
  map.set('grossAmount', {
    type: DataType.NUMBER_DEC,
    propertyName: 'grossAmount',
  });
  map.set('advancePayAmount', {
    type: DataType.NUMBER_DEC,
    propertyName: 'advancePayAmount',
  });
  map.set('invoiceItems', {
    type: DataType.ARRAY,
    propertyName: 'items',
    arrayElementMapFunction: mapInvoiceItemToString(),
  });
  map.set('notes', {
    type: DataType.ARRAY,
    propertyName: 'notes',
    arrayElementMapFunction: mapInvoiceNotesToString(),
  });
  return map;
}

export function mapInvoiceItemToString(): Map<string, string> {
  const map: Map<string, string> = new Map<string, string>();
  map.set('description', 'description');
  map.set('uom', 'uom');
  map.set('pricePerUnit', 'pricePerUnit');
  map.set('quantity', 'quantity');
  map.set('netPrice', 'netPrice');
  map.set('vatAmount', 'vatAmount');
  map.set('vatRate', 'vatRate');
  map.set('grossPrice', 'grossPrice');
  return map;
}

export function mapInvoiceNotesToString(): Map<string, string> {
  const map: Map<string, string> = new Map<string, string>();
  map.set('name', 'name');
  map.set('description', 'description');
  return map;
}

export function mapUserToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('username', { type: DataType.STRING, propertyName: 'username' });
  map.set('fullName', { type: DataType.STRING, propertyName: 'fullName' });
  map.set('displayName', {
    type: DataType.STRING,
    propertyName: 'displayName',
  });
  map.set('email', { type: DataType.STRING, propertyName: 'email' });
  map.set('language', { type: DataType.STRING, propertyName: 'language' });
  map.set('enabled', { type: DataType.BOOLEAN, propertyName: 'enabled' });
  return map;
}

export function mapWorkOrderToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('buyer', {
    type: DataType.OBJECT,
    propertyName: 'buyer',
    objectAttr: 'name',
  });
  map.set('number', { type: DataType.STRING, propertyName: 'number' });
  map.set('dateOfCreate', {
    type: DataType.DATE,
    propertyName: 'dateOfCreate',
  });
  map.set('description', {
    type: DataType.STRING,
    propertyName: 'description',
  });
  map.set('forPerson', { type: DataType.STRING, propertyName: 'forPerson' });
  map.set('note', { type: DataType.STRING, propertyName: 'note' });
  map.set('placeOfIssue', {
    type: DataType.STRING,
    propertyName: 'placeOfIssue',
  });
  // TODO
  // napravi za workOrderItems array
  return map;
}

export function mapIncomeToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('date', { type: DataType.DATE, propertyName: 'date' });
  map.set('amount', { type: DataType.NUMBER_DEC, propertyName: 'amount' });
  map.set('comment', { type: DataType.STRING, propertyName: 'comment' });
  map.set('bankStatementNumber', {
    type: DataType.STRING,
    propertyName: 'bankStatementNumber',
  });
  map.set('buyer', {
    type: DataType.OBJECT,
    propertyName: 'buyer',
    objectAttr: 'name',
  });
  return map;
}

export function mapOutcomeToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('date', { type: DataType.DATE, propertyName: 'date' });
  map.set('amount', { type: DataType.NUMBER_DEC, propertyName: 'amount' });
  map.set('comment', { type: DataType.STRING, propertyName: 'comment' });
  map.set('bankStatementNumber', {
    type: DataType.STRING,
    propertyName: 'bankStatementNumber',
  });
  map.set('buyer', {
    type: DataType.OBJECT,
    propertyName: 'buyer',
    objectAttr: 'name',
  });
  return map;
}

export function mapBuyerToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('name', { type: DataType.STRING, propertyName: 'name' });
  map.set('pib', { type: DataType.STRING, propertyName: 'pib' });
  map.set('maticalNumber', {
    type: DataType.STRING,
    propertyName: 'maticalNumber',
  });
  map.set('address', { type: DataType.STRING, propertyName: 'address' });
  map.set('city', {
    type: DataType.OBJECT,
    propertyName: 'city',
    objectAttr: 'name',
  });
  map.set('contactPerson', {
    type: DataType.STRING,
    propertyName: 'contactPerson',
  });
  map.set('email', { type: DataType.STRING, propertyName: 'email' });
  map.set('phoneNumberFix', {
    type: DataType.STRING,
    propertyName: 'phoneNumberFix',
  });
  map.set('phoneNumberMobile', {
    type: DataType.STRING,
    propertyName: 'phoneNumberMobile',
  });
  map.set('jbkjs', { type: DataType.STRING, propertyName: 'jbkjs' });
  return map;
}

export function mapCityToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('name', { type: DataType.STRING, propertyName: 'name' });
  map.set('zipCode', { type: DataType.STRING, propertyName: 'zipCode' });
  map.set('country', {
    type: DataType.OBJECT,
    propertyName: 'jbkjs',
    objectAttr: 'description',
  });
  return map;
}

export function mapCountryToTable(): Map<
  string,
  { type: DataType; propertyName: string }
> {
  const map: Map<string, DataObject> = new Map<string, DataObject>();
  map.set('description', {
    type: DataType.STRING,
    propertyName: 'description',
  });
  return map;
}
