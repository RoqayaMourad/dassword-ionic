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

  register(secureObject) {
    this.api.post('create-db-user', secureObject).subscribe(r => {
      console.log(r);
      this.d.alert("Account created:"+JSON.stringify(r,null,1))
    })
  }

}
