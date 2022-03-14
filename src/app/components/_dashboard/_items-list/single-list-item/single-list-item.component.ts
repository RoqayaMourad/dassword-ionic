import { Item } from 'src/app/models/item.class';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-list-item',
  templateUrl: './single-list-item.component.html',
  styleUrls: ['./single-list-item.component.scss'],
})
export class SingleListItemComponent implements OnInit {

  constructor() { }

  @Input() item:Item = new Item();
  ngOnInit() {}

}
