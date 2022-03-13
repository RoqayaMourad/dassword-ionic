import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder) {

  }

  DetailsForm:FormGroup

  ngOnInit() {
    this.DetailsForm = this.fb.group({
      name: [''],
      email: [''],
      url:[''],
      password:[''],
      description:[''],
      notes:[''],
      file:['']
    });

  }

}
