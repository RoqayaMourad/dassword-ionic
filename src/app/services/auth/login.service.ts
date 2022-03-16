import { IUser } from './../../interfaces/user.interface';
import { Injectable } from "@angular/core";
import { Api } from "../api/api";
import { DataService } from "../data/data.service";
import { Security } from 'src/app/models/security.class';
import { MainDB } from 'src/app/models/maindb.class';

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

  async login(email, password) {
    let sec = new Security();
    let secureAuthObject = sec.generateSecureAuthObject(email, password);
    // Send the encrypted secure object to the server
    await this.api.post<IUser>('login', { secureAuthObject }).subscribe(async (r) => {
      if (r.success && r.data.user_id) {
        // set global user
        await  this.d.setUser(r.data)
        this.d.setMasterPassword(password);
        await this.d.initDb();
        await this.d.syncDb();
        return;
      } else {
        this.d.alert("Wrong Email or Password")
        throw new Error("Failed to create user");
      }
    });
  }

  async register(email, password) {
    let sec = new Security();
    let secureAuthObject = sec.generateSecureAuthObject(email, password);
    this.api.post<IUser>('register', { secureAuthObject }).subscribe(async (r) => {
      if (r.success && r.data.user_id) {
        await this.d.resetStorage();
        this.d.setMasterPassword(password);
        await this.d.setUser(r.data);
        await this.d.initDb();
        await this.d.syncDb();
      } else {
        this.d.alert("User already exists")
        throw new Error("Failed to create user");
      }
    });
  }


}
