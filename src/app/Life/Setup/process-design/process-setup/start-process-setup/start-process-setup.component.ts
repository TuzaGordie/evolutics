import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-process-setup',
  templateUrl: './start-process-setup.component.html',
  styleUrls: ['./start-process-setup.component.scss']
})
export class StartSetupsProcessSetupComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
