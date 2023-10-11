import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-process-actions',
  templateUrl: './start-process-actions.component.html',
  styleUrls: ['./start-process-actions.component.scss']
})
export class StartProcessActionsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
