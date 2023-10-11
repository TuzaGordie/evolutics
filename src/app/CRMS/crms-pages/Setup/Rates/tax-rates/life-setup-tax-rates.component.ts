import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-tax-rates',
  templateUrl: './life-setup-tax-rates.component.html',
  styleUrls: ['./life-setup-tax-rates.component.scss']
})
export class SetupTaxRatesComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
