import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-agent-type',
  templateUrl: './start-agent-type.component.html',
  styleUrls: ['./start-agent-type.component.scss']
})
export class StartSetupsAgentTypeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
