import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-label',
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.scss'],
})
export class InputLabelComponent implements OnInit {
  @Input() colored;
  @Input() form: FormGroup;
  @Input() hint;
  @Input() id;
  @Input() invalidCheckbox;
  @Input() isRequired;
  @Input() label;
  @Input() lblCl;
  @Input() light;
  @Input() mini;
  @Input() showLabel;
  @Input() small;
  @Input() stacked;
  @Input() theme;
  @Input() xsmall;
  constructor() {}

  ngOnInit(): void {}
  log() {
    if (!environment.production) console.log(this.form);
  }
}
