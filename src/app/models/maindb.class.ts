import { Security } from './security.class';
import { HelperService } from 'src/app/services/util/helper';
import { Folder } from './folder.class';
import { Item } from 'src/app/models/item.class';
import { IFolder, IItem, IMainDB } from "../interfaces/interfaces";


export class MainDB implements IMainDB {

  constructor(mainDb?: MainDB | IMainDB) {
    if (mainDb && typeof mainDb === "object") {
      let force = !!mainDb.objectVersionId;
      this.setuser_id(mainDb.user_id);
      this.setEmail(mainDb.email);
      this.setSecureObject(mainDb.secureObject);
      this.setObjectVersionId(mainDb.objectVersionId);
      this.setItems(mainDb.items, force);
      this.setFolders(mainDb.folders, force);
      if (force) {
        this.setObjectVersionId(mainDb.objectVersionId)
      }
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
      this.updateVersion();
    }
  }

  setEmail(email: string) {
    if (email != this.email) {
      this.email = email || "";
      this.updateVersion();
    }
  }

  setSecureObject(secureObject: Security) {
    if (secureObject != this.secureObject) {
      this.secureObject = secureObject || null
      this.updateVersion();
    }
  }

  setObjectVersionId(objectVersionId: number) {
    if (objectVersionId != this.objectVersionId) {
      this.objectVersionId = objectVersionId || 0
    }
  }
  _setItems(items){
    this.items = (items || []) as any
    this.updateVersion();
  }

  /**
   * Compare an array of objects then replace current items if not the same
   * There is no clear way to do this in javascript I have to do this manually
   *
   * @param {(Item[] | IItem[])} [items=[]]
   * @return {*}
   * @memberof MainDB
   */
  setItems(items: Item[] | IItem[] = [], force = false) {
    if (force) {
      this._setItems(items);
      return;
    }
    for (let i = 0; i < items.length; i++) {
      items[i] = new Item(items[i]);
      if (!(items instanceof Item)) {
        this._setItems(items);
        return;
      }
    }
    // if new items length are different
    if (this.items.length != items.length) {
      this.items = (items || []) as any
      this.updateVersion();
      return;
    }

    // sort array
    this.items.sort((a,b)=>{
      if (a.itemId < b.itemId)//sort string ascending
      return -1;
      if (a.itemId > b.itemId)
        return 1;
      return 0; //default return value (no sorting)
    })

    // stringify both
    let newItemsString = JSON.stringify(items)
    let currentItemsString = JSON.stringify(this.items)

    // compare both
    if (newItemsString !== currentItemsString) {
      this._setItems(items);
      return;
    }
  }

  // Items functions
  addItem(item: Item) {
    this.items.push(item);
    this.updateVersion();
  }

  getItem(itemId: string) {
    return this.items.find((i) => i.itemId == itemId)
  }

  deleteItem(itemId: string) {
    this.items.splice(this.items.findIndex(function (i) {
      return i.itemId == itemId;
    }), 1);
    this.updateVersion();
  }

  updateItem(item: Item) {
    var current_item = this.items.find((i) => i.itemId == item.itemId);
    if (JSON.stringify(current_item) !== JSON.stringify(item)) {
      current_item.update(item)
      this.updateVersion();
    }
  }


  _setFolders(folders: Folder[] | IFolder[] = []){
    this.folders = (folders || []) as any
  }


  setFolders(folders: Folder[] | IFolder[] = [], force = false) {
    if (force) {
      this._setFolders(folders);
      return;
    }
    for (let i = 0; i < folders.length; i++) {
      folders[i] = new Item(folders[i]);
      if (!(folders instanceof Item)) {
        this._setFolders(folders);
        return;
      }
    }

    // if new folders lengths are different
    if (this.folders.length != folders.length) {
      this.folders = (folders || []) as any
      this.updateVersion();
      return;
    }

    // sort array
    this.folders.sort((a,b)=>{
      if (a.folderId < b.folderId)//sort string ascending
      return -1;
      if (a.folderId > b.folderId)
        return 1;
      return 0; //default return value (no sorting)
    })

    // stringify both
    let newFoldersString = JSON.stringify(folders)
    let currentFoldersString = JSON.stringify(this.folders)

    // compare both
    if (newFoldersString !== currentFoldersString) {
      this._setFolders(folders);
      return;
    }
  }

  updateVersion(){
    this.setObjectVersionId(parseInt(this.objectVersionId as any)+1)
    return this.objectVersionId;
  }



}
