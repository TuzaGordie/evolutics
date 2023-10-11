import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CorrespondenceService } from 'src/app/Life/Setup/correspondence/service/correspondence.service';

@Component({
  selector: 'app-crmcorrespondence-template-create',
  templateUrl: './crmcorrespondence-template-create.component.html',
  styleUrls: ['./crmcorrespondence-template-create.component.scss']
})
export class CRMCorrespondenceTemplateCreateComponent implements OnInit {

  categories: any = []

  FILE: any;
  templateCategory: string;
  description: string;
  createdBy: string;

  categoryCode: string;
  isFile = false;

  fileName?: any;
  file?: any;

  connection = {
    creating: false,
    error: false
  };

  constructor( public router: Router, private correspondenceService: CorrespondenceService ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.connection.creating = true;

    this.correspondenceService.getCategory().subscribe((data: any) => {
      this.categories = data;
      console.log(data)
      this.templateCategory = this.categories[0].title;
      this.connection.creating = false;
    })
  }

  getCategoryCode(code: any) {
    this.categoryCode = code;
    console.log('categoryCode', this.categoryCode)
  }

  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  onChange(file: any) {
    this.FILE = file.files[0];
    this.fileName = file.files[0].name;
    this.isFile = false;
  }



  uploadTemplate() {

    this.connection.creating = true;

    if(this.FILE === undefined) {
      this.isFile = true;
      return;
    }

    let templateString = {
      templateName: this.fileName,
      templateCategory: this.categoryCode,
      description: this.description,
      createdBy: null,
    }
    let template = JSON.stringify(templateString);

    console.log('templateString', templateString)
    console.log('template', template)

    this.correspondenceService.uploadTemplate(template, this.FILE).subscribe((data: any) => {
        this.connection.creating = false;
        this.router.navigateByUrl('/life/correspondence/index-template')
      },
      error => {
        this.connection.error = true;
        this.connection.creating = false;
      })
  }

}
