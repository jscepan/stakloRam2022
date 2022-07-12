import { EnumValueModel } from './enums/enum.model';

export const BASE_API_URL: string = 'http://localhost:8080';

export const DOMAIN_BUYERS: string = 'buyers';
export const DOMAIN_COUNTRIES: string = 'countries';
export const DOMAIN_USERS: string = 'users';
export const DOMAIN_INCOMES: string = 'incomes';
export const DOMAIN_OUTCOMES: string = 'outcomes';
export const DOMAIN_CITY: string = 'cities';
export const DOMAIN_IMAGES: string = 'images';
export const DOMAIN_TASKS: string = 'tasks';
export const DOMAIN_SUBTASKS: string = 'subtasks';
export const DOMAIN_CASES: string = 'cases';
export const DOMAIN_INVOICES: string = 'invoices';
export const DOMAIN_ROLES: string = 'roles';
export const DOMAIN_WORK_ORDERS: string = 'workorders';

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

export const SERVICE_STATUSES: EnumValueModel[] = [
  { value: 'OPEN', displayName: 'open' },
  { value: 'IN_PROGRESS', displayName: 'inProgress' },
  { value: 'RESOLVED', displayName: 'resolved' },
  { value: 'CANCELED', displayName: 'canceled' },
];

export const SERVICE_TYPES: EnumValueModel[] = [
  { value: 'CASE', displayName: 'case' },
  { value: 'TASK', displayName: 'task' },
  { value: 'SUBTASK', displayName: 'subtask' },
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
