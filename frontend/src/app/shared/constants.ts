import { EnumValueModel } from './enums/enum.model';

// BASE_API_URL should have value 'http://localhost:8081' in DEVELOPMENT MODE, otherwise empty string ''
// export const BASE_API_URL: string = '';
export const BASE_API_URL: string = 'http://localhost:8081';

export const DOMAIN_BUYERS: string = 'buyers';
export const DOMAIN_COUNTRIES: string = 'countries';
export const DOMAIN_USERS: string = 'users';
export const DOMAIN_INCOMES: string = 'incomes';
export const DOMAIN_OUTCOMES: string = 'outcomes';
export const DOMAIN_CITY: string = 'cities';
export const DOMAIN_IMAGES: string = 'images';
export const DOMAIN_INVOICES: string = 'invoices';
export const DOMAIN_ROLES: string = 'roles';
export const DOMAIN_WORK_ORDERS: string = 'workorders';
export const DOMAIN_HISTORY: string = 'histories';

// Login form content type
export const LOGIN_FORM_CONTENT_TYPE: { 'Content-Type': string } = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

////////////////////////////////////////////////////////////////////////

// export const ROLE_TYPES: EnumValueModel[] = [
//   { value: 'ADMIN', displayName: 'admin' },
//   { value: 'SALES', displayName: 'sales' },
// ];

export const BUYER_TYPES: EnumValueModel[] = [
  { value: 'COMPANY', displayName: 'company' },
  { value: 'PERSON', displayName: 'person' },
];

export const GENDER_TYPES: EnumValueModel[] = [
  { value: 'MAN', displayName: 'man' },
  { value: 'WOMAN', displayName: 'woman' },
  { value: 'REST', displayName: 'rest' },
];

export const INVOICE_TYPES: EnumValueModel[] = [
  { value: 'DOMESTIC', displayName: 'domesticInvoice' },
  { value: 'FOREIGN', displayName: 'foreignInvoice' },
  { value: 'CASH', displayName: 'cashInvoice' },
  { value: 'PRE_INVOICE', displayName: 'preInvoice' },
  { value: 'ADVANCE_INVOICE', displayName: 'advanceInvoice' },
];

export const UOM_TYPES: EnumValueModel[] = [
  { value: 'M2', displayName: 'm2' },
  { value: 'M', displayName: 'm' },
  { value: 'PCS', displayName: 'pieces' },
  { value: 'HOUR', displayName: 'hour' },
];

export const OBJECT_TYPES: EnumValueModel[] = [
  { value: 'user', displayName: 'user' },
  { value: 'workOrder', displayName: 'workOrder' },
  { value: 'invoice', displayName: 'invoice' },
  { value: 'income', displayName: 'income' },
  { value: 'outcome', displayName: 'outcome' },
  { value: 'buyer', displayName: 'buyer' },
  { value: 'city', displayName: 'city' },
  { value: 'country', displayName: 'country' },
];

export const ACTION_OBJECT_TYPES: EnumValueModel[] = [
  { value: 'CREATE', displayName: 'create' },
  { value: 'UPDATE', displayName: 'update' },
  { value: 'DELETE', displayName: 'delete' },
];
