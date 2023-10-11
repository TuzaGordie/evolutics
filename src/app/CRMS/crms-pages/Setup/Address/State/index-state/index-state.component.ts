import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-state',
  templateUrl: './index-state.component.html',
  styleUrls: ['./index-state.component.scss']
})
export class IndexStateComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
