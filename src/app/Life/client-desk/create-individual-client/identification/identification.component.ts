import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileUploadComponent } from 'src/app/Shared/components/file-upload/file-upload.component';
import { EValidationType } from 'src/app/Shared/models/index.model';
import { CreateIndividualClientService } from '../create-individual-client.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
})
export class IdentificationComponent implements OnInit {
  @Input() fc: FormGroup;
  identificationForm: FormGroup = new FormGroup({});
  passportFile: File;
  idcardFile: File;
  eValidationType = EValidationType;
  constructor(public ccS: CreateIndividualClientService) {}

  ngOnInit(): void {}
  get validation() {
    return this.fc?.controls;
  }

  onSubmit() {
    console.log(this.identificationForm);
    this.ccS.identificationInfo(this.identificationForm.value);
  }
  changeTab(tab: any) {
    console.log('tab');
    this.ccS.tabChange(tab);
  }

  upload(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    this.passportFile = file;
  }
  upload2(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    this.idcardFile = file;
  }
  getImage() {
    let as = document.getElementById('filebtn')?.click();
  }
  getImage2() {
    let as = document.getElementById('filebtn1')?.click();
  }
}
