import { DataService } from './../../../../services/data/data.service';
import { IItem, ItemType } from '../../../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/models/item.class';
import { HelperService } from 'src/app/services/util/helper';
import { throttleTime } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {

  constructor(fb: FormBuilder, private modalController: ModalController, private data: DataService) {
    this.DetailsForm = fb.group({
      name: [''],
      email: [''],
      url: [''],
      password: [''],
      cardnumber: [''],
      cardexpiration: [''],
      cardcvv: [''],
      description: [''],
      note: [''],
      file: [''],
      type: ['']
    });
  }

  DetailsForm: FormGroup


  ngOnInit() {
    this.DetailsForm.get("url").valueChanges.pipe(
      throttleTime(3000, asyncScheduler, { leading: false, trailing: true })
    ).subscribe((url) => {
      if (url.indexOf(".") != -1) {
        this.updateIcon();
      }
    })
  }

  async onSubmit() {

    // update item records
    let item = new Item();
    item.setName(this.DetailsForm.get("name").value);
    item.setEmail(this.DetailsForm.get("email").value);
    item.setPassword(this.DetailsForm.get("password").value);
    item.setDescription(this.DetailsForm.get("description").value);
    item.setCardNumber(this.DetailsForm.get("cardnumber").value);
    item.setCardExpiration(this.DetailsForm.get("cardexpiration").value);
    item.setCardCvv(this.DetailsForm.get("cardcvv").value);
    item.setNote(this.DetailsForm.get("note").value);
    item.setUrl(this.DetailsForm.get("url").value);

    // set icon only if type is password
    if (item.type !== "Password") {
      // don't set item icon
      this.updateIcon(true);
      item.setIcon("");
    } else {
      // force update current icon
      this.updateIcon();
      item.setIcon(this.iconUrl);
    }

    item.setType(this.type);

    // update the local db version
    this.data.mainDb.updateVersion();

    // add item to the main db
    this.data.mainDb.addItem(item);

    // Save db to local storage
    await this.data.refreshDb();
    this.data.show_loading();
    this.data.uploadDbToIPFS().then(async (r) => {
      await this.data.dismiss_loading();
      this.data.toast("Item Added","",1000);
      await this.dismiss();
      console.log(this.data.mainDb);
    }).catch((e) => {
      this.data.dismiss_loading();
      this.data.alert(e)
      console.log(this.data.mainDb);

    })
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  //#region Handle Icon update
  iconUrl = "";
  updateIcon(dontSet = false) {
    if (dontSet) {
      this.iconUrl = "";
      return;
    }
    let url = this.DetailsForm.get("url").value;
    console.log(url);

    this.iconUrl = HelperService.getIcon(url);
  }
  //#endregion


  //#region  Type options menu handlers
  typeSelectOpen = false;
  type: ItemType = "Password";

  setType(t) {
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
  get showCard() {
    return this.type == 'Card'
  }
  get showNote() {
    return this.type == 'Note'
  }
  get showDocument() {
    return this.type == 'Document'
  }
}
