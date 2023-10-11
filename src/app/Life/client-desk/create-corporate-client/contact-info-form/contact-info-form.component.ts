import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientService } from 'src/app/Services/client.service';
import { EValidationType } from 'src/app/Shared/models/index.model';
import { CreateCorporateClientService } from '../create-corporate-client.service';

@Component({
  selector: 'app-contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styleUrls: ['./contact-info-form.component.scss'],
})
export class ContactInfoFormComponent implements OnInit {
  @Input() form :FormArray 
  relationList: any = [];
  eValidationType = EValidationType;
  constructor(
    private formService: CreateCorporateClientService,
    public clientS: ClientService
  ) {}

  ngOnInit(): void { 
    this.onContactInfo();
    this.setRelationList(); 
  }
  patchClientInfo(control: AbstractControl) {
    return new Promise<any>((resolve) => {
      if (!control?.value) {
        resolve(null);
      } else {
        setTimeout(() => {
          this.clientS.getClientViewData(control?.value).subscribe(
            (r) => {
              if (r?.clientNo) {
                (<FormGroup>control.parent).patchValue({
                  dob: r.dateOfBirth,
                  email: r.email,
                  fullName: r.fullName,
                  phoneNumber: r.phoneNumber,
                });
                resolve(null);
              } else {
                resolve({ notFound: true });
              }
            },
            (e) => {
              resolve({ notFound: true });
            }
          );
        }, 1000);
      }
    });
  } 

  onContactInfo(index = this.form.controls.length) {
    this.form.insert(index, this.createContactData());
  }
  createContactData(): FormGroup {
    const form = new FormGroup({
      dob: new FormControl(),
      email: new FormControl(),
      fullName: new FormControl(),
      phoneNumber: new FormControl(),
      relationship: new FormControl(),
      relClientNo: new FormControl(null, null, this.patchClientInfo.bind(this)),
    });
    return form;
  }
  onDeleteContact(index: number) {
    this.form?.removeAt(index);
  }
  onSubmit() {
    console.log(this.form);
    this.formService.contactInfo(this.form.value);
    let ss2 = { contactInfo: this.form.value };
  }
  changeTab(tab: any) {
    console.log('tab');
    this.formService.tabChange(tab);
  }

  setRelationList() {
    this.formService.getRelationList().subscribe((res) => {
      this.relationList = res;
      console.log('relationList', res);
    });
  }
}
