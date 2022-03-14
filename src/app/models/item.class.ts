import { HelperService } from '../services/util/helper';
import { IItem, ItemType } from './interfaces';

export class Item implements IItem {
  constructor() {}
  // item data
  name?: string = "";
  email?: string = "";
  password?: string = "";
  description?: string = "";
  note?: string = "";
  icon?: string = "";
  url?: string = "";

  fileName?: string = "";
  fileCid?: string = "";

  // item metadata
  itemId?:string = "";
  fileId?: string = "";
  type?: ItemType = "Password";
  folderId?: string = "";
  /** timestamp in seconds */
  createdAt?: number = HelperService.timestamp();
  /** timestamp in seconds */
  modifiedAt?: number = HelperService.timestamp();


  public setName(name: string) {
    this.name = name
  }

  setEmail(email: string) {
    this.email = email
  }

  setPassword(password) {
    // TODO: verify password
    this.password = password
  }

  setDescription(description: string = "") {
    this.description = description
  }

  setNote(note: string = "") {
    this.note = note
  }

  setIcon(icon: string = "") {
    this.icon = icon
  }

  setUrl(url: string = "") {
    this.url = url
  }

  // file
  setFileName(fileName: string = null) {
    this.fileName = fileName || HelperService.makeid();
  }

  setFileCid(fileCid: string) {
    this.fileCid = fileCid || HelperService.makeid();
  }

  setType(type: ItemType) {
    this.type = type
  }

  setFolderId(folderId: string) {
    this.folderId = folderId
  }

  setItemId(itemId: string = null) {
    this.itemId = itemId || HelperService.makeid();
  }

  setCreatedAt(createdAt: number  = null) {
    this.createdAt = createdAt || HelperService.timestamp()
  }

  setModifiedAt(modifiedAt: number | Date = null) {
    if (modifiedAt) {
      this.modifiedAt = HelperService.timestamp()
    }
  }

  hasWord(word:string, includeNote = true){
    if (!word) {
      return false;
    }
    return this.name.indexOf(word) ||
    this.description.indexOf(word) ||
    this.email.indexOf(word) ||
    this.fileName.indexOf(word) ||
    this.url.indexOf(word) ||
    (includeNote && this.note.indexOf(word))
  }

}
