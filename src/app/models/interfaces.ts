
/**
 * the interface for the structure for the decrypted json object
 */
export interface PasswordDBObject{
  user_id?:string; // current user's id
  email?:string; // current user's login email
  secure_object?:any; // login object

  object_version_id?:string;

  items?:IItem[];
  folders?:Folders[];

}

export interface IItem{
  // item data
  name?:string;
  email?:string;
  password?:string;
  description?:string;
  url?:string;
  note?:string;
  icon?:string;

  fileName?:string;
  fileCid?:string;

  // item metadata
  itemId?:string;
  type?:ItemType;
  folderId?:string;
  /** timestamp in seconds */
  createdAt?:number;
  /** timestamp in seconds */
  modifiedAt?:number;

}

export interface Folders{
  folderId?:string;
  /** ids of all the items listed in this folder */
  item_ids?:string[];
  icon?:string;
}



export type ItemType = "Password" | "Card" | "Bank Account" | "Document" | "Note"
