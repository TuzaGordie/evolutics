import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-criteria-appraisal',
  templateUrl: './start-criteria-appraisal.component.html',
  styleUrls: ['./start-criteria-appraisal.component.scss']
})
export class StartCriteriaAppraisalComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
