import { IUser } from './../../interfaces/user.interface';
import { Injectable } from "@angular/core";
import { Api } from "../api/api";
import { DataService } from "../data/data.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private api: Api, private d: DataService) {
  }

  /**
   * Register account
   * when user registers an account he sends his email and an encrypted password to the server to register a new account
   */

  register(email, secureObject) {
    if (!email) {
      throw new Error("Email not set");
    }
    if (!secureObject) {
      throw new Error("Secure Object");
    }

    this.api.post<IUser>('create-db-user', secureObject).subscribe(r => {
      if (r.success) {
        this.d.initDb(r.data.userId)
        this.d.alert("Account created ")
      }
    });
  }


}
