import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-system-message',
  templateUrl: './index-system-message.component.html',
  styleUrls: ['./index-system-message.component.scss']
})
export class IndexTranslationsSystemMessageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
