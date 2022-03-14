import { ISecurity } from "./isecurity";

export interface IUser {
    userId?: string;
    email?: string;
    dbCid?: string;
    dbVersion?: string;
    securityToken?: ISecurity;
    meta?: object;
}
