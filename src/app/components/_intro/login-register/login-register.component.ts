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
  constructor(fb: FormBuilder, private loginSrv: LoginService, private data: DataService, private modalController:ModalController) {
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
      await this.loginSrv.login(this.login_form.value.email, this.login_form.value.password);
      this.dissmiss();
      this.data.toast("Logged in")
    } catch (error) {
      this.data.toastError(error)
    }
  }

  async register() {
    if (this.register_form.invalid) {
      this.data.toastError("Invalid fields")
      return;
    }
    try {
      await this.loginSrv.register(this.login_form.value.email, this.login_form.value.password);
      this.dissmiss()
      this.data.toast("Account created")
    } catch (error) {
      this.data.toastError(error)
    }
  }

  dissmiss(){
    this.modalController.dismiss()
  }

}
