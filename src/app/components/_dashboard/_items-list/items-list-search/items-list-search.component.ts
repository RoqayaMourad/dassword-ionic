import { DataService } from 'src/app/services/data/data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewItemComponent } from '../../_item_details/new-item/new-item.component';

@Component({
  selector: 'app-items-list-search',
  templateUrl: './items-list-search.component.html',
  styleUrls: ['./items-list-search.component.scss'],
})
export class ItemsListSearchComponent implements OnInit {

  filterForm:FormGroup;
  constructor(private modalController: ModalController, fb:FormBuilder, private data:DataService) {
    this.filterForm = fb.group({
      searchField:[""]
    })
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe((v)=>{
      let value = this.filterForm.get("searchField").value
      this.data.filter$.next(value as string)
    })
  }


  async createItem() {
    const modal = await this.modalController.create({
      component: NewItemComponent,
      backdropDismiss:true,
      cssClass: 'createItemModal',

    });
    await modal.present();
  }


}
