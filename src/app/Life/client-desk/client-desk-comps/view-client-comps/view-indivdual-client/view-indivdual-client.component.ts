import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from 'src/app/Services/app.service';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { FindClientService } from '../../../service/find-client.service';
import { HelpersService } from '../../../service/helpers.service';
import { BankAccountsComponent } from '../bank-accounts/bank-accounts.component';
import { ClientIdComponent } from '../client-id/client-id.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { ClientSocialMediaComponent } from '../client-social-media/client-social-media.component';
import { FKVP } from 'src/app/Shared/models/index.model';
import { LocationService } from 'src/app/Services/location.service';

declare var $: any;

@Component({
  selector: 'app-view-individual-client-comp',
  templateUrl: './view-indivdual-client.component.html',
  styleUrls: ['./view-indivdual-client.component.scss'],
})
export class ViewIndivdualClientComponent implements OnInit {
  @Input('client') set _client(res: IClientViewData) {
    this.loading = true;
    this.clientNo = res.clientNo;
    if (res.dateOfBirth == '1970-01-01') res.dateOfBirth = null;
    if (res.dateCreated)
      res.dateCreated = this.utilityService.dateFormat(res.dateCreated) as any;
    this.clientData = res;
    this.lbls.forEach((l) => (l.value = l.value || res[l.key]));
    console.log('client type', this.clientData.type);
    this.setFormData(this.clientData);
    this.loading = false;
  }
  clientNo: string;
  lbls: FKVP[];
  @Input('clientNo') set _clientNo(v: string) {
    this.clientNo = v;
    this.loading = true;
    this.clientS.getClientViewData(this.clientNo).subscribe(
      (res) => {
        console.log('client data', res);
        if (res.dateOfBirth == '1970-01-01') res.dateOfBirth = null;
        if (res.dateCreated)
          res.dateCreated = this.utilityService.dateFormat(
            res.dateCreated
          ) as any;
        this.clientData = res;
        this.lbls.forEach((l) => (l.value = l.value || res[l.key]));
        console.log('client type', this.clientData.type);
        this.setFormData(this.clientData);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.utilityService.info(err, 0).then(() => this.utilityService.back());
      }
    );
  }
  viewClientForm = new FormGroup({});
  readonlyValue: any;
  policyLength: any;
  businessLength: any;
  relationshipLength: any;
  quoteList: any;
  paymentLength: any;
  getAge; // a utility function to calculate from date of birth
  clientData: IClientViewData;
  busline = this.appS.busLine;
  private nbofId: number = 1;
  pp: string;
  clientStatus: { code: string; title: string };
  getStatusColour;
  statusCodesList: Array<{ code: string; title: string }> = [];
  totalPremiumReceived: number;
  clientNationality: string;
  documentsBaseURL: string;
  clientPicture: any;
  clientEmploymentForm: FormArray = new FormArray([]);
  @Input()loading = true;
  editBankStatus = {}; // boolean flags to edit individual rows of bank accounts in bank modal
  isCreatingBankAccount: boolean = false;
  newBankAccountForm: FormGroup;
  bankAccountsForm: FormArray = new FormArray([]);
  showNewBankAccountForm: boolean = false;
  isCreatingEmployment: boolean = false;
  editEmploymentStatus = {};
  newEmploymentForm: FormGroup;
  showNewEmploymentForm: boolean = false;
  editModal = {
    medium: { width: '60vw', maxHeight: '80vh' },
    wide: { width: '90vw', maxHeight: '80vh' },
    large: { width: '100vw', maxWidth: '100vw', maxHeight: '80vh' },
  };

  constructor(
    public clientS: FindClientService,
    public route: ActivatedRoute,
    public docS: DocumentService,
    private utilityService: UtilityService,
    private helpersAndConstants: HelpersService,
    public appS: AppService,
    private appService: AppService,
    private locService: LocationService
  ) {
    this.getAge = this.helpersAndConstants.getAge;
    this.getStatusColour = this.helpersAndConstants.getStatusColour;
    this.lbls = [
      new FKVP('title', 'Title'),
      new FKVP('fullName', 'Full Name'),
      new FKVP('firstName', 'First Name'),
      new FKVP('middleName', 'Middle Name'),
      new FKVP('surname', 'Last Name'),
      new FKVP('gender', 'Gender'),
      new FKVP('phoneNumber', 'Phone Number 1'),
      new FKVP('phoneNumber2', 'Phone Number 2'),
      new FKVP('email', 'Email 1'),
      new FKVP('email2', 'Email 2'),
      new FKVP('address', 'Address'),
      new FKVP('town', 'Town'),
      new FKVP('state', 'State'),
      new FKVP('country', 'Country'),
      new FKVP('dateOfBirth', 'Date Of Birth'),
      new FKVP('category', 'category'),
      new FKVP('kyc', 'KYC', true, '', null, null, this.editKyc),
      new FKVP('bankNo', 'Bank No', true, '', null, null, this.editbankNo),
      new FKVP('language', 'Language'),
      new FKVP(
        'employer',
        'Employer',
        true,
        '',
        null,
        null,
        this.openEeditEmployer
      ),
      new FKVP('crmId', 'CRM ID'),
      new FKVP('clv', 'CLV'),
      new FKVP('band', 'Band'),
      new FKVP('enroleeNo', 'Enrolee No'),
      new FKVP('dateCreated', 'Created On'),
      new FKVP('communication', 'Communication'),
      new FKVP('maritalStatus', 'Marital Status'),
      new FKVP('occupationGroup', 'Occupation Group'),
      new FKVP(
        'socialMedia',
        'Social Media',
        true,
        '',
        null,
        null,
        this.editSocialMedia
      ),
      new FKVP('enroleeSuffix', 'Enrolee Suffix'),
    ];
    this.lbls.find((x) => x.key == 'country').formatter = (val) => {
      return this.locService
        .getCountryByCode(val)
        .toPromise()
        .then((r) => r?.description || val);
    };
    this.lbls.find((x) => x.key == 'state').formatter = (val) => {
      return this.locService
        .getStatesByCode(val)
        .toPromise()
        .then((r) => r?.description || val);
    };
    this.lbls.find((x) => x.key == 'town').formatter = (val) => {
      return this.locService
        .getTownByCode(val)
        .toPromise()
        .then((r) => r?.description || val);
    };
    this.lbls.find((x) => x.key == 'gender').formatter = (val) => {
      return this.clientS
        .getGenders()
        .toPromise()
        .then((r) => r.find((x) => x.code == val)?.title || val);
    };
    this.lbls.find((x) => x.key == 'maritalStatus').formatter = (val) => {
      return this.clientS
        .getMaritalStatuses()
        .toPromise()
        .then((r) => r.find((x) => x.code == val)?.title || val);
    };
  }

  ngOnInit(): void {
    // if (this.clientNo) {
    //   console.log('id', this.clientNo);
    //   this.clientS.getClientViewData(this.clientNo).subscribe((res) => {
    //     console.log('client data', res);
    //     this.clientData = res;
    //     console.log('client type', this.clientData.type);
    //     this.setFormData(this.clientData);
    //     this.viewClientForm.disable();
    //   });
    // }

    console.log('Client Info', this.clientS.clientInfo);
    this.viewClientForm = new FormGroup({
      address: new FormControl(null),
      band: new FormControl(null),
      bankNo: new FormControl(0),
      category: new FormControl(null),
      clv: new FormControl(null),
      communication: new FormControl(null),
      createdOn: new FormControl(null),
      crm: new FormControl(null),
      dateCreated: new FormControl(null),
      dob: new FormControl(null),
      email: new FormControl(null),
      alternativeEmail: new FormControl(null),
      employer: new FormControl(0),
      enroleeNo: new FormControl(null),
      firstName: new FormControl(null),
      fullName: new FormControl(null),
      gender: new FormControl(null),
      groupNo: new FormControl(null),
      idNo: new FormControl(null),
      kyc: new FormControl(0),
      language: new FormControl(null),
      maritalStatus: new FormControl(null),
      middleName: new FormControl(null),
      occupationGroup: new FormControl(null),
      phoneNumber: new FormControl(null),
      alternativePhoneNumber: new FormControl(null),
      providerCode: new FormControl(null),
      socialmedia: new FormControl(0),
      enroleeSuffix: new FormControl(null),
      surname: new FormControl(null),
      title: new FormControl(null),
      statusCode: new FormControl(null),
      type: new FormControl('I'),
    });
    console.log('formdata', this.viewClientForm.value);

    this.createNewEmploymentForm();
    this.setClientBankAccountsCount(this.clientNo);
    this.setClientEmployment();
    this.setClientIdentificationCount(this.clientNo);
    this.setClientPassport(this.clientNo);
    this.setClientPicture();
    this.setDocumentsBaseURL();
    this.setPendingPayments(this.clientNo, this.busline);
    this.setPendingQuotes(this.clientNo);
    this.setPolicies(this.clientNo);
    this.setRelationship(this.clientNo);
    this.setStatusCodesList();
    this.setTotalPremiumReceived(this.clientNo);
    this.setClientSocialMediaCount(this.clientNo);
  }
  changePP(e?: File) {
    this.docS
      .upload(e, {
        refNo: this.clientData.clientNo,
        refCat: 'CLI',
        subCategory: 'PP',
        title: e.name,
      })
      .subscribe(
        (r) => {
          console.log('post pp', r);
        },
        (e) => {
          console.error(e);
        }
      );
  }

  createNewEmploymentForm() {
    this.newEmploymentForm = new FormGroup({
      employer: new FormControl(null, Validators.required),
      employmentDate: new FormControl(null, Validators.required),
      occupation: new FormControl(null, Validators.required),
      incomeBand: new FormControl(null, Validators.required),
      staffNo: new FormControl(null, Validators.required),
      cadre: new FormControl(null),
      jobTitle: new FormControl(null, Validators.required),
      active: new FormControl(null, Validators.required),
    });
  }
  setPolicies(id) {
    this.clientS.getPoliciesApi(id).subscribe((res) => {
      const policyList: any = res;
      this.policyLength = policyList?.length;
      console.log('policy Info', this.policyLength);
    });
  }
  openEeditEmployer = () => {
    $('#employerModal').modal('show');
  };
  setOtherBusiness(id) {
    this.clientS.getBusinessApi(id).subscribe((res) => {
      const businessList: any = res;
      this.businessLength = businessList?.length;
      console.log('other business info ', this.businessLength);
    });
  }
  setRelationship(id) {
    this.clientS.getRelationshipApi(id).subscribe((res) => {
      const relationList: any = res;
      this.relationshipLength = relationList?.length;
      console.log('relationship Info', this.relationshipLength);
    });
  }
  setPendingQuotes(id) {
    let id1 = this.appService.getCurrentSystemMetadata.busline;
    this.clientS.getPendingQuotesApi(id, id1).subscribe((res) => {
      this.quoteList = res;
      console.log('quotes Info', res);
    });
  }
  setPendingPayments(id, id1) {
    const pendingPayments$ = this.clientS.getPendingPaymentsApi(id, id1).pipe(
      catchError((e) => {
        console.log('Error fetching pendingPayments', e);
        return of([]);
      })
    );
    const pendingClaims$ = this.clientS.getPendingClaims(id).pipe(
      catchError((e) => {
        console.log('Error fetching pendingClaims', e);
        return of([]);
      })
    );

    forkJoin([pendingPayments$, pendingClaims$]).subscribe(
      ([pendingPayments, pendingClaims]) => {
        this.paymentLength = pendingPayments?.length + pendingClaims?.length;
      }
    );
  }

  setClientEmployment() {
    this.clientS.getClientEmployment(this.clientNo).subscribe(
      (res: any) => {
        if (!Array.isArray(res)) res = [res];
        res.forEach((emp) => {
          this.clientEmploymentForm.push(this.newEmploymentFormGroup(emp));
          this.editEmploymentStatus[emp.id] = 'VIEW';
          console.log(
            'this.editEmploymentStatus[emp.id]: ',
            this.editEmploymentStatus[emp.id]
          );
        });
        // set employments count
        this.viewClientForm.patchValue({ employer: res.length });
        this.lbls.find((x) => x.key == 'employer').value = res.length;
      },
      (err: HttpErrorResponse) =>
        console.log(
          'error fetching employment details for clientNo:' + this.clientNo,
          err
        )
    );
  }

  newEmploymentFormGroup(employment) {
    return new FormGroup({
      employer: new FormControl(employment?.companyName, Validators.required),
      employmentDate: new FormControl(
        employment?.employmentDate,
        Validators.required
      ),
      occupation: new FormControl(employment?.occupation, Validators.required),
      incomeBand: new FormControl(employment?.incomeBand, Validators.required),
      staffNo: new FormControl(employment?.staffNo, Validators.required),
      cadre: new FormControl(employment?.cadre),
      jobTitle: new FormControl(employment?.jobTitle, Validators.required),
      active: new FormControl(employment?.active, Validators.required),
      id: new FormControl(employment.id, Validators.required),
    });
  }

  createEmployment() {
    if (this.newEmploymentForm.invalid) {
      this.newEmploymentForm.markAllAsTouched();
      return;
    }
    this.isCreatingEmployment = true;
    this.clientS.createEmployment(this.newEmploymentForm.value).subscribe(
      (res: any) => {
        this.clientEmploymentForm.push(this.newEmploymentFormGroup(res));
        this.newEmploymentForm.reset();
        this.editEmploymentStatus[res.id] = 'VIEW'; // display edit button for this row
        this.viewClientForm.patchValue({
          employer: this.clientEmploymentForm.value.length,
        });
        this.lbls.find((x) => x.key == 'employer').value =
          this.clientEmploymentForm.value.length;
        // update the count on the view-client
        this.isCreatingEmployment = false;
      },
      (err: HttpErrorResponse) => {
        console.log(
          'error creating adding new employment record for clientNo: ' +
            this.clientNo,
          err
        );
        this.utilityService.notify(
          'error adding new employment record: ' + err.statusText,
          0
        );
        this.isCreatingEmployment = false;
      }
    );
  }

  editEmployment(employmentControl) {
    if (employmentControl.invalid) {
      employmentControl.markAllAsTouched();
      return;
    }
    this.editEmploymentStatus[employmentControl.value.id] = 'PENDING';

    this.clientS
      .updateEmployment(employmentControl.value.id, employmentControl.value)
      .subscribe(
        (res: any) => {
          employmentControl = this.newEmploymentFormGroup(res);
        },
        (err: HttpErrorResponse) => {
          console.log(
            'error editing employment record for client: ' +
              employmentControl.value.clientNo,
            err
          ),
            this.utilityService.notify(
              'error updating employment record with id: ' +
                employmentControl.value.id,
              0
            );
          this.editEmploymentStatus[employmentControl.value.id] = 'EDITING';
        }
      );
  }

  onSubmit() {
    console.log('formdata', this.viewClientForm.value);
    /*    this.findClientService.ownerInfo(this.viewClientForm.value); */
    this.setEditFormData(this.viewClientForm.value);
    this.clientS
      .updatePostData(this.clientNo, this.viewClientForm.value)
      .subscribe((res) => {
        console.log('update data', res);
      });
    /*  this.findClientService.updateClientInfo() */
  }
  onNext() {
    console.log('formdata', this.viewClientForm.value);
    /*  this.findClientService.ownerInfo(this.viewClientForm.value); */
  }

  checkReadonly(value: any) {
    /*  if(value == this.readonlyValue){
     return false;
   }
   else{
     return true;
   } */
  }
  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }
  setFormData(data: any) {
    this.viewClientForm.patchValue({
      title: data?.title,
      fullName: data?.fullName,
      firstName: data?.firstName,
      middleName: data?.middleName,
      surname: data?.surname,
      gender: data?.gender,
      phoneNumber: data?.phoneNumber,
      alternativePhoneNumber: data?.alternativePhoneNumber,
      email: data?.email,
      alternativeEmail: data?.alternativeEmail,
      address: data?.address,
      dob: data?.dateOfBirth,
      category: data?.category,
      // kyc: data?.kyc, //kyc number to be gotten from a seperate service
      idNo: data?.idNumber,
      language: data?.language,
      // employer: data?.employer, // to be gotten from a seperate service
      crm: data?.crmId,
      // bankNo: data?.bankNo, // number of bank accounts is gotten from a seperate service
      dateCreated: data?.dateCreated,
      communication: data?.communication,
      maritalStatus: data?.maritalStatus,
      band: data?.band,
      groupNo: data?.noOfGroups,
      clv: data?.clv,
      occupationGroup: data?.occupationGroup,
      // socialmedia: data?.socialMedia, // to be gotten from a seperate service
      providerCode: data?.providerCode,
      enroleeNo: data?.enroleeNo,
      enroleeSuffix: data?.enroleeSuffix,
      statusCode: data?.statusCode,
      type: data?.type,
    });
  }

  setEditFormData(data: any) {
    this.viewClientForm.patchValue({
      title: data?.title,
      fullName: data?.fullName,
      firstName: data?.firstName,
      middleName: data?.middleName,
      surname: data?.surname,
      gender: data?.gender,
      phoneNumber: data?.phoneNumber,
      alternativePhoneNumber: data?.alternativePhoneNumber,
      email: data?.email,
      alternativeEmail: data?.alternativeEmail,
      address: data?.address,
      dob: data?.dob,
      category: data?.category,
      // kyc: data?.kyc, // fetched from a seperate service
      idNo: data?.idNo,
      language: data?.language,
      // employer: data?.employer, // fetched from a seperate service
      crm: data?.crm,
      // bankNo: data?.bankNo, // bankNo is gotten from a seperate service
      dateCreated: data?.dateCreated,
      communication: data?.communication,
      maritalStatus: data?.maritalStatus,
      band: data?.band,
      groupNo: data?.noOfGroups,
      clv: data?.clv,
      occupationGroup: data?.occupationGroup,
      // socialmedia: data?.socialmedia, // fetched from a seperate service
      providerCode: data?.providerCode,
      enroleeNo: data?.enroleeNo,
      enroleeSuffix: data?.enroleeSuffix,
      createdOn: data?.createdOn,
      statusCode: data?.statusCode,
      type: data?.type,
    });
  }

  setClientPassport(clientNo) {
    this.clientS
      .getClientPassport(clientNo)
      .subscribe((res) => (this.pp = res));
  }

  onChangeClientStatus(event) {
    console.log('onChangeClientStatus called with: ', event.target.value);
    this.viewClientForm.patchValue({
      statusCode: event.target.value,
    });
  }

  setStatusCodesList() {
    this.clientS.getClientStatusCodes().subscribe(
      (res: any[]) => {
        this.statusCodesList = res;
      },
      (err: HttpErrorResponse) =>
        console.log('Error fetching status codes', err)
    );
  }

  setTotalPremiumReceived(clientNo) {
    this.clientS
      .getTotalPremiumReceived(clientNo)
      .subscribe((res) => (this.totalPremiumReceived = res));
  }

  setDocumentsBaseURL() {
    this.clientS.getDocumentsBaseURL().subscribe(
      (res: string) => (this.documentsBaseURL = res),
      (err: HttpErrorResponse) =>
        console.error(
          'Error fetching base url for documents storage service',
          err
        )
    );
  }

  setClientPicture() {
    this.clientS.getClientPicture(this.clientNo).subscribe(
      (doc: any) => (this.clientPicture = doc),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching picture document for clientNo: ' + this.clientNo,
          err
        )
    );
  }

  isFieldInvalid(form, controlName) {
    return (
      form.controls[controlName].invalid && form.controls[controlName].touched
    );
  }

  getDocumentsBaseURL() {
    return this.clientS.getDocumentsBaseURL();
  }

  editSocialMedia = () => {
    this.utilityService.dialogOpener(
      ClientSocialMediaComponent,
      {
        ...this.editModal.wide,
      },
      (data) => {
        this.viewClientForm.patchValue({ socialmedia: data.count });
        this.lbls.find((x) => x.key == 'socialMedia').value = data.count;
      },
      () => console.log('social media modal cancelled')
    );
  };
  editKyc = () => {
    this.utilityService.dialogOpener(
      ClientIdComponent,
      {
        ...this.editModal.wide,
      },
      (data) => {
        this.viewClientForm.patchValue({ kyc: data.count });
        this.lbls.find((x) => x.key == 'kyc').value = data.count;
        this.clientNationality = data.nationality;
      },
      () => console.log('Client Id modal cancelled')
    );
  };
  idCounter() {
    return new Array(this.nbofId);
  }
  idInc() {
    this.nbofId = this.nbofId + 1;
  }
  idDec() {
    this.nbofId = this.nbofId - 1;
    if (this.nbofId <= 0) {
      this.nbofId = 1;
    }
  }

  uploadDocument(file: File, subCategory, options?, done?) {
    if (options && options != null && typeof options === 'object') {
      // delete options with no value
      options = Object.entries(options)
        ?.filter(([key, value]) => !!value)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
    }
    // add default options
    options = Object.assign(options || {}, {
      refNo: this.clientNo,
      refCat: 'CLI',
      subCategory: subCategory,
      title: file.name,
    });

    this.docS.upload(file, options).subscribe(
      (res) => {
        this.utilityService.notify('Document uploaded successfully');
        console.log('uploaded document successfully', res);
        done && done();
      },
      (err: HttpErrorResponse) => {
        this.utilityService.notify('Error uploading new document', 0);
        console.error('Error uploading new document', err);
      }
    );
  }

  downloadDocument(event: Event, document) {
    event.preventDefault();
    const { docKey, fileName } = document;
    const url = `${this.documentsBaseURL}/${docKey}/${fileName}`;
    window.open(url);
  }

  onEditClient() {
    this.utilityService.dialogOpener(
      EditClientComponent,
      {
        data: {
          client: this.viewClientForm,
          clientNo: this.clientNo,
        },
      },
      (val) =>
        console.log('client was successfully edited with return value', val)
    ),
      () => console.log('client editing was cancelled');
  }

  editbankNo = () => {
    this.utilityService.dialogOpener(
      BankAccountsComponent,
      {
        data: {
          clientNo: this.clientNo,
        },
      },
      (data) => {
        this.viewClientForm.patchValue({ bankNo: data.bankAccountsCount });
        this.lbls.find((x) => x.key == 'bankNo').value = data.bankAccountsCount; // refresh the count of bank accounts
        console.log('data returned bank accounts list modal', data);
      },
      () => console.log('bank accounts list modal cancelled')
    );
  };

  setClientBankAccountsCount(clientNo) {
    this.clientS
      .getClientBanksList(clientNo)
      .pipe(map((res) => res?.length))
      .subscribe(
        (noOfBankAccounts) => {
          this.viewClientForm.patchValue({
            bankNo: noOfBankAccounts,
          });
          this.lbls.find((x) => x.key == 'bankNo').value = noOfBankAccounts;
        },
        (err: HttpErrorResponse) =>
          console.log('error fetching banks list for client', err)
      );
  }

  setClientIdentificationCount(clientNo) {
    this.clientS
      .getClientIdentification(clientNo)
      .pipe(map((res) => res?.length))
      .subscribe(
        (noOfIds) => {
          this.viewClientForm.patchValue({
            kyc: noOfIds,
          });
          this.lbls.find((x) => x.key == 'kyc').value = noOfIds;
        },
        (err: HttpErrorResponse) =>
          console.log('error fetching ids list for client', err)
      );
  }

  setClientSocialMediaCount(clientNo) {
    this.clientS
      .getSocialMediaAccounts(clientNo)
      .pipe(map((res) => res?.length))
      .subscribe((count) => {
        this.viewClientForm.patchValue({
          socialmedia: count,
        });
        this.lbls.find((x) => x.key == 'socialMedia').value = count;
      });
  }
}
