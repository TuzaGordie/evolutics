import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-town',
  templateUrl: './start-town.component.html',
  styleUrls: ['./start-town.component.scss']
})
export class StartTownComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  townCode: string
}
