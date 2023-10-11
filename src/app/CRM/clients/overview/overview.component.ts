import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../Shared/components/core/button/button.component';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone
  constructor() { }

  ngOnInit(): void {
  }

}
