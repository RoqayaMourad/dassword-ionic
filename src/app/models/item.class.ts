import { HelperService } from 'src/app/services/util/helper';
import { IItem, ItemType } from '../interfaces/interfaces';

export class Item implements IItem {
  constructor(item:Item | IItem = null) {
    if (item && typeof item === "object") {
      this.setName(item.name);
      this.setEmail(item.email);
      this.setPassword(item.password);
      this.setDescription(item.description);
      this.setNote(item.note);
      this.setIcon(item.icon);
      this.setUrl(item.url);

      this.setCardNumber(item.cardnumber);
      this.setCardExpiration(item.cardexpiration);
      this.setCardCvv(item.cardcvv);

      this.setFileName(item.fileName);
      this.setFileCid(item.fileCid);

      this.setItemId(item.itemId);
      this.setType(item.type);
      this.setFolderId(item.folderId);

      this.setCreatedAt(item.createdAt);
      this.setModifiedAt(item.modifiedAt);
    }
  }
  // item data
  name?: string = "";
  email?: string = "";
  password?: string = "";
  description?: string = "";
  note?: string = "";
  icon?: string = "";
  url?: string = "";

  // Card
  cardnumber:string = "";
  cardexpiration:string = "";
  cardcvv:string = "";

  fileName?: string = "";
  fileCid?: string = "";

  // item metadata
  itemId?:string = HelperService.makeid();
  type?: ItemType = "Password";
  folderId?: string = "";
  /** timestamp in seconds */
  createdAt?: number = HelperService.timestamp();
  /** timestamp in seconds */
  modifiedAt?: number = HelperService.timestamp();


  setName(name: string = "") {
    // try to set name from url of found
    if (!name && this.url) {
      name = HelperService.getHostName(this.url)
    }
    this.name = name || ""
  }

  setEmail(email: string = "") {
    this.email = email || ""
  }

  setPassword(password = "") {
    // TODO: verify password
    this.password = password || ""
  }

  setDescription(description: string = "") {
    this.description = description || ""
  }

  setNote(note: string = "") {
    this.note = note || ""
  }

  setIcon(icon: string = "") {
    this.icon = icon || ""
  }

  setUrl(url: string = "") {
    if (url) {
      url = HelperService.withHttps(url);
    }
    this.url = url || ""
  }

  // Card
  setCardNumber(cardnumber: string = null) {
    this.cardnumber = cardnumber || "";
  }
  setCardExpiration(cardexpiration: string = null) {
    this.cardexpiration = cardexpiration || "";
  }
  setCardCvv(cardcvv: string = null) {
    this.cardcvv = cardcvv || "";
  }

  // file
  setFileName(fileName: string = null) {
    this.fileName = fileName || HelperService.makeid();
  }

  setFileCid(fileCid: string = "") {
    this.fileCid = fileCid || HelperService.makeid();
  }

  // item metadata
  setType(type: ItemType = "Password") {
    this.type = type || "Password"
  }

  setFolderId(folderId: string = "") {
    this.folderId = folderId || ""
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

  update(item:Item){
    this.setName(item.name);
    this.setEmail(item.email);
    this.setPassword(item.password);
    this.setDescription(item.description);
    this.setNote(item.note);
    this.setIcon(item.icon);
    this.setUrl(item.url);

    this.setFileName(item.fileName);
    this.setFileCid(item.fileCid);

    this.setItemId(item.itemId);
    this.setType(item.type);
    this.setFolderId(item.folderId);

    this.setCreatedAt(item.createdAt);
    this.setModifiedAt(item.modifiedAt);
  }

  hasWord(word:string, includeNote = true){
    if (!word) {
      return false;
    }
    word = word.toLowerCase();
    let result = false;
    let name = this.name?.toLowerCase().indexOf(word)
    if(name !==undefined && name !== -1) result = true;

    let description = !result?this.description?.toLowerCase().indexOf(word):""
    if(description !==undefined && description !== -1) result = true;

    let email = !result?this.email?.toLowerCase().indexOf(word):""
    if(email !==undefined && email !== -1) result = true;

    let fileName = !result?this.fileName?.toLowerCase().indexOf(word):""
    if(fileName !==undefined && fileName !== -1) result = true;

    let url = !result?this.url?.toLowerCase().indexOf(word):""
    if(url !==undefined && url !== -1) result = true;

    let cardnumber = !result?this.cardnumber?.toLowerCase().indexOf(word):""
    if(cardnumber !==undefined && cardnumber !== -1) result = true;

    let note = !result?this.note?.toLowerCase().indexOf(word):""
    if(note !==undefined && note !== -1) result = true;

    return result;
  }

  hasType(type:ItemType){
    if (!type) {
      return false;
    }
    let result=  this.type.toLowerCase() == type.toLowerCase();
    return result;
  }

  getIcon(url:string = ""){
    url = url || this.url
    let link = HelperService.getIcon(url);
    return link;
  }
}
