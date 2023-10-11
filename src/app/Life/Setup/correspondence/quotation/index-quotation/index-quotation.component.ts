import { Component, OnInit } from '@angular/core';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index-quotation',
  templateUrl: './index-quotation.component.html',
  styleUrls: ['./index-quotation.component.scss'],
})
export class IndexCorrespondenceQuotation implements OnInit {
  constructor(
    public router: Router,public route:ActivatedRoute,
    private correspondenceService: CorrespondenceService,
    private snack: MatSnackBar
  ) { }

  documentCodes: any[] = [];
  documentCode = '';

  message = {
    success: false,
    warning: false,
    error: false,
  };

  connection = {
    creating: false,
    error: false,
  };

  ngOnInit(): void {
    this.getDocumentCode();
  }

  getDocumentCode() {
    this.correspondenceService.getDocumentCodeBySendBy("Q").subscribe((data: []) => {
      this.documentCodes = data;
    });
  }

  onSelectCode(code: string) {
    this.documentCode = code;
  }

  onCreateNew() { 
    this.router.navigate(['../quotation/create'], { relativeTo: this.route });
  }

  fetchCorrespondence(action: string): void {
    this.snack.open("Processing..........")

    this.correspondenceService
      .getCorrespondenceByDocumentCode(this.documentCode)
      .subscribe((data ) => {
        this.snack.dismiss()
        localStorage.setItem(action, JSON.stringify(data));
        this.router.navigate(['../create-quotation'],{relativeTo:this.route});
      }, (err: any) => {
        this.snack.dismiss()
        this.snack.open("Internal server error.", "Close", { duration: 5000 })
      });
  }

  clone(): void {
    if (this.documentCode !== '') {
      this.router.navigate(['../quotation/clone'], {
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
      this.router.navigate(['../quotation/clone'], {
        queryParams: {
          code: this.documentCode,
        },
        relativeTo: this.route,
      });
    }

    this.message.error = true;
  }
}
