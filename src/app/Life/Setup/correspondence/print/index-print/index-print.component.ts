import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';

@Component({
  selector: 'app-index-print',
  templateUrl: './index-print.component.html',
  styleUrls: ['./index-print.component.scss'],
})
export class IndexCorrespondencePrint implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private correspondenceService: CorrespondenceService,
    private snack: MatSnackBar
  ) {}

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

  ngOnInit(): void {
    this.getDocumentCode();
  }

  getDocumentCode() {
    this.correspondenceService
      .getDocumentCodeBySendBy('P')
      .subscribe((data: []) => {
        this.documentCodes = data;
      });
  }

  onSelectCode(code: string) {
    this.documentCode = code;
  }

  onCreateNew() {
    this.router.navigate(['../print/create'], { relativeTo: this.route });
  }

  fetchCorrespondence(action: string): void {
    this.snack.open('Processing..........');

    this.correspondenceService
      .getCorrespondenceByDocumentCode(this.documentCode)
      .subscribe(
        (data ) => {
          this.snack.dismiss();
          localStorage.setItem(action, JSON.stringify(data));
          this.router.navigate(['../create-print'], { relativeTo: this.route });
        },
        (err: any) => {
          this.snack.dismiss();
          this.snack.open('Internal server error', 'Close', { duration: 5000 });
        }
      );
  }

  clone(): void {
    if (this.documentCode !== '') {
      this.router.navigate(['../print/clone'], {
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
      this.router.navigate(['../print/show'], {
        queryParams: {
          code: this.documentCode,
        },
        relativeTo: this.route,
      });
    }

    this.message.error = true;
  }
}
