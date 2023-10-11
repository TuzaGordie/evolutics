import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/Services/app.service';
import { IconType, BtnType, BtnGroup } from '../../models/index.model';
import { BtnService } from './btn.service';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent implements OnInit {
  @Input() form: FormGroup | FormControl | FormArray;
  @Input() customIcon: string;
  icon: any;
  iconPosition: string = 'left';
  @Input('icon') set _icon(v: IconType) {
    const res = this.btnS.getIcon(v);
    this.iconPosition = res.iconPosition;
    this.icon = res.icon;
    this.customIcon = res.iconString;
  }
  @Input('type') set _type(v: BtnType) {
    switch (v) {
      case 'primary':
        this._mclass = 'btn btn-primary btn-lg w-100';
        break;
      case 'secondary':
        this._mclass = 'btn btn-outline-primary btn-clone btn-lg w-100';
        break;
      case 'outline':
        this._mclass = 'btn btn-outline-primary btn-lg w-100';
        break;
      case 'dark-outline':
        this._mclass = 'btn btn-outline-dark btn-lg w-100';
        break;
      case 'outline-nm':
        this._mclass = 'btn btn-outline-primary w-100';
        break;
      case 'dark':
        this._mclass = 'btn btn-dark btn-lg w-100';
        break;
      case 'danger':
        this._mclass = 'btn btn-danger btn-lg w-100';
        break;
      case 'danger-outline':
        this._mclass = 'btn btn-outline-danger btn-lg w-100';
        break;
      case 'close':
        this._mclass = 'btn btn-lg  text-danger';
        this._icon = 'close';
        break;
      default:
        this._type = 'primary';
        break;
    }
  }
  @Input('group') set _group(v: BtnGroup) {
    switch (v) {
      case 'add':
        this._type = 'outline';
        this._icon = 'add';
        this.iconBtn = true;
        break;
      case 'clone':
        this._type = 'secondary';
        this._icon = 'clone';
        this.text = 'Clone';
        break;
      case 'close':
        this._type = 'danger-outline';
        this.customIcon = this.btnS.getIcon('close').iconString;
        this.iconBtn = true;
        break;
      case 'delete':
        this._type = 'danger-outline';
        this._icon = 'delete';
        this.iconBtn = true;
        break;
      case 'download':
        this._type = 'secondary';
        this._icon = 'download';
        this.iconBtn = true;
        break;
      case 'search':
        this._type = 'secondary';
        this._icon = 'search';
        break;
      case 'show':
        this._type = 'secondary';
        this._icon = 'show';
        this.text = 'Show';
        break;
      case 'submit':
        this._type = 'primary';
        this._icon = 'checked';
        break;
    }
  }
  @Input() disabled = false;
  @Input() valid = true;
  @Input() iconBtn = false;
  @Input() showHelpIcon = true;
  @Input() animate = false;
  @Input() help: string;
  @Input() mclass: string;
  @Input() text: string;
  @Input() actionType: 'submit' | 'button' | 'reset' = 'button';
  _mclass: string;
  @Output() mclick = new EventEmitter();
  constructor(public appS: AppService, public btnS: BtnService) {}

  ngOnInit(): void {
    if (!this._mclass) this._type = 'secondary';
  }
  checkForm() {
    if (this.form) this.form.markAllAsTouched();
  }
  click($event) {
    if (!(this.disabled || !this.valid)) this.mclick.emit($event);
  }
}
