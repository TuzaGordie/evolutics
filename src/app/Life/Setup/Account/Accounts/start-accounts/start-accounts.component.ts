import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-accounts',
  templateUrl: './start-accounts.component.html',
  styleUrls: ['./start-accounts.component.scss']
})
export class StartAccountAccounts implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
