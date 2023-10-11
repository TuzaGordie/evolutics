import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-create-document-mapping',
  templateUrl: './create-document-mapping.component.html',
  styleUrls: ['./create-document-mapping.component.scss'],
})
export class CreateDocumentMappingComponent implements OnInit {
  form: FormGroup;

  categories: any[] = [];
  subCategories: any[] = [];
  companies: any[] = [];
  mappings: any[] = [];
  workflowCategories: any[] = [];
  workflows: any[] = [];

  isLoadingSubCategories: boolean = false;
  isLoadingCategories: boolean = false;
  isLoadingWorkflowCategories: boolean = false;
  isLoadingWorkflows: boolean = false;
  isLoadingCompanies: boolean = false;
  isSaving: boolean = false;

  constructor(
    private documentService: DocumentService,
    private utilityService: UtilityService,
    private dialogRef: MatDialogRef<CreateDocumentMappingComponent>
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getCompanies();
    this.getWorkflowCategories();
    this.initializeSearchForm();
  }

  initializeSearchForm() {
    this.form = new FormGroup({
      docCat: new FormControl(null, Validators.required),
      docSubCat: new FormControl(null),
      company: new FormControl(null),
      wfCat: new FormControl(null),
      taskCode: new FormControl(null),
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
    this.isLoadingCompanies = true;
    this.documentService.getCompany().subscribe((data: any) => {
      this.companies = data;
    }).add(() => this.isLoadingCompanies = false)
  }

  getWorkflowCategories() {
    this.isLoadingWorkflowCategories = true;
    this.documentService
      .getWorkflowCategory()
      .subscribe((data: any) => {
        this.workflowCategories = data;
      })
      .add(() => (this.isLoadingWorkflowCategories = false));
  }

  onWorkflowCategoryChange() {
    this.getWorkflows(this.form);
  }

  getWorkflows(document) {
    this.isLoadingWorkflows = true;
    this.documentService
      .getWorkflow(document.value.workflowCategory)
      .subscribe((data: any) => {
        this.workflows = data;
      })
      .add(() => (this.isLoadingWorkflows = false));
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.documentService
      .createDocumentMapping(this.form.value)
      .subscribe(
        (res) =>
          this.utilityService
            .info(`Document Mapping ${res.id} created successfully`)
            .then(() => this.dialogRef.close({ success: true })),
        (err) => {
          this.utilityService.info('Error creating Document Mapping', 0);
          console.log('error creating new document mapping: ', err);
        }
      )
      .add(() => (this.isSaving = false));
  }
}
