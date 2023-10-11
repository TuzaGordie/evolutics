import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  AllowedLanguages: number = 1;
  form=new FormGroup({
    test:configForms.default()
  })

  constructor() { }

  ngOnInit(): void {
  }

  languageIncrement() {
    this.AllowedLanguages++
  }
  removeLanguage() {
    this.AllowedLanguages--
  }

  languageCounter() {
    return new Array(this.AllowedLanguages);
  }

}
