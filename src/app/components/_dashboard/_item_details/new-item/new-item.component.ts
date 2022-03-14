import { DataService } from './../../../../services/data/data.service';
import { IItem, ItemType } from './../../../../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/models/item.class';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {

  constructor(fb: FormBuilder, private modalController: ModalController, private data:DataService) {
    this.DetailsForm = fb.group({
      name: [''],
      email: [''],
      url: [''],
      password: [''],
      description: [''],
      notes: [''],
      file: [''],
      type: ['']
    });
  }

  DetailsForm: FormGroup


  ngOnInit() {
  }

  async onSubmit() {

    // Create item object
    let item = new Item();
    this.data.PassDb$
    // Add item object to the current DB

    // Update current DB

    await this.dismiss();
  }

  async dismiss(){
    await this.modalController.dismiss();
  }


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

  get showName(){
    return true
  }
  get showEmail(){
    return this.type == 'Password'
  }
  get showPassword(){
    return this.type == 'Password'
  }
  get showUrl(){
    return this.type == 'Password'
  }
  get showDescription(){
    return this.type == 'Password' || this.type == 'Bank Account' || this.type == 'Card' || this.type == 'Document'
  }
  get showNote(){
    return this.type == 'Note'
  }
  get showDocument(){
    return this.type == 'Document'
  }
}
