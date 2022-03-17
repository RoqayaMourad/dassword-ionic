import { IIPFSState } from './../../interfaces/IPFS.interface';
import { Api } from './../api/api';
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
import { HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private alertController: AlertController, private toastController: ToastController, public loadingController: LoadingController, private storage: StorageService, private ipfs: IPFSService, private api: Api) {
  }

  user: User = new User();
  filter$: BehaviorSubject<string> = new BehaviorSubject("")
  setSearch$: BehaviorSubject<string> = new BehaviorSubject("")
  /**
   * The logged in Master password, this value is never called unless from this class only
   *
   * @private
   * @type {string}
   * @memberof DataService
   */
  private MASTER_PASSWORD: string;
  /**
   * The main Db Observable used across the app
   *
   * @type {BehaviorSubject<MainDB>}
   * @memberof DataService
   */
  mainDb: MainDB = null;

  IPFSState: IIPFSState;
  // ==========================================================================================
  //#region ====== DB Storage Handling
  // ==========================================================================================

  async initDb() {
    let db_json: IMainDB;
    // try to get db from local storage
    try{
      db_json = await this.getDbFromStorage();
      return await this.setDb(db_json);
    }catch{
      return await this.setDb();
    }
  }

  /**
   * Sets the Main db and updates all subscribers to to observable
   *
   * @param {MainDB} mainDb
   * @memberof DataService
   */
  async setDb(_mainDb_obj?: MainDB | IMainDB) {
    let maindb = new MainDB(_mainDb_obj)
    this.mainDb = maindb;
    return await this.refreshDb();
  }

  /**
   *  Emit change to all listener to the db object and update the local storage
   *
   * @param {boolean} [updateStorage=true] Whether or not to update the local storage
   * @memberof DataService
   */
  async refreshDb(updateStorage = true) {
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
      // stringfy the database
      let stringfiyedDb = JSON.stringify(mainDb);
      // encrypt the database to store in the local storage
      let encryptedDbString = Security.encryptString(stringfiyedDb, this.MASTER_PASSWORD)
      // store the encrypted db to the local storage
      this.storage.set("maindb", encryptedDbString).then((db) => {
        console.log("Db saved in storage 📄 -> 📦");
        resolve(mainDb)
      }).catch(reject)
      setTimeout(() => {
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
    return new Promise<IMainDB>((resolve, reject) => {
      this.storage.get("maindb").then((encryptedDb) => {
        console.log("Db loaded from storage 📦 -> 📄  ");
        let db_object;
        try {
          // decrypt the database from the local storage
          let decryptedDbString: any = Security.decryptString(encryptedDb, this.MASTER_PASSWORD);
          // parse the database
          db_object = JSON.parse(decryptedDbString)
        } catch (error) {
          // if parse failed reset storage
          this.resetStorage(false)
          reject(error)
          return;
        }
        resolve(db_object)
      }).catch(reject)
      setTimeout(() => {
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
   * Get the user from the local storage
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
  setMasterPassword(password) {
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
    // TODO:Encrypt the current db with MASTER_PASSWORD
    let str = JSON.stringify(this.mainDb);
    let lastState = this.IPFSState;
    this.IPFSState = "Uploading";
    let encryptedDbString: any = Security.encryptString(str, this.MASTER_PASSWORD);
    let enctyptedDBObject: IEnctyptedDBObject = { data: encryptedDbString }

    // the following conversion supports arabic characters, emojis and Chinese and asian character
    // Object ==> String ==> Base64 ==> ArrayBuffer ==> File

    // Convert the encrypted db to string
    let enctyptedStringfiedDBObject = JSON.stringify(enctyptedDBObject);

    // encode the string to base64
    let strBase64 = Base64.encode(enctyptedStringfiedDBObject)

    // convert the base64 string to file formate
    // var blob = new Blob([strBase64], { type: 'text/plain' });
    // var file = new File([blob], HelperService.makeid(), { type: "text/plain" });

    // upload file
    const sec = new Security();
    const secureAuthObject = sec.generateSecureAuthObject(this.user.email, this.MASTER_PASSWORD)
    const dbObject = {
      secureAuthObject,
      encrypteddb:strBase64,
      db_version: this.mainDb.objectVersionId
    }
    // Start uploading
    return new Promise((resolve, reject) => {
      this.api.post(`ipfs/store/db/`, dbObject).subscribe(
        async (response) => {
            // when file upload is successful set the user to local storage and dismiss loading
            const body = response;
            if (body.success) {
              await this.setUser(body.data);
              this.IPFSState = "Synced";
              resolve(body.data)
            } else {
              this.IPFSState = lastState;
              reject("Faild to update DB");
            }
        },
        e => {
          this.IPFSState = lastState;
          reject("Faild to update DB");
        }
      )
    })

  }

  /**
   * Get the db to the IPFS network
   * @memberof DataService
   */
  async getDbFromIPFS() {
    // upload file
    const sec = new Security();
    const secureAuthObject = sec.generateSecureAuthObject(this.user.email, this.MASTER_PASSWORD);
    let lastState = this.IPFSState;
    this.IPFSState = "Downloading";
    // Start Downloading the encrypted DB
    return new Promise((resolve, reject) => {
      this.api.post<IEnctyptedDBObject>(`ipfs/retrive/db/`, { secureAuthObject }).subscribe(r => {
        if (r.success && r.data) {
          let enctyptedDBObject: IEnctyptedDBObject = r.data
          // TODO:Decrypt the current db with MASTER_PASSWORD
          let decryptedDbString: any = Security.decryptString(enctyptedDBObject.data, this.MASTER_PASSWORD);
          let mainDb = JSON.parse(decryptedDbString);
          this.setDb(mainDb);
          resolve(true);
          this.IPFSState = "Synced";
          return;
        }
        this.IPFSState = lastState;
        reject(false);
      },
        e => {
          this.IPFSState = lastState;
          reject(e)
        }
      )
    })
  }

  /**
   * Check if the local db version is the latest version, if it's not update the local version
   *
   * @memberof DataService
   */
  async syncDb() {
    // check that main db is inited and user is logged in
    if (!this.mainDb || !this.user.user_id) {
      throw new Error("User or local DB not found");
    }
    if (this.user.db_version && this.mainDb.objectVersionId < this.user.db_version) {
      await this.getDbFromIPFS();
    }
  }

  //#endregion

  async resetStorage(resetUser = true) {
    this.setDb(new MainDB());
    if (resetUser) {
      this.MASTER_PASSWORD = "";
      await this.setUser(new User());
      await this.storage.set("user", "")
      await this.storage.remove("user")
    };
    console.log("Storage Rest 🔁")
  }

  // ==========================================================================================
  // #region ============================== Messaging
  // ==========================================================================================
  showItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null)
  // #endregion


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

  async toast(message = "okay", title = "", duration = 5000) {
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
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
  }

  toastError(message) {
    if (!message) {
      return;
    }
    console.error(message);
    if (typeof message === "string") {
      this.toast(message, "Error")
      return;
    }
    if (typeof message === "object") {
      if (typeof message.message === "string") {
        this.toast(message.message, "Error")
        return;
      }
    }
    this.toast(message.message, "Error")
  }

  loading_present: any;
  async show_loading(max_duartion = 300000) {
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

