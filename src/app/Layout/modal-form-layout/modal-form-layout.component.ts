import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-modal-form-layout',
  templateUrl: './modal-form-layout.component.html',
  styleUrls: ['./modal-form-layout.component.scss'],
})
export class ModalFormLayoutComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() title: string;
  constructor() {}

  ngOnInit(): void {}
  onClose() {
    this.close.emit();
  }
}
