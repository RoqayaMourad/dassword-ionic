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

  login(email, password) {
    let sec = new Security();
    let secureAuthObject = sec.generateSecureAuthObject(email, password);
    // TODO: ask for the server's public key

    // TODO: Encrypt secure object with the recieved public key

    // Send the encrypted secure object to the server
    this.api.post<IUser>('login', { encrypted_data: secureAuthObject }).subscribe(async (r) => {
      if (r.success && r.data.user_id) {
        let db: MainDB = new MainDB()
        db.setuser_id(r.data.user_id);
        await this.d.setDb(db);

        this.d.alert("Logged in successfully, setting user ....")
        console.log(r);

        // set global user
        await  this.d.setUser(r.data)
        this.d.alert("User set and Upaded in the storage, fetching DB")
        console.log(this.d.user);

        // TODO: if authentication is successful get the db from local storage or from IPFS

      } else {
        this.d.alert("Wrong Email or Password")
      }
    });
  }

  register(email, password) {
    let sec = new Security();
    let secureAuthObject = sec.generateSecureAuthObject(email, password);

    // TODO: ask for the server's public key

    // TODO: Encrypt secure object with the recieved public key

    this.api.post<IUser>('register', { encrypted_data: secureAuthObject }).subscribe(async (r) => {
      if (r.success && r.data.user_id) {
        let db: MainDB = new MainDB()
        db.setuser_id(r.data.user_id);
        await this.d.setDb(db)
        this.d.alert("Account created, setting user")
        console.log(r);
        await this.d.setUser(r.data)
        this.d.alert("User set and Upaded in the storage, fetching DB")
        console.log(this.d.user);

      } else {
        this.d.alert("Wrong Email or Password")
      }
    });
  }


}
