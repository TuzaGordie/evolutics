import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-region',
  templateUrl: './show-region.component.html',
  styleUrls: ['./show-region.component.scss']
})
export class ShowRegionComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
