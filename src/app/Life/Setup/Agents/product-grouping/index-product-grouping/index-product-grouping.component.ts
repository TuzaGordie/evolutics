import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-product-grouping',
  templateUrl: './index-product-grouping.component.html',
  styleUrls: ['./index-product-grouping.component.scss']
})
export class IndexSetupsProductGroupingComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
