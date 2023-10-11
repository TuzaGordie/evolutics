import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-region',
  templateUrl: './index-region.component.html',
  styleUrls: ['./index-region.component.scss']
})
export class IndexRegionComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
