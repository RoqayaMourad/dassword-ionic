import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-menu-item',
  templateUrl: './single-menu-item.component.html',
  styleUrls: ['./single-menu-item.component.scss'],
})
export class SingleMenuItemComponent implements OnInit {

  @Input() name="";
  @Input() icon="";
  constructor() { }

  ngOnInit() {}

}
