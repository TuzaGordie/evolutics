import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-general-rates',
  templateUrl: './life-setup-general-rates.component.html',
  styleUrls: ['./life-setup-general-rates.component.scss']
})
export class SetupGeneralRatesComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
