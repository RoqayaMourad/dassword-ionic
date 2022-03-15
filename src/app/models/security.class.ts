import { ISecurity } from "../interfaces/isecurity";
import { HelperService } from 'src/app/services/util/helper';
import * as CryptoJS from 'crypto-js';

export class Security implements ISecurity {
  constructor(security?: ISecurity) {
      if (security) {
          this.email = security.email
          this.email = security.email
      }
  }


  email: string;
  secure_hash: string;

  authenticate(secureAuthObject) {
      // TODO: decrypt the AuthObject with the server's private key

      // Compare the passwordHash to the saved passwordHash
      let minimumUser = {
          email: secureAuthObject.email,
          secure_hash: secureAuthObject.secure_hash
      }
      return minimumUser;
  }

  createHash(message) {
      var hash = CryptoJS.SHA3(message, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
      return hash;
  }

  generateSecureAuthObject(email, password) {
      return {
          email,
          secure_hash: this.createHash(email),
          salt: HelperService.makeid()
      }
  }
}
