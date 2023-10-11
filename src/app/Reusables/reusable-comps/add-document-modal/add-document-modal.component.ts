import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FindWorkflowService } from 'src/app/Life/Workflow/service/find-workflow.service';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { DocumentListService } from '../../reusable-pages/document-list/document-list.service';

@Component({
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss'],
})
export class AddDocumentModalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  sesitivity = [];
  branches = [];
  subCategory = [];
  fileName: any;
  file: File;

  constructor(
    public docS: DocumentListService,
    public dialogRef: MatDialogRef<AddDocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { document: IDocMetadata; file: File }
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      boxNo: new FormControl(environment?.userProfile?.users.docBox),
      branch: new FormControl(null),
      category: new FormControl(null, Validators.required),
      refCat: new FormControl(null),
      refNo: new FormControl(null),
      sensitivity: new FormControl(null),
      subCategory: new FormControl(null),
      title: new FormControl(null, Validators.required),
    });
    this.form.patchValue(this.data?.document);
    this.file = this.data?.file;
    this.setDocumentSens();
    this.setDocumentBranch();

    // this.form.controls.sensitivity.disable()
    this.form.controls.subCategory.valueChanges.subscribe((val) => {
      this.docS
        .getDocumentSensitivity(environment?.user?.code, val)
        .subscribe((r) =>
          this.form.patchValue({ sensitivity: r?.sensitivity })
        );
    });
  }
  get category() {
    return this.form?.value?.category;
  }
  get sensitivity() {
    return this.form?.controls?.sensitivity.value;
  }
  setDocumentSubCategory(code) {
    this.docS.getSubCategoryList(code).subscribe((res) => {
      this.subCategory = res;
      console.log('sub category', res);
    });
  }
  removeFile() {
    this.file = null;
  }
  setDocumentSens() {
    this.docS.getSensitivityList().subscribe((res) => {
      this.sesitivity = res;
      console.log('sesitivity', res);
    });
  }

  setDocumentBranch() {
    this.docS.getBranchList().subscribe((res) => {
      this.branches = res;
      console.log('branches', res);
    });
  }

  upload(event: any) {
    let file: File = event.target.files[0];
    this.file = file;
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log(this.form);

    this.dialogRef.close({
      metadataForm: this.form,
      metadata: this.form?.value,
      file: this.file,
    });
  }
}
