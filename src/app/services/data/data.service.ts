import { Security } from 'src/app/models/security.class';
import { HelperService } from 'src/app/services/util/helper';
import { User } from './../../models/user.class';
import { IPFSService } from './ipfs.service';
import { MainDB } from './../../models/maindb.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Base64 } from 'js-base64';
import { IUser } from 'src/app/interfaces/user.interface';
import { IEnctyptedDBObject, IMainDB } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private alertController: AlertController, private toastController: ToastController, public loadingController: LoadingController, private storage: StorageService, private ipfs: IPFSService) {
  }

  user: User = new User();
  private MASTER_PASSWORD:string;
  /**
   * The main Db Observable used across the app
   *
   * @type {BehaviorSubject<MainDB>}
   * @memberof DataService
   */
  mainDb: MainDB = new MainDB();
  mainDb$: BehaviorSubject<MainDB> = new BehaviorSubject(this.mainDb);


  // ==========================================================================================
  //#region ====== DB Storage Handling
  // ==========================================================================================

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
      // Test Upload File
      setTimeout(() => {
        this.uploadDbToIPFS()
      }, 5000);
    }

  }

  /**
   * Sets the Main db and updates all subscribers to to observable
   *
   * @param {MainDB} mainDb
   * @memberof DataService
   */
  async setDb(_mainDb_obj: MainDB | IMainDB) {
    let maindb = new MainDB(_mainDb_obj)
    this.mainDb = maindb;
    await this.refreshDb();
  }

  /**
   *  Emit change to all listener to the db object and update the local storage
   *
   * @param {boolean} [updateStorage=true] Whether or not to update the local storage
   * @memberof DataService
   */
  async refreshDb(updateStorage = true) {
    this.mainDb$.next(this.mainDb);
    if (updateStorage) {
      await this.setDbToStorage();
      return this.mainDb
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
   * @return {MainDB}
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
  //#endregion


  // ==========================================================================================
  // #region ============================== User Storage Handling
  // ==========================================================================================

  /**
     * Sets the Main db and updates all subscribers to to observable
     *
     * @param {User} user_obj
     * @memberof DataService
     */
  async setUser(user_obj: User | IUser, updateStorage = true) {
    let user = new User(user_obj);
    delete user.secure_hash // make sure the secure hash is not saved
    this.user = user;
    if (updateStorage) {
      await this.setUserToStorage(this.user)
    }
  }
  /**
   * Store the user to the local storage
   *
   * @param {User} [user] Db object to set to the db
   * @param {number} [delay=100] object fetch from storage delay
   * @memberof DataService
   */
  async setUserToStorage(user?: User, delay = 100) {
    user = user || this.user;
    new Promise((resolve, reject) => {
      setTimeout(() => {
        this.storage.set("user", user).then((user) => {
          console.log("User saved in storage 🧑 -> 📦");
          resolve(user)
        }).catch(reject)
      }, delay);
    })
  }

  /**
   * Get the db from the local storage
   *
   * @param {number} [delay=100] object fetch from storage delay
   * @return {User}
   */
  async getUserFromStorage(delay = 100) {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        this.storage.get("user").then((user_json) => {
          console.log("User loaded from storage 📦 -> 🧑  ");
          let user = new User(user_json)
          resolve(user)
        }).catch(reject)
      }, delay);
    })
  }

  /**
   * Set the master password used for db encryption and generating trusted hashes
   *
   * @memberof DataService
   */
  setMasterPassword(password){
    this.MASTER_PASSWORD = password;
  }
  //#endregion


  // ==========================================================================================
  // #region ============================== IPFS Handling
  // ==========================================================================================

  /**
   * Upload the current db to the IPFS network
   * @memberof DataService
   */
  async uploadDbToIPFS() {
    try {
      // TODO:Encrypt the current db with MASTER_PASSWORD
      let str = JSON.stringify(this.mainDb);
      let enctyptedDBObject:IEnctyptedDBObject = {data:str}

      // the following conversion supports arabic characters, emojis and Chinese and asian character
      // Object ==> String ==> Base64 ==> ArrayBuffer ==> File

      // Convert the encrypted db to string
      let enctyptedStringfiedDBObject = JSON.stringify(enctyptedDBObject);

      // encode the string to base64
      let strBase64 = Base64.encode(enctyptedStringfiedDBObject)

      // convert the base64 string to file formate
      var blob = new Blob([strBase64], { type: 'text/plain' });
      var file = new File([blob], HelperService.makeid(), { type: "text/plain" });

      // upload file
      const sec = new Security();
      const secure_hash = sec.generateSecureAuthObject(this.user.email,this.MASTER_PASSWORD)
      await this.ipfs.uploadFileToIPFS("db",file,secure_hash);
    } catch (error) {
      console.error(error)
      throw new Error(error);
    }
  }

  /**
   * Get the db to the IPFS network
   * @memberof DataService
   */
  async getDbFromIPFS() {
    try {
      // upload file
      const sec = new Security();
      const secure_hash = sec.generateSecureAuthObject(this.user.email,this.MASTER_PASSWORD)
      this.ipfs.getDbFromIPFS(secure_hash).subscribe(r=>{
        if (r.success && r.data) {
          let enctyptedDBObject:IEnctyptedDBObject = r.data

          // TODO:Decrypt the current db with MASTER_PASSWORD
          let mainDb = JSON.parse(enctyptedDBObject.data);
          this.setDb(mainDb);
        }
      });

    } catch (error) {
      console.error(error)
      throw new Error(error);
    }
  }

  //#endregion

  // ==========================================================================================
  // #region ============================== Alerts
  // ==========================================================================================

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
  //#endregion


}

