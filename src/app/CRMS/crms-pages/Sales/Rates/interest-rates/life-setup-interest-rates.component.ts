import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-interest-rates',
  templateUrl: './life-setup-interest-rates.component.html',
  styleUrls: ['./life-setup-interest-rates.component.scss']
})
export class SetupInterestRatesComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
