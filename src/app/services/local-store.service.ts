import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
declare let localStorage: any;

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  baseUrl: string = 'http://localhost:5000';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveData(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  getData(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      let data = localStorage.getItem(key);
      return data;
    } else {
      return '';
    }
  }
  removeData(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  clearData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
