import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-create-document-sensitivity',
  templateUrl: './create-document-sensitivity.component.html',
  styleUrls: ['./create-document-sensitivity.component.scss'],
})
export class CreateDocumentSensitivityComponent implements OnInit {
  form: FormGroup;

  categories: any[] = [];
  subCategories: any[] = [];
  companies: any[] = [];
  sensitivities: any[] = [];

  isLoadingSubCategories: boolean = false;
  isLoadingCategories: boolean = false;
  isSaving: boolean = false;

  constructor(
    private documentService: DocumentService,
    private utilityService: UtilityService,
    private dialogRef: MatDialogRef<CreateDocumentSensitivityComponent>
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getCompanies();
    this.getSensitivities();
    this.initializeSearchForm();
  }

  initializeSearchForm() {
    this.form = new FormGroup({
      documentCategory: new FormControl(null, Validators.required),
      documentSubCategory: new FormControl(null),
      companyCode: new FormControl(null),
      sensitivity: new FormControl(null),
    });
  }

  getCategories() {
    this.isLoadingCategories = true;
    this.documentService
      .getCategory()
      .subscribe((data: any) => {
        this.categories = data;
      })
      .add(() => (this.isLoadingCategories = false));
  }

  onCategoryChange() {
    this.getSubCategories(this.form);
  }

  getSubCategories(document) {
    this.isLoadingSubCategories = true;
    this.documentService
      .getSubCategory(document.value.documentCategory)
      .subscribe((data: any) => {
        this.subCategories = data;
      })
      .add(() => (this.isLoadingSubCategories = false));
  }

  getCompanies() {
    this.documentService.getCompany().subscribe((data: any) => {
      this.companies = data;
    });
  }

  getSensitivities() {
    this.documentService.getSensitivity().subscribe((data: any) => {
      this.sensitivities = data;
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.documentService
      .createDocumentSensitivity(this.form.value)
      .subscribe(
        (res) =>
          this.utilityService
            .info(`Document Sensitivity ${res.id} created successfully`)
            .then(() => this.dialogRef.close({ success: true })),
        (err) => {
          this.utilityService.info('Error creating Document Sensitivity', 0);
          console.log('error creating new document sensitivity: ', err);
        }
      )
      .add(() => (this.isSaving = false));
  }
}
