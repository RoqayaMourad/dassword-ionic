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
  ngOnInit() {
    this.data.showItem$.subscribe((itemId)=>{
      if (itemId) {
        this.currentItem = this.data.mainDb.getItem(itemId);
        this.updateFields();
      }
    })
    this.disableFields();
    this.DetailsForm.get("url").valueChanges.pipe(
      throttleTime(3000, asyncScheduler, { leading: false, trailing: true })
    ).subscribe((url) => {
      if (url.indexOf(".") != -1) {
        this.updateIcon();
      }
    })
  }

  disableFields(){
    this.DetailsForm.get("name").disable()
    this.DetailsForm.get("email").disable()
    this.DetailsForm.get("url").disable()
    this.DetailsForm.get("password").disable()
    this.DetailsForm.get("description").disable()
    this.DetailsForm.get("type").disable()
    this.DetailsForm.get("note").disable()
    this.DetailsForm.get("file").disable()
  }

  enableFields(){
    this.DetailsForm.get("name").enable()
    this.DetailsForm.get("email").enable()
    this.DetailsForm.get("url").enable()
    this.DetailsForm.get("password").enable()
    this.DetailsForm.get("description").enable()
    this.DetailsForm.get("type").enable()
    this.DetailsForm.get("note").enable()
    this.DetailsForm.get("file").enable()

  }

  updateFields(){
    this.DetailsForm.get("name").setValue(this.currentItem.name);
    this.DetailsForm.get("email").setValue(this.currentItem.email);
    this.DetailsForm.get("url").setValue(this.currentItem.url);
    this.DetailsForm.get("password").setValue(this.currentItem.password);
    this.DetailsForm.get("description").setValue(this.currentItem.description);
    this.DetailsForm.get("type").setValue(this.currentItem.type);
  }

  async editItem() {
    // update item records
    let item = new Item();
    item.update(this.DetailsForm.value);

    // force update current icon
    this.updateIcon();

    // set item icon
    item.setIcon(this.iconUrl);

    // set name from url if not already set
    item.setName(this.DetailsForm.value.name);

    // add item to the main db
    this.data.mainDb.updateItem(item);

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
