import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { LoginService } from './../../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  login_form: FormGroup
  register_form: FormGroup
  shown_form: "login" | "register" = "login";
  constructor(fb: FormBuilder, private loginSrv: LoginService, private data: DataService, private modalController: ModalController) {
    this.register_form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });
    this.login_form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.data.getUserFromStorage().then(u => {
      console.log("======= User is fetched ========");
      console.log(u);
      if (u?.email) {
        this.login_form.get("email").setValue(u.email);
      }
    })
  }

  async login() {
    if (this.login_form.invalid) {
      this.data.alert("Invalid login fields")
      return;
    }
    await this.loginSrv.login(this.login_form.value.email, this.login_form.value.password).then(
      () => {
        this.dissmiss();
      }).catch((error) => {
      })

  }

  async register() {
    if (this.register_form.invalid) {
      this.data.alert("Invalid fields")
      return;
    }
    if (this.register_form.value.password_confirm !== this.register_form.value.password) {
      this.data.alert("Confirm pasword field doesn't match password")
      return;
    }
    await this.loginSrv.register(this.register_form.value.email, this.register_form.value.password).then(
      () => {
        this.dissmiss();
      }).catch((error) => {
        this.data.toastError(error);
      })

  }

  async dissmiss() {
    await this.modalController.dismiss()
  }

}
