import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrespondenceService } from 'src/app/Life/Setup/correspondence/service/correspondence.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
})
export class CorrespondenceCreateTemplateComponent implements OnInit {
  categories: any = [];

  FILE: any;
  templateCategory: string;
  description: string;
  createdBy: string;

  isFile = false;

  fileName?: any;
  file?: any;

  connection = {
    creating: false,
    error: false,
  };

  constructor(public router: Router,public route:ActivatedRoute, private correspondenceService: CorrespondenceService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.connection.creating = true;

    this.correspondenceService.getCategory().subscribe((data: any) => {
      this.categories = data;
      console.log(data);
      this.templateCategory = this.categories[0].title;
      this.connection.creating = false;
    });
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

    if (this.FILE === undefined) {
      this.isFile = true;
      return;
    }

    let templateString = {
      templateName: this.fileName,
      templateCategory: this.templateCategory,
      description: this.description,
      createdBy: null,
    };
    debugger

    let template = JSON.stringify(templateString);

    console.log('templateString', templateString);
    console.log('template', template);

    this.correspondenceService.uploadTemplate(template, this.FILE).subscribe(
      (data: any) => {
        this.connection.creating = false; 
        this.router.navigate(['../index-template'], { relativeTo: this.route });
      },
      (error) => {
        this.connection.error = true;
        this.connection.creating = false;
      }
    );
  }
}
