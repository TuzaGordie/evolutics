import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-tariffs',
  templateUrl: './start-tariffs.component.html',
  styleUrls: ['./start-tariffs.component.scss']
})
export class StartSetupsTariffsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
