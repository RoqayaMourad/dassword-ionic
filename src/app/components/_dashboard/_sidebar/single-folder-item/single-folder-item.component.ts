import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-single-folder-item',
  templateUrl: './single-folder-item.component.html',
  styleUrls: ['./single-folder-item.component.scss'],
})
export class SingleFolderItemComponent implements OnInit {

  @Input() name = "";
  constructor() { }

  ngOnInit() {}

}
