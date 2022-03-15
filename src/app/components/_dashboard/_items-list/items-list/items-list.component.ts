import { Item } from 'src/app/models/item.class';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {

  constructor(fb: FormBuilder, public data: DataService) { }
  items:Item[];
  ngOnInit() {
    this.data.mainDb$.subscribe(d=>{
      this.items = d.items;
      console.log("=============");
      console.log(d.items);

    })
  }
}
