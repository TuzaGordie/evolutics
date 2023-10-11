import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InputType } from '../../models/index.model';

@Component({
  selector: 'app-editable-text-case',
  templateUrl: './editable-text-case.component.html',
  styleUrls: ['./editable-text-case.component.scss'],
})
export class EditableTextCaseComponent implements OnInit {
  @Input() action: any;
  @Input() coloredLbl: boolean;
  @Input() coloredVal: boolean;
  @Input() form: any;
  @Input() formatter: any;
  @Input() hint: string;
  @Input() label: string;
  @Input() light: boolean;
  @Input() mini: boolean;
  @Input() name: string;
  @Input() route: string;
  @Input() showEditing: boolean;
  @Input() stacked: boolean;
  @Input() type: InputType;
  @Input() value: any;
  editing: boolean;
  constructor(public domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}
  reset() {
    this.editing = false;
  }
  unreset() {
    if (this.action) {
      this.action();
    } else {
      this.editing = true;
    }
  }
  get linker() {
    return encodeURI(this.route)
  }
}
