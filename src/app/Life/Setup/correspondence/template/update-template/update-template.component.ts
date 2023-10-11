import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CorrespondenceService } from 'src/app/Life/Setup/correspondence/service/correspondence.service';

@Component({
  selector: 'app-upload-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.scss'],
})
export class UpdateCorrespondenceTemplateComponent implements OnInit {
  categories: any = [];
  template: any;

  FILE: any;
  templateCategory: string;
  description: string;
  ammendedBy: string;

  code: string;
  templateCode: string;
  categoryCode: string;
  isFile = false;

  fileName?: any;
  file?: any;

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false,
  };

  connectionRetrieve = {
    creating: false,
    error: false,
  };

  constructor(public router: Router, private correspondenceService: CorrespondenceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.params.code;
    this.getCategory();
    this.getTemplate();
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

  getCategoryCode(code: any) {
    this.categoryCode = code;
    console.log('categoryCode', this.categoryCode);
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

  getTemplate() {
    this.connectionRetrieve.creating = true;

    this.correspondenceService.getTemplates(this.code).subscribe(
      (data: any) => {
        this.template = data;
        console.log('one template', this.template);
        this.description = this.template.description;
        this.connectionRetrieve.creating = false;
      },
      (error) => {
        this.connectionRetrieve.creating = false;
        this.connectionRetrieve.error = true;
      }
    );
  }

  updateTemplate() {
    this.connection.creating = true;

    if (this.FILE === undefined) {
      this.isFile = true;
      return;
    }

    let templateString = {
      templateName: this.fileName,
      templateCategory: this.categoryCode,
      description: this.description,
      code: this.code,
      ammendedBy: null,
    };
    let template = JSON.stringify(templateString);

    console.log('templateString', templateString);
    console.log('template', template);

    this.correspondenceService.updateTemplate(template, this.FILE).subscribe(
      (data: any) => {
        this.connection.creating = false;
        this.router.navigate(['../../index-template'], { relativeTo: this.route });
      },
      (error) => {
        this.connection.error = true;
        this.connection.creating = false;
      }
    );
  }
}
