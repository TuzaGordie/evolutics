import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-print',
  templateUrl: './start-print.component.html',
  styleUrls: ['./start-print.component.scss']
})
export class StartCorrespondencePrint implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
