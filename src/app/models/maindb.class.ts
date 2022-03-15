import { Security } from './security.class';
import { HelperService } from 'src/app/services/util/helper';
import { Folder } from './folder.class';
import { Item } from 'src/app/models/item.class';
import { IMainDB } from "../interfaces/interfaces";


export class MainDB implements IMainDB {

  constructor() { }

  user_id?: string = HelperService.makeid(); // current user's id
  email?: string = ""; // current user's login email
  secureObject?: Security = null; // login object
  objectVersionId?: string = "";
  items?: Item[] = [];
  folders?: Folder[] = [];

  setuser_id(user_id: string) {
    this.user_id = user_id;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setSecureObject(secureObject) {
    this.secureObject = secureObject
  }

  setItems(items: Item[]) {
    this.items = items
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



}
