import { TemplateRef } from '@angular/core';
export enum SweetAlertTypeEnum {
  input = 'input',
  prompt = 'prompt',
  confirm = 'confirm',
  submit = 'submit',
  custom = 'custom',
  alert = 'alert',
  copy = 'copy',
  confirmCheckbox = 'confirmCheckbox',
}

type SweetAlertTypeInput = {
  name: SweetAlertTypeEnum.input;
  buttons: {
    submit: string;
  };
};

type SweetAlertTypeAlert = {
  name: SweetAlertTypeEnum.alert;
  buttons: {
    ok: string;
  };
};

type SweetAlertTypePrompt = {
  name: SweetAlertTypeEnum.prompt;
  error?: {
    msg: string;
    compareString: string;
  };
  buttons: {
    cancel: string;
    submit: string;
  };
};

type SweetAlertTypeConfirm = {
  name: SweetAlertTypeEnum.confirm;
  buttons: {
    cancel?: string;
    confirm: string;
  };
};
type SweetAlertTypeSubmit = {
  name: SweetAlertTypeEnum.submit;
  buttons: {
    submit: string;
    cancel: string;
  };
};
type SweetAlertTypeCopy = {
  name: SweetAlertTypeEnum.copy;
  buttons: {
    cancel: string;
    copy: string;
  };
};
type SweetAlertTypeCustom = {
  name: SweetAlertTypeEnum.custom;
  customTemplate: TemplateRef<unknown>;
};
type SweetAlertTypeConfirmCheckbox = {
  name: SweetAlertTypeEnum.confirmCheckbox;
  checkbox: string;
  buttons: {
    cancel: string;
    submit: string;
  };
};
export interface SweetAlertI {
  id?: string;
  mode: 'primary' | 'success' | 'warning' | 'danger';
  type:
    | SweetAlertTypeInput
    | SweetAlertTypeAlert
    | SweetAlertTypePrompt
    | SweetAlertTypeSubmit
    | SweetAlertTypeConfirm
    | SweetAlertTypeCopy
    | SweetAlertTypeCustom
    | SweetAlertTypeConfirmCheckbox;
  icon?: string;
  title: string;
  message: string;
  userInput?: string;
  maxLength?: number;
  inputLabel?: string;
  confirmed?: boolean;
}
