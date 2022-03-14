import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {

  constructor(fb: FormBuilder, private modalController: ModalController) {
    this.DetailsForm = fb.group({
      name: [''],
      email: [''],
      url: [''],
      password: [''],
      description: [''],
      notes: [''],
      file: [''],
      type:['']
    });
  }

  DetailsForm: FormGroup

  ngOnInit() {
    setInterval(() => { console.log(this.DetailsForm) }, 5000)
  }

  async onSubmit(){

    await this.modalController.dismiss();
  }
}
