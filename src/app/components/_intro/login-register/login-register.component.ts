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
      this.data.toastError("Invalid login fields")
      return;
    }
    try {
      this.data.show_loading();
      await this.loginSrv.login(this.login_form.value.email, this.login_form.value.password);
      await this.data.toast("Logged in")
      await this.dissmiss();
      this.data.dismiss_loading();
    } catch (error) {
      await this.data.toastError(error)
      this.data.dismiss_loading();
    }
  }

  async register() {
    if (this.register_form.invalid) {
      this.data.toastError("Invalid fields")
      return;
    }
    try {
      this.data.show_loading();
      await this.loginSrv.register(this.register_form.value.email, this.register_form.value.password);
      await this.data.toast("Account created")
      await this.dissmiss();
      this.data.dismiss_loading();
    } catch (error) {
      await this.data.toastError(error);
      this.data.dismiss_loading();
    }
  }

  async dissmiss() {
    await this.modalController.dismiss()
  }

}
