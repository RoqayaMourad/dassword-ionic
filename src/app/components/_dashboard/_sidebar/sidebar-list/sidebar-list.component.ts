import { ItemType } from './../../../../interfaces/interfaces';
import { DataService } from 'src/app/services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GenpasswordModalComponent } from '../genpassword-modal/genpassword-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
})
export class SidebarListComponent implements OnInit {

  constructor(private modalController: ModalController, public data:DataService) { }

  ngOnInit() {
    // determine the state
    setInterval(()=>{
      // if current state is synced
      if (this.data.IPFSState === "Synced") {
        // if the db has items
        if (this.data.mainDb.items?.length > 1) {
          // id the db version is newer
          if (this.data.mainDb.objectVersionId > this.data.user.db_version) {
            this.data.IPFSState = "Unsaved Changes";
          }
        }

      }
    },3000)
  }
  type:string = "All Items"
  // Set type
  setType(str:string){
    if (str == "All Items") {
      this.data.setSearch$.next("")
      this.type = str;
      return;
    }
    this.data.setSearch$.next("type:"+str)
    this.type = str;
  }

  async openSettingsModal() {
    const modal = await this.modalController.create({
    component: SettingsModalComponent,
    cssClass:"settingsModal"
    });

    await modal.present();

  }
  async openGenpassModal() {
    const modal = await this.modalController.create({
    component: GenpasswordModalComponent,
    cssClass:"genpassModal"
    });

    await modal.present();
  }

  syncIfYouNeed(){
    if (this.data.IPFSState == "Unsaved Changes") {
      this.data.uploadDbToIPFS().then(()=>{
        this.data.IPFSState = "Synced"
      })
    }
  }

  comingSoon(){
    this.data.alert('Coming Soon!')
  }
}
