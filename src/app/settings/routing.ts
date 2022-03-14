import { LoginRegisterComponent } from './../components/_intro/login-register/login-register.component';
import { Routes } from "@angular/router";
import { MainPage } from "../components/_app_entry/main/main.page";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginRegisterComponent,
  },
  {
    path: '',
    component: MainPage,
  },
];
