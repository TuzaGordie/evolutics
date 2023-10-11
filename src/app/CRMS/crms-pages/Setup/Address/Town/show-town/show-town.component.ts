import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-town',
  templateUrl: './show-town.component.html',
  styleUrls: ['./show-town.component.scss']
})
export class ShowTownComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
