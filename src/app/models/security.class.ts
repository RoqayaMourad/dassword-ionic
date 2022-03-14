import { HelperService } from 'src/app/services/util/helper';
import { ISecurity } from "../interfaces/isecurity";
import { IUser } from "../interfaces/user.interface";

export class Security implements ISecurity {
  constructor() {

  }

  userId?: string = HelperService.makeid();
  email?: string = "";
  dbCid?: string = "";
  dbVersion?: string = "";
  securityToken?: ISecurity = {};
  meta?: object;
}
