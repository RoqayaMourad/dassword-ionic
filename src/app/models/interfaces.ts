
/**
 * the interface for the structure for the decrypted json object
 */
export interface PasswordDBObject{
  user_id?:string; // current user's id
  email?:string; // current user's login email
  secure_object?:any; // login object

  object_version_id?:string;

  items?:Item[];
  folders?:Folders[];

}

export interface Item{
  // item data
  name?:string;
  email?:string;
  password?:string;
  description?:string;
  note?:string;
  icon?:string;

  file_name?:string;
  file_cid?:string;

  // item metadata
  item_id?:string;
  type?:ItemType;
  folder_id?:string;
  /** timestamp in seconds */
  created_at?:number;
  /** timestamp in seconds */
  modified_at?:number;

}

export interface Folders{
  folder_id?:string;
  /** ids of all the items listed in this folder */
  item_ids?:string[];
  icon?:string;
}



export type ItemType = "password" | "card" | "bank_account" | "document" | "note"
