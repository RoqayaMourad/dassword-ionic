import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { asyncScheduler } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { ItemType } from 'src/app/interfaces/interfaces';
import { Item } from 'src/app/models/item.class';
import { DataService } from 'src/app/services/data/data.service';
import { HelperService } from 'src/app/services/util/helper';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {

  constructor(fb: FormBuilder, private modalController: ModalController, private data: DataService) {
    this.DetailsForm = fb.group({
      name: [''],
      email: [''],
      url: [''],
      password: [''],
      description: [''],
      note: [''],
      file: [''],
      type: ['']
    });
  }

  DetailsForm: FormGroup;
  currentItem:Item = new Item;
  formMode: "edit" | "display" = "display"
  ngOnInit() {
    this.data.showItem$.subscribe((itemId)=>{
      if (itemId) {
        this.currentItem = this.data.mainDb.getItem(itemId);
        this.updateFields();
      }
    })
    this.DetailsForm.disable();
    this.DetailsForm.get("url").valueChanges.pipe(
      throttleTime(3000, asyncScheduler, { leading: false, trailing: true })
    ).subscribe((url) => {
      if (url.indexOf(".") != -1) {
        this.updateIcon();
      }
    })
  }

  editMode(){
    this.DetailsForm.enable();
    this.formMode = "edit";
  }



  updateFields(){
    this.DetailsForm.get("name").setValue(this.currentItem.name);
    this.DetailsForm.get("email").setValue(this.currentItem.email);
    this.DetailsForm.get("url").setValue(this.currentItem.url);
    this.DetailsForm.get("password").setValue(this.currentItem.password);
    this.DetailsForm.get("description").setValue(this.currentItem.description);
    this.DetailsForm.get("type").setValue(this.currentItem.type);
  }

  async submitEditItem() {

    console.log("Edit submitted");
    // update item records
    let item = new Item();
    item.update(this.DetailsForm.value);

    // force update current icon
    this.updateIcon();

    // set item icon
    item.setIcon(this.iconUrl);

    // set name from url if not already set
    item.setName(this.DetailsForm.value.name);

    item.setItemId(this.currentItem.itemId);

    // add item to the main db
    this.data.mainDb.updateItem(item);

    this.data.toast("Item Updated")
    // emit change to all listener to the db object
    this.data.refreshDb();
    console.log(this.data.mainDb);
  }


  //#region Handle Icon update
  iconUrl = "";
  updateIcon() {
    let url = this.DetailsForm.get("url").value;
    console.log(url);

    this.iconUrl = HelperService.getIcon(url);
  }
  //#endregion


  //#region  Type options menu handlers
  typeSelectOpen = false;
  type: ItemType = "Password";

  setType(t) {
    console.log("setType(t) t=", t);
    this.type = t;
    this.closeSelect()
  }

  toggleSelect() {
    this.typeSelectOpen = !this.typeSelectOpen
  }

  closeSelect() {
    this.typeSelectOpen = false;
  }
  //#endregion

  get showName() {
    return true
  }
  get showEmail() {
    return this.type == 'Password'
  }
  get showPassword() {
    return this.type == 'Password'
  }
  get showUrl() {
    return this.type == 'Password'
  }
  get showDescription() {
    return this.type == 'Password' || this.type == 'Bank Account' || this.type == 'Card' || this.type == 'Document'
  }
  get showNote() {
    return this.type == 'Note'
  }
  get showDocument() {
    return this.type == 'Document'
  }

}
