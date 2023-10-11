import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-prempaymthd',
  templateUrl: './start-prempaymthd.component.html',
  styleUrls: ['./start-prempaymthd.component.scss']
})
export class StartCodePremiumPaymentMethodComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
