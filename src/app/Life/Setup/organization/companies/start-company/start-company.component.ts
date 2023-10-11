import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-company',
  templateUrl: './start-company.component.html',
  styleUrls: ['./start-company.component.scss']
})
export class StartCompanyOrgComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
