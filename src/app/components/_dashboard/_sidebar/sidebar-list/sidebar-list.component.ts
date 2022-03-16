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

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

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
  
}
