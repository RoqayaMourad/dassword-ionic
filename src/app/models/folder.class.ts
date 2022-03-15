import { HelperService } from "../services/util/helper";
import { IFolder } from "../interfaces/interfaces";


export class Folder implements IFolder {
  constructor(folder?:Folder | IFolder) {
    if (folder && typeof folder === "object") {
      this.setFolderId(folder.folderId);
      this.setFolderName(folder.folderName);
      this.setIcon(folder.icon);
      this.setItemIds(folder.itemIds);
    }
  }

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

  setItemIds(itemIds:string[]){
    this.itemIds = itemIds || []
  }
  addItem(itemId:string){

  }
}
