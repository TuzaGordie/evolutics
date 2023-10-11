import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-region',
  templateUrl: './start-region.component.html',
  styleUrls: ['./start-region.component.scss']
})
export class StartRegionComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
