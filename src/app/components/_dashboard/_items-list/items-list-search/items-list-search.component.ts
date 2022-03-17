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
    this.data.setSearch$.subscribe(type=>{
      this.filterForm.get("searchField").setValue(type)
    })
    this.filterForm.get("searchField").valueChanges.subscribe((v)=>{
      this.data.filter$.next(v as string)
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
