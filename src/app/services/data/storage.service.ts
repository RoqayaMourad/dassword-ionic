import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    console.log("storage created")
    console.log(storage)
    this._storage = storage;
  }

  set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  get(key: string) {
    return this._storage?.get(key);
  }

  remove(key: string) {
    return this._storage?.remove(key);
  }
  /**
   *@deprecated
   * @memberof StorageService
   */
  async ready() {
    return true;
  }
}
