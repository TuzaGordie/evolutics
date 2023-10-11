import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CreateCorporateClientService } from '../create-corporate-client.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IDocMetadata, ITab } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { CreateAccountFormComponent } from 'src/app/Life/life-components/create-account-modal/create-account-form/create-account-form.component';
import { EClientType } from '../../client-extras/client.interface';
import { ClientService } from 'src/app/Services/client.service';
import { ICorporateClient } from '../corporate-client-extras/corporate-client.interface';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss'],
})
export class CreateCorporateClientComponent implements OnInit {
  /*  tabs:any = "companyInfo"; */
  corporateForm: FormGroup = new FormGroup({
    companyInformation: new FormGroup({
      address: new FormControl(null),
      addressCountry: new FormControl(null),
      addressRegion: new FormControl(null),
      addressState: new FormControl(null),
      addressTown: new FormControl(null),
      busLine: new FormControl(this.appS.getCurrentSystemMetadata.busline),
      companyRedgNo: new FormControl(null),
      country: new FormControl(null),
      email: new FormControl(
        null,
        [Validators.email],
        this.clientS.validateEmail.bind(this)
      ),
      fullName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null),
      sector: new FormControl(null),
      segment: new FormControl(null),
      type: new FormControl(EClientType.corporate),
      website: new FormControl(null, [
        Validators.pattern('^((www.))([a-zA-z0-9-_]+)(.com)'),
      ]),
    }),
    contactInformation: new FormArray([]),
    directors: new FormArray([]),
  });
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  @ViewChild('paymentInfo') paymentInfoRef: CreateAccountFormComponent;
  loading: boolean;
  tabs: ITab[] = [
    { label: 'Company Information' },
    { label: 'Contact Information' },
    { label: 'Directors' },
    { label: 'Payment Information' },
  ];
  selectedIndex :number=0
  constructor(
    public formService: CreateCorporateClientService,
    public fb: FormBuilder,
    public uS: UtilityService,
    public route: ActivatedRoute,
    public appS: AppService,
    public clientS: ClientService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.corporateForm.addControl(
      'paymentInformation',
      // new FormGroup({})
      this.paymentInfoRef.form
    ); 
    // if (!environment.production) {
    //   this.corporateForm.patchValue(testData);
    // }
  }
  ngOnDestroy(): void {}

  get companyForm() {
    return this.corporateForm.get('companyInformation') as FormGroup;
  }

  get directorsArray() {
    return this.corporateForm.get('directors') as FormArray;
  }
  get contactInformationArray() {
    return this.corporateForm.get('contactInformation') as FormArray;
  }

  get paymentForm() {
    return this.corporateForm.get('paymentInformation') as FormArray;
  }
  formatPayload(data: ICorporateClient) {
    data.directors = data.directors.filter((x) => x.relClientNo);
    data.contactInformation = data.contactInformation.filter(
      (x) => x.relClientNo
    );
  }

  @Input() isModal: boolean;
  @Input() modalOnComplete;

  async onSubmit() {
    this.loading = true;
    try {
      if (!this.corporateForm?.valid) throw 'The form is invalid';
      const data = this.corporateForm.value;
      this.formatPayload(data);
      const fd: FormData = new FormData();

      fd.append('corporateClient', JSON.stringify(data));
      if (this.paymentInfoRef?.accProofFile) {
        fd.append(
          'document',
          JSON.stringify([
            <IDocMetadata>{
              refCat: 'CLI',
              sensitivity: 'normal',
              title: 'client1',
              category: 'CLI',
              boxNo: environment?.userProfile?.users.docBox,
              branch: '2',
              subCategory: 'RIB',
            },
          ])
        );
        fd.append('files', this.paymentInfoRef.accProofFile);
      }
      await this.formService
        .submitPostData(fd)
        .toPromise()
        .then(async (res) => {
          console.log(res);
          this.loading = false;
          await this.uS.info(
            `Corporate Client ${res?.companyInformation?.clientNo} was created successfully.`
          );
          if (environment.production || true)
            if (this.isModal) {
              this.modalOnComplete(res);
            } else {
              this.uS.router.navigate(['../../view-client-corporate'], {
                relativeTo: this.route,
                queryParams: { clientNo: res?.companyInformation?.clientNo },
              });
            }
        });
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.uS.info(error, 0);
    }
  }
}

const testData = {
  companyInformation: {
    fullName: 'company',
    country: 'NGA',
    email: 'aad@email.com',
    phoneNumber: '08105225372',
    // phoneNumber: '0123456789',
    address: '1, addres',
    addressCountry: 'NGA',
    addressRegion: 'NE',
    addressState: 'BAU',
    addressTown: '160',
    companyRedgNo: '1',
    segment: 'BB',
    website: 'www.a.com',
    sector: 'POL',
  },
  contactInformation: [
    {
      fullName: 'nsme',
      relationship: 'CH',
      phoneNumber: 81234567,
      email: 'ww@gmail.com',
    },
    {
      fullName: '',
      relationship: '',
      phoneNumber: '',
      email: '',
    },
    {
      fullName: '',
      relationship: '',
      phoneNumber: '',
      email: '',
    },
  ],
  directors: [
    {
      fullName: 'dwc',
      relationship: 'DI',
      phoneNumber: '0182344',
      email: 'sdwd@f.com',
    },
  ],
  paymentInformation: {
    country: 'NGA',
    sortCode: '035150103',
    bankName: 'WEM',
    accountNo: '1233',
    bankBranch: 'WEMA BANK PLC HQ',
    accountName: 'dwdweece',
    payeeNo: null,
  },
};
