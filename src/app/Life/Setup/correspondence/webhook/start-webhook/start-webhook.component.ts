import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-webhook',
  templateUrl: './start-webhook.component.html',
  styleUrls: ['./start-webhook.component.scss']
})
export class StartCorrespondenceWebhook implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
