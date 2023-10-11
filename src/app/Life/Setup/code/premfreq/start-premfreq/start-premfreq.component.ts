import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-premfreq',
  templateUrl: './start-premfreq.component.html',
  styleUrls: ['./start-premfreq.component.scss']
})
export class StartCodePremiumFrequencyComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
