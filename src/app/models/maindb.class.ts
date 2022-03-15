import { Security } from './security.class';
import { HelperService } from 'src/app/services/util/helper';
import { Folder } from './folder.class';
import { Item } from 'src/app/models/item.class';
import { IMainDB } from "../interfaces/interfaces";


export class MainDB implements IMainDB {

  constructor(mainDb?:MainDB) {
    if (mainDb) {
      this.setuser_id(mainDb.user_id);
      this.setEmail(mainDb.email);
      this.setSecureObject(mainDb.secureObject);
      this.setObjectVersionId(mainDb.objectVersionId);
      this.setItems(mainDb.items);
      this.setFolders(mainDb.folders);
    }
  }

  user_id?: string = HelperService.makeid(); // current user's id
  email?: string = ""; // current user's login email
  secureObject?: Security = null; // login object
  objectVersionId?: string = "";
  items?: Item[] = [];
  folders?: Folder[] = [];

  setuser_id(user_id: string) {
    this.user_id = user_id || "";
  }

  setEmail(email: string) {
    this.email = email || "";
  }

  setSecureObject(secureObject:Security) {
    this.secureObject = secureObject || null
  }

  setObjectVersionId(objectVersionId:string) {
    this.objectVersionId = objectVersionId || ""
  }

  setItems(items: Item[]) {
    this.items = items || []
  }

  // Items functions
  addItem(item: Item) {
    this.items.push(item);
  }

  getItem(itemId: string) {
    return this.items.find((i) => i.itemId == itemId)
  }

  deleteItem(itemId: string) {
    this.items.splice(this.items.findIndex(function (i) {
      return i.itemId == itemId;
    }), 1);
  }

  updateItem(item: Item){
    var item = this.items.find((i) => i.itemId == item.itemId);
    item.update(item)
  }


  setFolders(folders: Folder[]) {
    this.folders = folders || []
  }



}
