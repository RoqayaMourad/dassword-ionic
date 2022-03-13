import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  isList: number;
  isMenu: boolean = false;
  isMenuBtn() {
    this.isMenu = !this.isMenu;
  }
  isSearch: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
 

