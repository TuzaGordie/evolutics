import { Component, OnInit } from '@angular/core';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-index-sms',
  templateUrl: './index-sms.component.html',
  styleUrls: ['./index-sms.component.scss'],
})
export class IndexCorrespondenceSMS implements OnInit {
  CORRESPONDENCE_CODE: any;

  documentCodes: any[] = [];
  documentCode = '';

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false,
  };

  message = {
    success: false,
    warning: false,
    error: false,
  };

  constructor(
    public router: Router,public route:ActivatedRoute,
    private utility: UtilityService,
    private correspondenceService: CorrespondenceService
  ) { }

  ngOnInit(): void {
    this.getDocumentCode();
  }

  getDocumentCode() {
    this.correspondenceService.getDocumentCodeBySendBy("S").subscribe((data: []) => {
      this.documentCodes = data;
    });
  }

  onSelectCode(code: string) {
    this.documentCode = code;
  }

  onCreateNew() { 
    this.router.navigate(['../sms/create'], { relativeTo: this.route });
  }

  show(){
    if (this.documentCode !== '') {
      this.router.navigate(
        ["../sms/show"],
        {
          queryParams: { 
            code: this.documentCode
          },
          relativeTo: this.route
        }
      )
    } else {
      this.utility.notify("Select a Document Code to continue.", 2)
    }
  }

  clone(){
    if (this.documentCode !== '') {
      this.router.navigate(['../sms/clone'], {
        queryParams: { 
          code: this.documentCode,
        },
        relativeTo: this.route,
      });
    } else {
      this.utility.notify("Select a Document Code to continue.", 2)
    }
  }
}
