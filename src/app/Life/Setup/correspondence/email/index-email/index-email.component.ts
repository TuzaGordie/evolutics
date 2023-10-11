import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';

@Component({
  selector: 'app-index-email',
  templateUrl: './index-email.component.html',
  styleUrls: ['./index-email.component.scss'],
})
export class IndexCorrespondenceEmail implements OnInit {
  CORRESPONDENCE_CODE: any;

  documentCodes: any[] = [];
  documentCode = '';

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  message = {
    success: false,
    warning: false,
    error: false,
  };

  connection = {
    creating: false,
    error: false,
  };

  constructor(
    public router: Router,public route:ActivatedRoute,
    private correspondenceService: CorrespondenceService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getDocumentCode();
  }

  getDocumentCode() {
    this.correspondenceService.getDocumentCodeBySendBy('E').subscribe((data: []) => {
      this.documentCodes = data;
    });
  }

  onSelectCode(code: string) {
    this.documentCode = code;
    localStorage.setItem('correspondence_document_code_email', code);
  }

  onCreateNew() { 
    this.router.navigate(['../email/create'],{relativeTo:this.route});
  }

  fetchCorrespondence(action: string): void {
    this.snack.open("Processing..........")
    
    this.correspondenceService
      .getCorrespondenceByDocumentCode(this.documentCode)
      .subscribe((data ) => {
        this.snack.dismiss()
        localStorage.setItem(action, JSON.stringify(data));
        this.router.navigate(['../create-email'],{relativeTo:this.route});
      }, (err: any) => {
        this.snack.dismiss()
        this.snack.open("Internal server error", "Close", { duration: 5000 })
      });
  }

  clone(): void {
    if (this.documentCode !== '') {
      this.router.navigate(['../email/clone'], {
        queryParams: {
          code: this.documentCode,
        },
        relativeTo: this.route,
      });
    }

    this.message.error = true;
  }

  show(): void {
    if (this.documentCode !== '') {
      this.router.navigate(['../email/show'], {
        queryParams: {
          code: this.documentCode,
        },
        relativeTo: this.route,
      });
    }

    this.message.error = true;
  }

  // getDocumentCode() {

  //   this.connection.creating = true;

  //   this.correspondenceService.getDocumentCode().subscribe((data: any) => {
  //     this.documentCodes = data;
  //     this.CORRESPONDENCE_CODE = this.documentCodes[0].title;
  //     this.connection.creating = false;
  //   })
  // }
}
