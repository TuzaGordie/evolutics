import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-template',
  templateUrl: './index-template.component.html',
  styleUrls: ['./index-template.component.scss']
})
export class IndexTranslationsTemplateComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
