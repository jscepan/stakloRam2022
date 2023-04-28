import { environment } from 'src/environments/environment';
import { EnumValueModel } from './enums/enum.model';

// BASE_API_URL should have value 'http://localhost:8081' in DEVELOPMENT MODE, otherwise empty string ''
// export const BASE_API_URL: string = '';
export const BASE_API_URL: string = environment.baseApiUrl;

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

export const PRIVILEGES: EnumValueModel[] = [
  { value: 'USER_ANY', displayName: 'userBasicPrivileges' },
  { value: 'INVOICES_VIEW', displayName: 'invoicesViewPrivilege' },
  { value: 'INVOICE_VIEW', displayName: 'invoiceViewPrivilege' },
  { value: 'INVOICE_CREATE', displayName: 'invoiceCreateEditPrivilege' },
  { value: 'INVOICE_DELETE', displayName: 'invoiceDeletePrivilege' },
  { value: 'INCOMES_VIEW', displayName: 'incomesViewPrivilege' },
  { value: 'INCOME_VIEW', displayName: 'incomeViewPrivilege' },
  { value: 'INCOME_CREATE', displayName: 'incomeCreateEditPrivilege' },
  { value: 'INCOME_DELETE', displayName: 'incomeDeletePrivilege' },
  { value: 'OUTCOMES_VIEW', displayName: 'outcomesViewPrivilege' },
  { value: 'OUTCOME_VIEW', displayName: 'outcomeViewPrivilege' },
  { value: 'OUTCOME_CREATE', displayName: 'outcomeCreateEditPrivilege' },
  { value: 'OUTCOME_DELETE', displayName: 'outcomeDeletePrivilege' },
  { value: 'WORK_ORDERS_VIEW', displayName: 'workOrdersViewPrivilege' },
  { value: 'WORK_ORDER_VIEW', displayName: 'workOrderViewPrivilege' },
  { value: 'WORK_ORDER_CREATE', displayName: 'workOrderCreateEditPrivilege' },
  { value: 'WORK_ORDER_DELETE', displayName: 'workOrderDeletePrivilege' },
  { value: 'DEBTORS_VIEW', displayName: 'debtorsViewPrivilege' },
  { value: 'DEBTOR_VIEW', displayName: 'debtorViewPrivilege' },
  { value: 'BUYERS_VIEW', displayName: 'buyersViewPrivilege' },
  { value: 'BUYER_CREATE', displayName: 'buyerCreateEditPrivilege' },
  { value: 'BUYER_DELETE', displayName: 'buyerDeletePrivilege' },
  { value: 'COUNTRIES_VIEW', displayName: 'countriesViewPrivilege' },
  { value: 'COUNTRY_CREATE', displayName: 'countryCreateEditPrivilege' },
  { value: 'COUNTRY_DELETE', displayName: 'countryDeletePrivilege' },
  { value: 'CITIES_VIEW', displayName: 'citiesViewPrivilege' },
  { value: 'CITY_CREATE', displayName: 'cityCreatePrivilege' },
  { value: 'CITY_DELETE', displayName: 'cityDeletePrivilege' },
  { value: 'USERS_VIEW', displayName: 'usersViewPrivilege' },
  { value: 'USER_CREATE', displayName: 'userCreatePrivilege' },
  { value: 'SETTINGS_VIEW', displayName: 'settingsViewPrivilege' },
  { value: 'SETTINGS_MODIFY', displayName: 'settingsEditPrivilege' },
  { value: 'HISTORIES_VIEW', displayName: 'historiesViewPrivilege' },
  { value: 'HISTORY_VIEW', displayName: 'historyViewPrivilege' },
];

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
  { value: 'FINAL', displayName: 'finalInvoice' },
];

export const UOM_TYPES: EnumValueModel[] = [
  { value: 'M2', displayName: 'm2' },
  { value: 'M', displayName: 'm' },
  { value: 'PCS', displayName: 'pieces' },
  { value: 'HOUR', displayName: 'hour' },
  { value: 'KG', displayName: 'kg' },
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
