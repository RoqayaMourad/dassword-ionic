import { DataService } from 'src/app/services/data/data.service';
import { Item } from 'src/app/models/item.class';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-list-item',
  templateUrl: './single-list-item.component.html',
  styleUrls: ['./single-list-item.component.scss'],
})
export class SingleListItemComponent implements OnInit {

  constructor(private data:DataService) { }

  @Input() item: Item = new Item();
  ngOnInit() { }

  isActive(itemId) {
    if (this.data.showItem$.value == itemId) {
      return true;
    }
    return false;
  }

  showItem() {
    this.data.showItem$.next(this.item.itemId);
  }

}
