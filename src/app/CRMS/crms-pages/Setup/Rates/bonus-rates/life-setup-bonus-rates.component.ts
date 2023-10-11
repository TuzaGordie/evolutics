import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-bonus-rates',
  templateUrl: './life-setup-bonus-rates.component.html',
  styleUrls: ['./life-setup-bonus-rates.component.scss']
})
export class SetupBonusRatesComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
