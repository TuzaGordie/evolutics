import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-discount-rates',
  templateUrl: './life-setup-discount-rates.component.html',
  styleUrls: ['./life-setup-discount-rates.component.scss']
})
export class SetupDiscountRatesComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
