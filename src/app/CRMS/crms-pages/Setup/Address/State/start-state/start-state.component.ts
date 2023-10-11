import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-state',
  templateUrl: './start-state.component.html',
  styleUrls: ['./start-state.component.scss']
})
export class StartStateComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
