import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-single-menu-item-with-icon',
  templateUrl: './single-menu-item-with-icon.component.html',
  styleUrls: ['./single-menu-item-with-icon.component.scss'],
})
export class SingleMenuItemWithIconComponent implements OnInit {

  @Input() name="";
  @Input() icon="";
  @Input() badge="";

  constructor() { }

  ngOnInit() {}

}
