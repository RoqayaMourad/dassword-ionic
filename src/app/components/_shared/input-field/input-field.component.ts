import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupDirective } from '@angular/forms';

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

}

export type InputFieldType = "text" | "email" | "url" | "password" | "file" | "number" | "textarea";
