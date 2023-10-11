import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorrespondenceService } from 'src/app/Life/Setup/correspondence/service/correspondence.service';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-index-template',
  templateUrl: './index-template.component.html',
  styleUrls: ['./index-template.component.scss'],
})
export class IndexCorrespondenceTemplate implements OnInit {
  FILE: any;
  templateCategory: string;
  description: string;
  createdBy: string;

  templateName: string;
  retrieveTemplateName: string;
  deleteTemplateName: string;
  templateCode: string;
  categoryCode: string;

  categories: any = [];
  templates: any = [];
  template: any;

  isFile = false;

  fileName?: any;
  file?: any;

  awsConstant: string = 'awsBaseEndpoint';
  awsFileString: string;

  message = {
    success: false,
    warning: false,
    error: false,
  };

  upload = false;

  connection = {
    creating: false,
    error: false,
    retrieving: false,
  };

  connectionRetrieve = {
    creating: false,
    error: false,
  };

  constructor(
    public router: Router,
    private correspondenceService: CorrespondenceService,
    private documentService: DocumentService,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getAllTemplates();
  }

  toggleUpload() {
    this.upload = !this.upload;
  }

  getCategory() {
    this.connection.creating = true;

    this.correspondenceService.getCategory().subscribe((data: any) => {
      this.categories = data;
      console.log('categories', data);
      this.connection.creating = false;
    });
  }
 
  getAllTemplates() {
    this.connection.retrieving = true;

    this.correspondenceService.getAllTemplates().subscribe((data: any) => {
      this.templates = data;
      this.templateCode = this.templates[0].code;
      this.retrieveTemplateName = this.templates[0].templateName;
      this.deleteTemplateName = this.templates[0].templateName;
      console.log(this.templateCode);
      this.connection.retrieving = false;
    });
  }

  getTemplateCode(code: string) {
    this.templateCode = code;
    console.log(this.templateCode);
  }

  getTemplateName(name: any) {
    this.templateName = name;
    console.log(this.templateName);
  }

  getTemplate() {
    this.connectionRetrieve.creating = true;

    this.correspondenceService.getTemplates(this.templateCode).subscribe(
      (data: any) => {
        this.template = data;
        console.log('one template', this.template);
        this.connectionRetrieve.creating = false;
      },
      (error) => {
        this.connectionRetrieve.creating = false;
        this.connectionRetrieve.error = true;
      }
    );
  }

  deleteTemplate() {
    this.connection.creating = true;

    this.correspondenceService
      .deleteTemplate(this.templateCode)
      .subscribe((data: any) => {
        this.connection.creating = false;
        this.ngOnInit();
        this.uS.info(`${this.templateCode} has been deleted successfully`);
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
    // debugger
    let template = JSON.stringify(templateString);

    this.correspondenceService.uploadTemplate(template, this.FILE).subscribe(
      (data: any) => {
        this.message.success = true;
        this.connection.creating = false;
        this.upload = false;
        this.uS.info(`Template ${data.code} has been uploaded successfully`);
        this.ngOnInit();
      },
      (error) => {
        this.connection.error = true;
        this.connection.creating = false;
        this.message.error = true;
      }
    );
  }

  viewFile(docKey: string, fileName: string) {
    this.connection.creating = true;
    this.documentService.viewFile(this.awsConstant).subscribe(
      (data: any) => {
        this.awsFileString = data;
        this.router.navigate([]).then((result) => {
          window.open(`${this.awsFileString}/${docKey}/${fileName}`, '_blank');
        });
      },
      (error) => {
        this.connection.creating = false;
        this.connection.error = true;
      }
    );
  }
}
