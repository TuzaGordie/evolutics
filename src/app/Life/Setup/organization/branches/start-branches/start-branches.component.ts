import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-branches',
  templateUrl: './start-branches.component.html',
  styleUrls: ['./start-branches.component.scss']
})
export class StartBranchesOrgComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
