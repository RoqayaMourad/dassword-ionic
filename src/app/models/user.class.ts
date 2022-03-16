import { HelperService } from 'src/app/services/util/helper';
import { ISecurity } from "../interfaces/isecurity";
import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
  constructor(_user?: User | IUser) {
    if (_user && typeof _user === "object") {
      this.setUserId(_user.user_id);
      this.setEmail(_user.email);
      this.setDbCid(_user.db_cid);
      this.setDbVersion(_user.db_version);
      this.setSecureHash(_user.secure_hash);
      this.setMeta(_user.meta);
    }
  }

  user_id?: string = "";
  email?: string = "";
  db_cid?: string = "";
  db_version?: number = 0;
  secure_hash?: ISecurity = {};
  meta?: object;

  setUserId(user_id) {
    this.user_id = user_id
  }
  setEmail(email) {
    this.email = email
  }
  setDbCid(db_cid) {
    this.db_cid = db_cid
  }
  setDbVersion(db_version) {
    this.db_version = db_version
  }
  setSecureHash(secure_hash) {
    this.secure_hash = secure_hash
  }
  setMeta(meta) {
    this.meta = meta
  }
}
