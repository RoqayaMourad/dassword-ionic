import { MainDB } from './../../models/maindb.class';
import { HelperService } from './../util/helper';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IMainDB } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private alertController: AlertController, private toastController: ToastController, public loadingController: LoadingController) {
  }

  /**
   * The main Db Observable used across the app
   *
   * @type {BehaviorSubject<MainDB>}
   * @memberof DataService
   */
  mainDb:MainDB = new MainDB();
  mainDb$:BehaviorSubject<MainDB> = new BehaviorSubject(this.mainDb);


  async initDb(user_id=""){
    let db:MainDB=new MainDB()
    db.setuser_id(user_id);
    this.setDb(db);
    console.log("DatabaseSet successfuly",db);

  }

  /**
   * Sets the Main db and updates all subscribers to to observable
   *
   * @param {MainDB} mainDb
   * @memberof DataService
   */
  setDb(mainDb:MainDB){
    this.mainDb = mainDb
    this.mainDb$.next(this.mainDb);
  }

  refresh(){
    this.mainDb$.next(this.mainDb);
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

  loading_present:any;
  async show_loading(max_duartion = 20000) {
    this.loading_present = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'Please wait...',
      duration: max_duartion
    });

    await this.loading_present.present();
  }

  async dismiss_loading(){
    await this.loading_present?.dismiss();
  }


}
