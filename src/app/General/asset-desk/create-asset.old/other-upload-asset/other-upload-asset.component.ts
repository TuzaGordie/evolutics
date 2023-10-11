import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class'; 
import { AssetService } from '../../asset-desk-extras/asset.service';

@Component({
  selector: 'app-other-upload-asset',
  templateUrl: './other-upload-asset.component.html',
  styleUrls: ['./other-upload-asset.component.scss'],
})
export class OtherUploadAssetComponent implements OnInit {
  form = new FormGroup({
     branch: configForms.default(), 
    boxNo: configForms.default(),
    category: configForms.default(),
    sensitivity: configForms.default(),
    subCategory: configForms.default(),
    title: configForms.default(),
  });
  file: File;
  constructor(
    public uS: UtilityService,
    public dS: DocumentService,
    public service: AssetService,
    public dialogRef: MatDialogRef<OtherUploadAssetComponent>
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }

  upload(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    /* this.service.filenameOwnership = file */
    this.file = event.target.files[0];
    this.service.files.push(this.file)
  }
  submit() {
    try {
      this.dialogRef.close({ file: this.file, metadata: this.form.value });
      console.log("sda",{ file: this.file, metadata: this.form.value })
    } catch (e) {
      this.uS.notify(e, 0);
    }
  }
}
