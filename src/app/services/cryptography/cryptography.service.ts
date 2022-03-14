import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {
  constructor() {
  }


  generateSecureAuthObject(email,password){
    return {email,securityToken:password}
  }
}
