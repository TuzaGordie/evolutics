import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-product-grouping',
  templateUrl: './start-product-grouping.component.html',
  styleUrls: ['./start-product-grouping.component.scss']
})
export class StartSetupsProductGroupingComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
