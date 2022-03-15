import { IPFSService } from './ipfs.service';
import { MainDB } from './../../models/maindb.class';
import { HelperService } from './../util/helper';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private alertController: AlertController, private toastController: ToastController, public loadingController: LoadingController, private storage: StorageService, private ipfs: IPFSService) {
  }

  /**
   * The main Db Observable used across the app
   *
   * @type {BehaviorSubject<MainDB>}
   * @memberof DataService
   */
  mainDb: MainDB = new MainDB();
  mainDb$: BehaviorSubject<MainDB> = new BehaviorSubject(this.mainDb);


  async initDb() {
    let db: MainDB;
    // try to get db from local storage
    db = await this.getDbFromStorage();
    if (db) {
      this.setDb(db)
    }
    // else init a new db
    else {
      db = new MainDB()
      this.setDb(db);
    }

    // Test Upload File
    setTimeout(() => {
      // this.uploadDbToIPFS()
    }, 5000);
  }

  /**
   * Sets the Main db and updates all subscribers to to observable
   *
   * @param {MainDB} mainDb
   * @memberof DataService
   */
  setDb(_mainDb_obj: MainDB) {
    let maindb = new MainDB(_mainDb_obj)
    this.mainDb = maindb;
    this.refresh();
  }

  /**
   *  Emit change to all listener to the db object and update the local storage
   *
   * @param {boolean} [updateStorage=true] Whether or not to update the local storage
   * @memberof DataService
   */
  async refresh(updateStorage = true) {
    this.mainDb$.next(this.mainDb);
    if (updateStorage) {
      await this.setDbToStorage();
    }
  }

  /**
   * Store the db to the local storage
   *
   * @param {MainDB} [mainDb] Db object to set to the db
   * @param {number} [timeout=100] object fetch from storage delay
   * @memberof DataService
   */
  async setDbToStorage(mainDb?: MainDB, delay = 100) {
    mainDb = mainDb || this.mainDb;
    new Promise((resolve, reject) => {
      setTimeout(() => {
        this.storage.set("maindb", mainDb).then((db) => {
          console.log("Db saved in storage 📄 -> 📦");
          resolve(db)
        }).catch(reject)
      }, delay);
    })
  }

  /**
   * Get the db from the local storage
   *
   * @param {MainDB} [mainDb] Db object to set to the db
   * @param {number} [timeout=100] object fetch from storage delay
   * @memberof DataService
   */
  async getDbFromStorage(delay = 100) {
    return new Promise<MainDB>((resolve, reject) => {
      setTimeout(() => {
        this.storage.get("maindb").then((db_json) => {
          console.log("Db loaded from storage 📦 -> 📄  ");
          let maindb = new MainDB(db_json)
          resolve(maindb)
        }).catch(reject)
      }, delay);
    })
  }

  /**
   * Upload the current db to the IPFS network
   * @memberof DataService
   */
  async uploadDbToIPFS() {
    // TODO: run check before update such as user is logged in and db is encrypted
    try {
      // Convert the current db to string
      let str = JSON.stringify(this.mainDb);
      // encode the string to base64
      let strBase64 = Base64.encode(str)

      // convert the base64 string to file formate
      var blob = new Blob([strBase64], { type: 'text/plain' });
      var file = new File([blob], HelperService.makeid(), {type: "text/plain"});

      // upload file
      await this.ipfs.uploadFileToIPFS(file);
    } catch (error) {
      console.error(error)
      throw new Error(error);
    }
  }

  // ====== Alerts
  async alert(message = "Okay") {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async toast(message = "okay", title = "", duration = 30000) {
    const toast = await this.toastController.create({
      header: title,
      message,
      position: 'bottom',
      duration,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log("toast");
  }

  toastError(message) {
    console.error(message);
    this.toast(message, "Error")

  }

  loading_present: any;
  async show_loading(max_duartion = 20000) {
    this.loading_present = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'Please wait...',
      duration: max_duartion
    });

    await this.loading_present.present();
  }

  async dismiss_loading() {
    await this.loading_present?.dismiss();
  }


}
