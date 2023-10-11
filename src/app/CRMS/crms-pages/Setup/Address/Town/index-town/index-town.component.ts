import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-town',
  templateUrl: './index-town.component.html',
  styleUrls: ['./index-town.component.scss']
})
export class IndexTownComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
