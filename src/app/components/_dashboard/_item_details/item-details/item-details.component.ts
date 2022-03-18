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
      cardnumber: [''],
      cardexpiration: [''],
      cardcvv: [''],
      file: [''],
      type: [''],
    });
  }

  DetailsForm: FormGroup;
  currentItem: Item = null;
  formMode: "edit" | "display" = "display"
  ngOnInit() {
    this.data.showItem$.subscribe((itemId) => {
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

  // enable edit mode on the form
  editMode() {
    this.DetailsForm.enable();
    this.formMode = "edit";
  }

  // reset forms and disable edit mode
  updateFields() {
    this.formMode = "display";
    this.DetailsForm.disable();
    this.DetailsForm.get("name").setValue(this.currentItem.name);
    this.DetailsForm.get("email").setValue(this.currentItem.email);
    this.DetailsForm.get("url").setValue(this.currentItem.url);
    this.DetailsForm.get("password").setValue(this.currentItem.password);
    this.DetailsForm.get("description").setValue(this.currentItem.description);
    this.DetailsForm.get("cardnumber").setValue(this.currentItem.cardnumber);
    this.DetailsForm.get("cardexpiration").setValue(this.currentItem.cardexpiration);
    this.DetailsForm.get("cardcvv").setValue(this.currentItem.cardcvv);
    this.DetailsForm.get("note").setValue(this.currentItem.note);
    this.DetailsForm.get("type").setValue(this.currentItem.type);
  }

  // submit the edited item
  async submitEditItem() {

    await this.data.show_loading();
    console.log("Edit submitted");
    // update item records
    const item = this.data.mainDb.getItem(this.currentItem.itemId);
    item.setName(this.DetailsForm.get("name").value);
    item.setEmail(this.DetailsForm.get("email").value);
    item.setPassword(this.DetailsForm.get("password").value);
    item.setDescription(this.DetailsForm.get("description").value);
    item.setCardNumber(this.DetailsForm.get("cardnumber").value);
    item.setCardExpiration(this.DetailsForm.get("cardexpiration").value);
    item.setCardCvv(this.DetailsForm.get("cardcvv").value);
    item.setNote(this.DetailsForm.get("note").value);
    item.setUrl(this.DetailsForm.get("url").value);
    item.setType(this.DetailsForm.get("type").value);

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

    // update the local db version
    this.data.mainDb.updateVersion();

    // add item to the main db
    this.data.mainDb.updateItem(item);

    // Save db to local storage
    await this.data.refreshDb();

    // save db to IPFS
    this.data.uploadDbToIPFS().then(async (r) => {
      await this.data.dismiss_loading();
      this.data.toast("Item Updated");
      console.log(this.data.mainDb);
      this.formMode = "display";
    }).catch((e) => {
      this.data.dismiss_loading();
      this.data.alert(e)
      this.formMode = "display";
    })
  }

  async deleteItem() {
    await this.data.show_loading();
    this.data.mainDb.deleteItem(this.currentItem.itemId);
    // update the local db version
    this.data.mainDb.updateVersion();

    // Save db to local storage
    await this.data.refreshDb();

    // save db to IPFS
    this.data.uploadDbToIPFS().then(async (r) => {
      await this.data.dismiss_loading();
      this.data.toast("Item Deleted");
      console.log(this.data.mainDb);
      this.data.showItem$.next(null);
      this.currentItem = null;
    }).catch((e) => {
      this.data.dismiss_loading();
      this.data.alert(e)
    })

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

  get showName() {
    return true
  }
  get showEmail() {
    return this.currentItem?.type == 'Password'
  }
  get showPassword() {
    return this.currentItem?.type == 'Password'
  }
  get showUrl() {
    return this.currentItem?.type == 'Password'
  }
  get showDescription() {
    return this.currentItem?.type == 'Password' || this.currentItem?.type == 'Bank Account' || this.currentItem?.type == 'Card' || this.currentItem?.type == 'Document'
  }
  get showCard() {
    return this.currentItem?.type == 'Card'
  }
  get showNote() {
    return this.currentItem?.type == 'Note'
  }
  get showDocument() {
    return this.currentItem?.type == 'Document'
  }

  ngOnDestroy(): void {
    console.log("item details Destroyed");
  }
  comingSoon(){
    this.data.alert('Coming Soon!')
  }
}
