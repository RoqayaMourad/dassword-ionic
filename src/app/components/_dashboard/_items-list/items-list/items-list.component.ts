import { ItemType } from './../../../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Item } from 'src/app/models/item.class';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {

  constructor(fb: FormBuilder, public data: DataService) { }
  filteredItems: Item[];
  ngOnInit() {
    this.data.filter$.subscribe(
      (str) => {
        this.filter(str);
      })
      setTimeout(() => {
        this.filter("")
      }, 500);
  }


  filter(str:string) {
    // if no entry show all items
    if (!str) {
      this.filteredItems = this.data?.mainDb?.items
      return;
    }
    this.filteredItems = [];
    str = str.trim();
    // if type entry show type
    if (str.indexOf("type:") == 0) {
      let type:ItemType = str.replace("type:","") as ItemType;
      for (let i = 0; i < this.data.mainDb.items.length; i++) {
        const item = this.data.mainDb.items[i];
        if (item.hasType(type)) {
          this.filteredItems.push(item)
        }
      }
      return;
    }
    for (let i = 0; i < this.data.mainDb.items.length; i++) {
      const item = this.data.mainDb.items[i];
      if (item.hasWord(str,true)) {
        this.filteredItems.push(item)
      }
    }
  }

}
