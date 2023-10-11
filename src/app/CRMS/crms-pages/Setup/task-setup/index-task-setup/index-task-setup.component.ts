import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-task-setup',
  templateUrl: './index-task-setup.component.html',
  styleUrls: ['./index-task-setup.component.scss']
})
export class CRMSIndexSetupsTaskSetupComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
