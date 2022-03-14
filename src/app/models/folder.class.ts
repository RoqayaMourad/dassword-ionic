import { HelperService } from "../services/util/helper";
import { IFolder } from "./interfaces";


export class Folder implements IFolder {
  constructor() {}

  folderId?:string;
  folderName?:string;
  icon?:string;
  /** ids of all the items listed in this folder */
  itemIds?:string[];

  setFolderId(folderId: string = null) {
    this.folderId = folderId || HelperService.makeid();
  }

  setFolderName(folderName: string = "") {
    this.folderName = folderName || "";
  }

  setIcon(icon: string = "") {
    this.icon = icon || "";
  }

  // TODO:items handling

  addItem(itemId:string){

  }
}
