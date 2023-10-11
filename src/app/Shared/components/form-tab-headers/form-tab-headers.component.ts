import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ITab } from '../../models/index.model';

@Component({
  selector: 'app-form-tabs-header',
  templateUrl: './form-tab-headers.component.html',
  styleUrls: ['./form-tab-headers.component.scss'],
})
export class FormTabHeadersComponent implements OnInit {
  @Input() selectedIndex:number
  @Input() tabs: ITab[];
  @Output() selectedIndexChange = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {
    this.selectedIndex=0
  }
  changeTab(index: number) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }
}
