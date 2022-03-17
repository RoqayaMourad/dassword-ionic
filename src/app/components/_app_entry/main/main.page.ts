import { DataService } from './../../../services/data/data.service';
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

  constructor(private modalController: ModalController, private data:DataService) { }

  ngOnInit() {
    this.presentLogin()
  }

  presentLogin() {
    this.modalController.create({
      component: LoginRegisterComponent,
      cssClass: "loginRegisterModal",
      backdropDismiss:false,
    }).then((m) => { m.present() })
  }
}


