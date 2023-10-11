import {Component, OnInit} from '@angular/core';
import {
  faEye,
  faPlus,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-setup-product-code',
  templateUrl: './life-setup-product-code.component.html',
  styleUrls: ['./life-setup-product-code.component.scss']
})
export class CRMSLifeSetupProductCodeComponent implements OnInit {
  faEye = faEye
  faPlus = faPlus
  faClone = faClone

  constructor() {
  }

  ngOnInit(): void {
  }

}
