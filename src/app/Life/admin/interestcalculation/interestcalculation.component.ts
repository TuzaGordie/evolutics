import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interestcalculation',
  templateUrl: './interestcalculation.component.html',
  styleUrls: ['./interestcalculation.component.scss']
})
export class InterestcalculationComponent implements OnInit {

  operation:string = 'actions';

  constructor() { }

  ngOnInit(): void {
  }

}
