import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { EValidationType } from 'src/app/Shared/models/index.model';
import { CreateCorporateClientComponent } from '../../create-corporate-client/common/common.component';
import { ICorporateClient } from '../../create-corporate-client/corporate-client-extras/corporate-client.interface';
import { CreateIndividualClientComponent } from '../allforms/allforms.component';
import { CreateIndividualClientService } from '../create-individual-client.service';
import { IClientIndividual } from '../individual-client-extras/individual-client.interface';

@Component({
  selector: 'app-nextofkin',
  templateUrl: './nextofkin.component.html',
  styleUrls: ['./nextofkin.component.scss'],
})
export class NextofkinComponent implements OnInit {
  @Input() form = new FormArray([]);
  @Output() findClient = new EventEmitter();
  @Output() createClient = new EventEmitter();
  relationList: any[] = [];
  eValidationType = EValidationType;
  constructor(
    private allFormService: CreateIndividualClientService,
    public clientS: ClientService,public uS: UtilityService,
  ) {}

  ngOnInit(): void { 
    this.addContactInfoForm();
    this.getRelationList();
  }
  showClient(clientNo) {}
  validation(i: number) {
    return (this.form.controls[i] as FormGroup).controls;
  }
  patchClientInfo(control: AbstractControl) {
    return new Promise<any>((resolve) => {
      if (!control?.value) {
        resolve(null);
      } else
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
    });
  } 
  addContactInfoForm(index = this.form.controls.length) {
    this.form.insert(index, this.newContactInfoForm());
  }
  newContactInfoForm() {
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
  onDeleteContact(index: any) {
    this.form?.removeAt(index);
  }

  changeTab(tab: any) {
    console.log('tab');
    this.allFormService.tabChange(tab);
  }

  getRelationList() {
    this.allFormService.getRelationList().subscribe((res) => {
      this.relationList = res;
    });
  }
}
