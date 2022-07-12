import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorage: Storage;
  private isLocalStorageSupported: boolean;

  constructor() {
    this.localStorage = window.localStorage;
    this.isLocalStorageSupported = !!this.localStorage;
  }

  get(key: string): string {
    if (this.isLocalStorageSupported) {
      const value = this.localStorage.getItem(key);
      if (value && value !== 'undefined') {
        return value;
      }
    }
    return '';
  }

  set(key: string, value: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, value);
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  localStorageSpace(): void {
    if (!this.isLocalStorageSupported) {
      console.log('Local storage is not supported');
      return;
    }
    let data = '';

    for (const key in this.localStorage) {
      if (this.localStorage.hasOwnProperty(key)) {
        data += this.localStorage[key];
        console.log(
          `${key} = ${(
            (this.localStorage[key].length * 16) /
            (8 * 1024)
          ).toFixed(2)} KB`
        );
      }
    }

    if (data) {
      console.log(
        `Total space used: ${((data.length * 16) / (8 * 1024)).toFixed(2)} KB`
      );

      console.log(
        `Approx. space remaining:  ${
          5120 - Number(((data.length * 16) / (8 * 1024)).toFixed(2))
        } KB`
      );
    } else {
      console.log('Total space used 0 KB');
      console.log('Approx. space remaining: 5MB');
    }
  }
}
