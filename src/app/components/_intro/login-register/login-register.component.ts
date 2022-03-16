import { DataService } from 'src/app/services/data/data.service';
import { LoginService } from './../../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Security } from 'src/app/models/security.class';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  login_form: FormGroup
  register_form: FormGroup
  shown_form: "login" | "register" = "login";
  constructor(fb: FormBuilder, private loginSrv: LoginService, private data: DataService) {
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
    await this.loginSrv.login(this.login_form.value.email, this.login_form.value.password)
  }

  register() {
    if (this.register_form.invalid) {
      this.data.toastError("Invalid fields")
      return;
    }
    this.loginSrv.register(this.register_form.value.email, this.register_form.value.password)
  }

}
