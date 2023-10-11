import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-state',
  templateUrl: './show-state.component.html',
  styleUrls: ['./show-state.component.scss']
})
export class ShowStateComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
