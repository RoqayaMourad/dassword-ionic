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
    this.d.show_loading();
    let sec = new Security();
    let secureAuthObject = sec.generateSecureAuthObject(email, password);
    // Send the encrypted secure object to the server
    return new Promise((resolve, reject) => {
      this.api.post<IUser>('login', { secureAuthObject }).subscribe(
        async (r) => {
          if (r.success && r.data.user_id) {
            // set global user
            await this.d.setUser(r.data)
            this.d.setMasterPassword(password);
            await this.d.initDb();
            // if the fetched user has a newer DB version update the local version from IPFS
            if (!r.data.db_version) {
              this.d.IPFSState = "Create Item to Sync"
            }
            if (this.d.mainDb.objectVersionId < r.data.db_version) {
              // reset the db storage only
              await this.d.resetStorage(false);
              // get from IPFS
              await this.d.getDbFromIPFS();
              await this.d.dismiss_loading();
            }
            await this.d.dismiss_loading();
            this.d.filter$.next("")
            resolve(true)
          } else {
            await this.d.dismiss_loading();
            this.d.alert("Wrong Email or Password")
            reject("Wrong Email or Password")
          }
        },
        (e) => {
          this.d.dismiss_loading();
          this.d.alert("Server Connection error");
          reject("Wrong Email or Password")
        }
      );
    })
  }

  register(email, password) {
    this.d.show_loading();
    let sec = new Security();
    let secureAuthObject = sec.generateSecureAuthObject(email, password);
    return new Promise((resolve, reject) => {
      this.api.post<IUser>('register', { secureAuthObject }).subscribe(
        async (r) => {
          if (r.success && r.data.user_id) {
            await this.d.resetStorage();
            this.d.setMasterPassword(password);
            await this.d.setUser(r.data);
            await this.d.initDb();
            await this.d.dismiss_loading();
            if (!r.data.db_version) {
              this.d.IPFSState = "Create Item to Sync"
            }
            this.d.toast("Welcom To Dassword 🔐, The Password Manager build on decentralized technology", "Registred", 5000);
            this.d.filter$.next("")
            resolve(true);
          } else {
            await this.d.dismiss_loading();
            this.d.alert("User already exists")
            reject(false)
          }
        },
        async (e) => {
          await this.d.dismiss_loading();
          this.d.alert("Failed to create User");
          reject(false)
        }
      );
    })
  }


}
