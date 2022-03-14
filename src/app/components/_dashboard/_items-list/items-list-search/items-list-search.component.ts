import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewItemComponent } from '../../_item_details/new-item/new-item.component';

@Component({
  selector: 'app-items-list-search',
  templateUrl: './items-list-search.component.html',
  styleUrls: ['./items-list-search.component.scss'],
})
export class ItemsListSearchComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }


  async createItem() {
    const modal = await this.modalController.create({
      component: NewItemComponent,
      backdropDismiss:true,


    });
    await modal.present();
  }


}
