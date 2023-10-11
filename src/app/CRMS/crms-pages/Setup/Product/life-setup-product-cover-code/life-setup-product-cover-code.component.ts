import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-product-cover-code',
  templateUrl: './life-setup-product-cover-code.component.html',
  styleUrls: ['./life-setup-product-cover-code.component.scss']
})
export class LifeSetupProductCoverCodeComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
