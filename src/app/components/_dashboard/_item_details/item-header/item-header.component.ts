import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.scss'],
})
export class ItemHeaderComponent implements OnInit {

  constructor() { }

  @Input() title;
  @Input() subTitle;
  @Input() iconUrl;
  ngOnInit() {}

}
