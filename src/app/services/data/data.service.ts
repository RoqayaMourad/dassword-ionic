import { MainDB } from './../../models/maindb.class';
import { HelperService } from './../util/helper';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private alertController: AlertController, private toastController: ToastController, public loadingController: LoadingController, private storage: StorageService) {
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
    // Get db from local storage
    db = await this.getDbFromStorage();
    if (db) {
      this.setDb(db)
    }
    else {
      // if no db is NOT found init a new db
      db = new MainDB()
      this.setDb(db);
      console.log("DatabaseSet successfuly", db);
    }
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

  async refresh(updateStorage = true) {
    this.mainDb$.next(this.mainDb);
    await this.setDbToStorage();
  }

  async setDbToStorage(mainDb?: MainDB, timeout = 100) {
    mainDb = mainDb || this.mainDb;
    new Promise((resolve, reject) => {
      setTimeout(() => {
        this.storage.set("maindb", mainDb).then((db) => {
          console.log("Db saved in storage 📄 -> 📦");
          resolve(db)
        })
      }, timeout);
    })
  }

  async getDbFromStorage(timeout = 100) {
    return new Promise<MainDB>((resolve, reject) => {
      setTimeout(() => {
        this.storage.get("maindb").then((db) => {
          console.log("Db loaded from storage 📦 -> 📄  ");
          console.log(db);
          resolve(db)
        }).catch(reject)
      }, timeout);
    })
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
