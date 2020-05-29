import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getItemString(key: string): string {
    return localStorage.getItem(key);
  }

  public stringifyItem(key: string, item: any): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public parseItem<T>(key: string) {
    return  JSON.parse(localStorage.getItem(key)) as T;
  }

  public setItem(key: string, item: any): void {
     localStorage.setItem(key, item);
  }

  public getItemJSON(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
