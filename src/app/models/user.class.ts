import { HelperService } from 'src/app/services/util/helper';
import { ISecurity } from "../interfaces/isecurity";
import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
  constructor() {

  }

  user_id?: string = HelperService.makeid();
  email?: string = "";
  db_cid?: string = "";
  db_version?: string = "";
  secure_hash?: ISecurity = {};
  meta?: object;
}
