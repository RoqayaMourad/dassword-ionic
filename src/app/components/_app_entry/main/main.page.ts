import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginRegisterComponent } from '../../_intro/login-register/login-register.component';

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

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.presentLogin()
  }

  presentLogin() {
    this.modalController.create({
      component: LoginRegisterComponent,
    }).then((m) => { m.present() })

  }
}


