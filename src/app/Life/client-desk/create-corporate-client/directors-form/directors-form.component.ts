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
import { CreateCorporateClientService } from '../create-corporate-client.service';

@Component({
  selector: 'app-directors-form',
  templateUrl: './directors-form.component.html',
  styleUrls: ['./directors-form.component.scss'],
})
export class DirectorsFormComponent implements OnInit {
  @Input() form: FormArray; 
  relationList: any = [];
  constructor(
    private formService: CreateCorporateClientService,
    public fb: FormBuilder,
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
  onContactInfo(index:number=this.form.controls.length) {
    this.form.insert(index,this.createContactData()); 
  }
  createContactData(): FormGroup {
    const form= new FormGroup({
      dob: new FormControl(),
      email: new FormControl(),
      fullName: new FormControl(),
      phoneNumber: new FormControl(),
      relationship: new FormControl('DI'),
      relClientNo: new FormControl(null, null, this.patchClientInfo.bind(this)),
    });
    form.get('relationship').disable()
    return form
  }
  onDeleteContact(index: any) {
    this.form?.removeAt(index);
  } 
  onSubmit() {
    console.log(this.form);
    this.formService.directorInfo(this.form.value);
    let ss3 = { directors: this.form.value };
  }
  /*  copy() {
    this.items.push(this.items)
 } */
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
