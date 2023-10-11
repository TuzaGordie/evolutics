import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-agent-loan-type',
  templateUrl: './start-agent-loan-type.component.html',
  styleUrls: ['./start-agent-loan-type.component.scss']
})
export class StartSetupsAgentLoanTypeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
