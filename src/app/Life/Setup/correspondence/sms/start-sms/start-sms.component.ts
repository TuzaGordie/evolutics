import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-sms',
  templateUrl: './start-sms.component.html',
  styleUrls: ['./start-sms.component.scss']
})
export class StartCorrespondenceSMS implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
