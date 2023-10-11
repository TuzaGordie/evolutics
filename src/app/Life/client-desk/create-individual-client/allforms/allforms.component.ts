import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CreateIndividualClientService } from '../create-individual-client.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { IdentificationComponent } from '../identification/identification.component';
import { IDocMetadata, ITab } from 'src/app/Shared/models/index.model';
import { ClientService } from 'src/app/Services/client.service';
import { DocumentService } from 'src/app/Services/document.service';
import { IClientIndividual } from '../individual-client-extras/individual-client.interface';
import { NextofkinComponent } from '../nextofkin/nextofkin.component';
import { EClientType } from '../../client-extras/client.interface';
import { CreateAccountFormComponent } from 'src/app/Life/life-components/create-account-modal/create-account-form/create-account-form.component';
@Component({
  selector: 'app-allforms',
  templateUrl: './allforms.component.html',
  styleUrls: ['./allforms.component.scss'],
})
export class CreateIndividualClientComponent implements OnInit {
  individualForm: FormGroup = new FormGroup({});
  coversBonus: any = FormGroup;
  loading: boolean;
  clientType = EClientType.individual;
  redirectRoute: string;
  tabs: ITab[] = [
    { label: 'Personal Information' },
    { label: 'Identification' },
    { label: 'Employment Information' },
    { label: 'Payment Information' },
    { label: 'Relationship' },
  ];
  selectedIndex = 0;
  constructor(
    public createIndividualClientS: CreateIndividualClientService,
    public fb: FormBuilder,
    public uS: UtilityService,
    public route: ActivatedRoute,
    public appS: AppService,
    public clientS: ClientService,
    public docS: DocumentService
  ) {}
  ngOnInit(): void {
    this.redirectRoute = this.route.snapshot.queryParamMap.get('r');
    this.individualForm = new FormGroup({
      personalInformation: new FormGroup({
        address: new FormControl(null),
        addressCountry: new FormControl(),
        addressGeolocation: new FormControl(null),
        addressRegion: new FormControl(null),
        addressState: new FormControl(null),
        addressTown: new FormControl(null),
        alternativeEmail: new FormControl(
          null,
          [Validators.email, this.clientS.checkAlternateEmail.bind(this)],
          this.clientS.validateEmail.bind(this)
        ),
        altPhoneNumbers: new FormArray(
          [],
          this.validatePhoneNumbers.bind(this)
        ),
        // alternativePhoneNumber: new FormControl(null, [
        //   this.clientS.checkAlternatePhone.bind(this),
        // ]),
        busLine: new FormControl(
          this.appS.getCurrentSystemMetadata.busline,
          Validators.required
        ),
        type: new FormControl(this.clientType, Validators.required),
        dateOfBirth: new FormControl(null),
        email: new FormControl(
          null,
          Validators.email,
          this.clientS.validateEmail.bind(this)
        ),
        firstName: new FormControl(null, Validators.required),
        gender: new FormControl(null),
        maritalStatus: new FormControl(null),
        middleName: new FormControl(null),
        nationality: new FormControl(null),
        phoneNumber: new FormControl(
          null,
          null,
          this.clientS.checkUniquePhoneNumber.bind(this)
        ),
        surname: new FormControl(null, Validators.required),
      }),
      identification: new FormGroup({
        idType: new FormControl(null),
        idExpiryDate: new FormControl(null),
        nationalInsuranceNumber: new FormControl(
          null,
          null,
          this.clientS.checkUniqueNIN.bind(this)
        ),
        idNumber: new FormControl(
          null,
          null,
          this.checkIDUniqueness.bind(this)
        ),
        taxIdentificationNumber: new FormControl(
          null,
          null,
          this.clientS.checkUniqueTIN.bind(this)
        ),
        bvn: new FormControl(
          null,
          null,
          this.clientS.checkUniqueBVN.bind(this)
        ),
        pensionCommissionNumber: new FormControl(
          null,
          null,
          this.clientS.checkUniquePenCom.bind(this)
        ),
      }),
      employmentInformation: new FormGroup({
        employStatus: new FormControl(null),
        employerSector: new FormControl(null),
        incomeBand: new FormControl(null),
        occupation: new FormControl(null),
        employerClientNo: new FormControl(null),
        companyName: new FormControl(null),
        occupationGroup: new FormControl(null),
      }),
      nextOfKin: new FormArray([]),
    });
    this.individualForm
      .get(['identification', 'idType'])
      .valueChanges.subscribe((r) => {
        this.individualForm
          .get(['identification', 'idNumber'])
          .updateValueAndValidity();
      });
    /* if (!environment.production) {      this.individualForm.patchValue(testData);      this.individualForm.markAllAsTouched()    }*/
  }
  ngAfterViewInit(): void {
    // debugger
    if (this.route.snapshot.queryParamMap.get('rPickFromTemp') == 'true') {
      const temp = this.createIndividualClientS.getTempSave;
      const clientNo = this.route.snapshot.queryParamMap.get('clientNo');
      this.individualForm.patchValue(temp?.individualForm);
      this.individualForm
        .get(['employmentInformation', 'employerClientNo'])
        .patchValue(clientNo);
      this.identificationRef.passportFile = temp?.passport;
      this.identificationRef.idcardFile = temp?.idcard;
      this.paymentinfoRef.accProofFile = temp?.accProof;
    }
  }
  get personalF() {
    return this.individualForm.get('personalInformation') as FormGroup;
  }
  get identification() {
    return this.individualForm.get('identification') as FormGroup;
  }
  get employ() {
    return this.individualForm.get('employmentInformation') as FormGroup;
  }
  get paymentForm() {
    return this.paymentinfoRef?.form;
  }
  get nextofkinFA() {
    return this.individualForm.get('nextOfKin') as FormArray;
  }
  validatePhoneNumbers(fa: FormArray) {}
  checkIDUniqueness = (control: AbstractControl) => {
    return new Promise((resolve) => {
      const idNumber = control?.value?.trim();
      if (!idNumber) resolve(null);
      const idType = control.parent.get('idType')?.value?.trim();
      return this.clientS
        .checkIfClientExistsBy({ idNumber, idType })
        .toPromise()
        .then((r) => {
          resolve(r ? { notUnique: true } : null);
        })
        .catch((e) => {
          resolve({ notUnique: true });
        });
    });
  };
  createCorporateClient() {
    this.createIndividualClientS.tempSave(
      this.individualForm.value,
      this.identificationRef.passportFile,
      this.identificationRef.idcardFile,
      this.paymentinfoRef.accProofFile
    );
    this.uS.router.navigate(['../corporate'], {
      relativeTo: this.route,
      queryParams: { r: location.pathname, rPickFromTemp: true },
    });
  }
  createIndividualClient() {
    this.createIndividualClientS.tempSave(
      this.individualForm.value,
      this.identificationRef.passportFile,
      this.identificationRef.idcardFile,
      this.paymentinfoRef.accProofFile
    );
    window.close();
    // this.uS.router.navigate(['../corporate'], {
    //   relativeTo: this.route,
    //   queryParams: { r: location.pathname, rPickFromTemp: true },
    // });
  }
  changeDate(date) {
    let dateValue = new Date(date);
    var mm = dateValue.getMonth() + 1;
    var dd = dateValue.getDate();
    return [
      dateValue.getFullYear() + '-',
      (mm > 9 ? '' : '0') + mm + '-',
      (dd > 9 ? '' : '0') + dd + 'T',
      (dateValue.getHours() > 9 ? '' : '0') + dateValue.getHours() + ':',
      (dateValue.getMinutes() > 9 ? '' : '0') + dateValue.getMinutes() + ':',
      (dateValue.getSeconds() > 9 ? '' : '0') +
        dateValue.getSeconds() +
        '.' +
        '412' +
        'Z',
    ].join('');
  }
  formatPayload(data: IClientIndividual) {
    data.nextOfKin = data.nextOfKin.filter((x) => x.relClientNo);
    const nums: string[] = this.personalF.controls.altPhoneNumbers.value;
    for (let index = 0; index < nums.length; index++) {
      const item = nums[index];
      data.personalInformation[
        'alternativePhoneNumber' + (index ? index + 2 : '')
      ] = item;
    }
    delete data['altPhoneNumbers'];
    // debugger;
  }
  @ViewChild('identificationTab') identificationRef: IdentificationComponent;
  @ViewChild('paymentinfo') paymentinfoRef: CreateAccountFormComponent;
  @ViewChild('nextofkinGroupTab') nextofkinGroupTabRef: NextofkinComponent;
  @Input() isModal: boolean;
  @Input() modalOnComplete;

  async onSubmit() {
    this.loading = true;
    try {
      this.createIndividualClientS.clearTemp();
      this.personalF.value.dateOfBirth = this.changeDate(
        this.personalF.value.dateOfBirth
      );
      this.identification.value.idExpiryDate = this.changeDate(
        this.identification.value.idExpiryDate
      );
      const data: IClientIndividual = {
        personalInformation: this.personalF.value,
        identification: this.identification.value,
        employmentInformation: this.employ.value,
        paymentInformation: this.paymentinfoRef.form.value,
        nextOfKin: this.nextofkinGroupTabRef.form.value,
      };
      this.formatPayload(data);
      const doc: IDocMetadata[] = [];
      let myJSON = JSON.stringify(data);
      const uFrm = new FormData();
      if (this.identificationRef.passportFile) {
        uFrm.append(
          'files',
          this.identificationRef.passportFile,
          this.identificationRef.passportFile.name
        );
        doc.push({
          boxNo: environment?.userProfile?.users.docBox,
          category: 'CLI',
          sensitivity: '2',
          subCategory: 'PP',
          title: 'Passport',
        });
      }
      if (this.identificationRef.idcardFile) {
        uFrm.append(
          'files',
          this.identificationRef.idcardFile,
          this.identificationRef.idcardFile.name
        );
        doc.push({
          boxNo: environment?.userProfile?.users.docBox,
          category: 'CLI',
          sensitivity: '12',
          subCategory: 'ID',
          title: 'Identitycard',
        });
      }
      if (this.paymentinfoRef.accProofFile) {
        uFrm.append(
          'files',
          this.paymentinfoRef.accProofFile,
          this.paymentinfoRef.accProofFile.name
        );
        doc.push({
          boxNo: '19',
          category: 'CLI',
          sensitivity: '12',
          subCategory: 'RIB',
          title: 'ProofofAccount',
        });
      }
      uFrm.append('individualClient', myJSON);
      if (doc?.length) uFrm.append('document', JSON.stringify(doc));
      this.createIndividualClientS.submitPostData(uFrm).subscribe(
        async (res) => {
          console.log(res);
          this.loading = false;
          await this.uS.info(
            `Individual Client ${res?.personalInformation?.clientNo} was created successfully`,
            1
          );
          if (environment.production || true) {
            if (this.redirectRoute) {
              this.uS.router.navigate([this.redirectRoute], {
                queryParams: { clientNo: res?.personalInformation?.clientNo },
              });
            } else if (this.isModal) {
              this.modalOnComplete(res);
            } else {
              this.uS.router.navigate(['../../view-client'], {
                relativeTo: this.route,
                queryParams: { clientNo: res?.personalInformation?.clientNo },
              });
            }
          }
        },
        (error) => {
          console.log(error);
          this.uS.info(`An error occurred.`, 0);
          this.loading = false;
        }
      );
    } catch (error) {
      console.log(error);
      this.uS.info(`An error occurred.`, 0);
      this.loading = false;
    }
  }
}
const testData = {
  personalInformation: {
    clientNo: 'cl140',
    surname: 'Lawal',
    firstName: 'Ahmed',
    busLine: 'L',
    middleName: 'AHMED',
    dateOfBirth: '2022-02-24',
    email: 'ja@d.com',
    alternativeEmail: 'dd@d.cp',
    type: 'I',
    gender: 'male',
    phoneNumber: '31wdw3344',
    alternativePhoneNumber: '2334dw34',
    maritalStatus: 'divorced',
    nationality: 'NGA',
    address: 'addre',
    addressTown: 'town',
    addressState: 'BEN',
    addressCountry: 'NGA',
    addressGeolocation: '244',
    addressRegion: 'NGA',
  },
  identification: {
    id: null,
    clientNo: 'cl140',
    idExpiryDate: '2022-02-25',
    idNumber: 'ewfrfrfwdwrfw',
    nationalInsuranceNumber: '23456789fwefe85343',
    bvn: '8qdq7565323',
    pensionCommissionNumber: '8764534dwd6576',
    idType: 'wdwdwd',
    taxIdentificationNumber: 'qedewewdwwfrr',
  },
  employmentInformation: {
    id: 62,
    employStatus: 'E',
    companyName: 'vrerer',
    employerSector: 'AD',
    employerClientNo: 23,
    incomeBand: '344434',
    occupationGroup: 'EGR',
    occupation: 'CHE',
    employmentDate: null,
    educationLevel: null,
    clientNo: 'CL140',
    createdOn: null,
    createdBy: null,
    cadre: null,
    staffNo: null,
    jobTitle: null,
    active: null,
  },
  paymentInformation: null,
  nextOfKin: [
    {
      clientNo: 'CL140',
      relationship: 'CON',
      category: null,
      fullName: 'wded',
      email: 'aa@ff.com',
      phoneNumber: '442',
      id: 375,
      clientStatus: null,
      policyNo: null,
      codeTitle: null,
      policyCode: null,
      relClientNo: null,
      relDt: null,
      userCode: null,
      createdBy: null,
    },
    {
      clientNo: 'CL140',
      relationship: '',
      category: null,
      fullName: '',
      email: '',
      phoneNumber: '',
      id: 376,
      clientStatus: null,
      policyNo: null,
      codeTitle: null,
      policyCode: null,
      relClientNo: null,
      relDt: null,
      userCode: null,
      createdBy: null,
    },
  ],
  fileNames: null,
};
