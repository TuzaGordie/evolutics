import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-parameters',
  templateUrl: './start-parameters.component.html',
  styleUrls: ['./start-parameters.component.scss']
})
export class StartCodeParametersComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
