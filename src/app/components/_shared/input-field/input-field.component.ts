import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }

}

export type InputFieldType  = "text" | "email" | "url" | "password" | "file" | "number" | "textarea";
