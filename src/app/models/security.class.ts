import { ISecurity } from "../interfaces/isecurity";
import { HelperService } from 'src/app/services/util/helper';
import * as CryptoJS from 'crypto-js';
import { Base64 } from "js-base64";

export class Security implements ISecurity {
  constructor(security?: ISecurity) {
    if (security && typeof security === "object") {
      this.email = security.email
      this.email = security.email
    }
  }


  email: string;
  secure_hash: string;

  authenticate(secureAuthObject) {
    // TODO: decrypt the AuthObject with the server's private key
    let decrypted_hash = this.encryptAsymmetric(this.createHash(secureAuthObject.secure_hash));

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
    let encrypted_hash = this.encryptAsymmetric(this.createHash(password));
    return {
      email,
      secure_hash: encrypted_hash,
      salt: HelperService.makeid()
    }
  }

  encryptAsymmetric(message: string, public_key?: string) {
    // TODO: Implement asymmetric Encryption
    // TODO: 1- Ask for the server's public key
    // TODO: 2- Encrypt secure object with the recieved public key

    return message;
  }

  static encryptString(string: string, encryptionKey: string = "") {
    var encryptedCiphertext = CryptoJS.AES.encrypt(string, encryptionKey.trim()).toString();
    return encryptedCiphertext;
  }

  static decryptString(string: string, encryptionKey: string) {
    var decryptedCipherText = CryptoJS.AES.decrypt(string, encryptionKey.trim()).toString(CryptoJS.enc.Utf8);;
    return decryptedCipherText;
  }


}
