import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-short-term-rates',
  templateUrl: './life-setup-short-term-rates.component.html',
  styleUrls: ['./life-setup-short-term-rates.component.scss']
})
export class SetupShortTermRatesComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
