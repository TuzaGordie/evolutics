import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-quotation',
  templateUrl: './start-quotation.component.html',
  styleUrls: ['./start-quotation.component.scss']
})
export class StartCorrespondenceQuotation implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
