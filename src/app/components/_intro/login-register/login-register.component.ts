import { LoginService } from './../../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptographyService } from 'src/app/services/cryptography/cryptography.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  login_form:FormGroup

  constructor(fb: FormBuilder, private login:LoginService, private crypto:CryptographyService) {
    this.login_form = fb.group({
      email: ['',Validators.required],
      password:['',Validators.required],
    });
  }

  ngOnInit() {}

  register(){
    if (this.login_form.invalid) {
      return;
    }
    let secure_auth_object = this.crypto.generateSecureAuthObject(this.login_form.value.email,this.login_form.value.password);
    this.login.register(this.login_form.get("email").value, secure_auth_object)
  }

}
