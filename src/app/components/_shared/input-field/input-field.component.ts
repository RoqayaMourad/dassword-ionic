import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupDirective } from '@angular/forms';
import { HelperService } from 'src/app/services/util/helper';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {

  @Input() label: string = "";
  @Input() subtext: string = "";
  @Input() type: InputFieldType = "text";
  @Input() placeholder: string = "";
  @Input() rows: number = 4;
  @Input() showReveal = false;
  @Input() showCopy = false;
  @Input() showGen = false;

  valueFormGroup?: FormGroup;
  valueFormControl?: FormControl;
  constructor(
    private formGroupDirective: FormGroupDirective,
    private formControlNameDirective: FormControlName
  ) { }

  ngOnInit() {
    this.valueFormGroup = this.formGroupDirective.form;
    this.valueFormControl = this.formGroupDirective.getControl(this.formControlNameDirective);
  }

  get controlName() {
    return this.formControlNameDirective.name;
  }

  get enabled() {
    return this.valueFormControl?.enabled
  }
  message = "";
  copyToCLipboard(){
    console.log("copyToCLipboard");
    console.log(this.valueFormControl);

    HelperService.copyToClipboard(this.valueFormControl.value);
    this.message = "copied";
    setTimeout(() => {
      this.message = "";
    }, 1500);
  }


  flip = false
  revealPass(){
    if (this.flip) {
      this.flip = !this.flip
      this.type = "password";
      return;
    }
    if (!this.flip) {
      this.type = "text"
      this.flip = !this.flip
      return;
    }
  }

  genpassword(){
    let random = HelperService.makePass();
    this.valueFormControl.setValue(random)
  }

}

export type InputFieldType = "text" | "email" | "url" | "password" | "file" | "number" | "textarea";
