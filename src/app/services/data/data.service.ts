import { HelperService } from './../util/helper';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PasswordDBObject } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private alertController: AlertController, private toastController: ToastController, public loadingController: LoadingController, private h:HelperService) {
  }

  /**
   * The main Db Observable used across the app
   *
   * @type {BehaviorSubject<PasswordDBObject>}
   * @memberof DataService
   */
  PassDb$:BehaviorSubject<PasswordDBObject> = new BehaviorSubject({});


  async createNewDb(user_id){
    let db:PasswordDBObject={
      user_id:this.h.makeid(),
      object_version_id:this.h.makeid(),
      folders:[],
      items:[],
      email:"",
      secure_object:"",
    }
    return db;
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
