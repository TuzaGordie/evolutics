import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-task-setup',
  templateUrl: './start-task-setup.component.html',
  styleUrls: ['./start-task-setup.component.scss']
})
export class CRMSStartSetupsTaskSetupComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
