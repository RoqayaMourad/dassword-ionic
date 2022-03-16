import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/services/util/helper';

@Component({
  selector: 'app-genpassword-modal',
  templateUrl: './genpassword-modal.component.html',
  styleUrls: ['./genpassword-modal.component.scss'],
})
export class GenpasswordModalComponent implements OnInit {

  genpassForm:FormGroup;
  constructor(fb: FormBuilder) {
    this.genpassForm = fb.group({
      password: ['']
    });
  }
  message=""
  ngOnInit() {
    this.genpassword()
  }

  genpassword(){
    let random = HelperService.makePass();
    this.genpassForm.get("password").setValue(random)
  }

  copyToCLipboard(){
    HelperService.copyToClipboard(this.genpassForm.get("password").value);
    this.message = "copied";
    setTimeout(() => {
      this.message = "";
    }, 1500);
  }

}
