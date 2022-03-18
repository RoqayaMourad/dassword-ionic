import { Security } from './security.class';
import { HelperService } from 'src/app/services/util/helper';
import { Folder } from './folder.class';
import { Item } from 'src/app/models/item.class';
import { IFolder, IItem, IMainDB } from "../interfaces/interfaces";


export class MainDB implements IMainDB {

  constructor(mainDb?: MainDB | IMainDB) {
    if (mainDb && typeof mainDb === "object") {
      this.setuser_id(mainDb.user_id);
      this.setEmail(mainDb.email);
      this.setSecureObject(mainDb.secureObject);
      this.setObjectVersionId(mainDb.objectVersionId);
      this.setItems(mainDb.items);
      this.setFolders(mainDb.folders);
    }
  }

  user_id?: string = ""; // current user's id
  email?: string = ""; // current user's login email
  secureObject?: Security = null; // login object
  objectVersionId?: number = 0;
  items?: Item[] = [];
  folders?: Folder[] = [];

  setuser_id(user_id: string) {
    if (user_id != this.user_id) {
      this.user_id = user_id || "";

    }
  }

  setEmail(email: string) {
    if (email != this.email) {
      this.email = email || "";

    }
  }

  setSecureObject(secureObject: Security) {
    if (secureObject != this.secureObject) {
      this.secureObject = secureObject || null

    }
  }

  setObjectVersionId(objectVersionId: number) {
    if (objectVersionId != this.objectVersionId) {
      this.objectVersionId = objectVersionId || 0
    }
  }


  setItems(items: Item[] | IItem[] = []) {
    for (let i = 0; i < items.length; i++) {
      items[i] = new Item(items[i]);
    }
    this.items = items as Item[]
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

  updateItem(item: Item) {
    var current_item = this.items.find((i) => i.itemId == item.itemId);
    if (JSON.stringify(current_item) !== JSON.stringify(item)) {
      current_item.update(item)
    }
  }


  _setFolders(folders: Folder[] | IFolder[] = []) {
    this.folders = (folders || []) as any
  }


  setFolders(folders: Folder[] | IFolder[] = []) {

    for (let i = 0; i < folders.length; i++) {
      folders[i] = new Folder(folders[i]);

      this.folders = (folders || []) as any
    }
  }


  updateVersion() {
    this.setObjectVersionId(parseInt(this.objectVersionId as any) + 1)
    return this.objectVersionId;
  }



}
