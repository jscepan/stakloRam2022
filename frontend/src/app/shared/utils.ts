import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { BaseModel } from './models/base-model';
import { ServiceModel } from './models/service.model';

// tslint:disable-next-line:ban-types
declare const gtag: Function;

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 'n/a';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  if (i === 0) {
    return bytes + ' ' + sizes[i];
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}

export function constructUrl(
  endpoint: string,
  from?: number,
  to?: number
): string {
  let queryParamsStr: string = '';
  if (from !== undefined && to !== undefined) {
    queryParamsStr = `?skip=${from}&top=${to}`;
  }
  return endpoint + queryParamsStr;
}

export function getServiceNumber(service: ServiceModel): string {
  return (
    service.number +
    '/' +
    new Date(service.dateOfCreate).getFullYear().toString()
  );
}

export function getFormatedDate(date: string): string {
  return formatDate(date, 'dd/MM/yyyy', 'en-US');
}

export function getOid(_index: number, card: { oid: string }): string {
  return card.oid;
}

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toLocaleUpperCase();
}

export function mapExtensionToIcon(extension?: string): string {
  switch (extension) {
    case '3dm':
      return 'file-threedm';
    case 'docx':
    case 'jpg':
    case 'pdf':
    case 'png':
    case 'xlsx':
      return `file-${extension}`;
    default:
      return 'file-other';
  }
}

export function getDefaultSortOptions(
  translateService: TranslateService
): { key: string; value: string }[] {
  const options = [
    { key: 'newest', value: translateService.instant('newest') },
    { key: 'oldest', value: translateService.instant('oldest') },
    {
      key: 'azAlphabetically',
      value: translateService.instant('azAlphabetically'),
    },
    {
      key: 'zaAlphabetically',
      value: translateService.instant('zaAlphabetically'),
    },
  ];
  return options;
}

export function copyTextToClipboard(inputId: string): Observable<void> {
  return new Observable((subscriber: Observer<void>) => {
    try {
      if (document.queryCommandSupported('copy')) {
        // tslint:disable-next-line:no-any
        const inputElement: any = document.getElementById(inputId);
        inputElement.select();
        inputElement.setSelectionRange(0, 10000);
        document.execCommand('copy');
        subscriber.next();
        subscriber.complete();
      }
    } catch {
      subscriber.error('Copy not supported');
    }
  });
}

export function searchInText(searchText: string, fields: string[]): boolean {
  const searchWords: { word: string; found?: boolean }[] = searchText
    .split(' ')
    .map((st) => {
      return { word: st, found: false };
    });
  fields.forEach((field) => {
    if (field) {
      searchWords.forEach((obj) => {
        if (field.toLowerCase().includes(obj.word)) {
          obj.found = true;
        }
      });
    }
  });
  return searchWords.filter((sw) => sw.found).length === searchWords.length;
}

export function roundOnDigits(
  value: number,
  numberOfDigits: number = 2
): number {
  return (
    Math.round(value * Math.pow(10, numberOfDigits)) /
    Math.pow(10, numberOfDigits)
  );
}

export function getDaysBetweenTwoDates(first: Date, second: Date): number {
  return (first.getTime() - second.getTime()) / (1000 * 3600 * 24);
}

export function compareByValue(f1: BaseModel, f2: BaseModel) {
  return f1 && f2 && f1.oid === f2.oid;
}
