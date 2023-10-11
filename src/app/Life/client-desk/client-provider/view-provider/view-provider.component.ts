import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { ClientService } from 'src/app/Services/client.service';
import { CodeService } from 'src/app/Services/code.service';
import { DocumentService } from 'src/app/Services/document.service';
import { LocationService } from 'src/app/Services/location.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { FKVP } from 'src/app/Shared/models/index.model';
import { HelpersService } from '../../service/helpers.service';
import { IClientProvider } from '../client-provider-extras/client-provider.interface';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss'],
})
export class ViewProviderComponent implements OnInit {
  providerNo: string;
  loading: boolean;
  provider: IClientProvider;
  clientNo: any;
  pp: string;
  getStatusColour: (status: string) => any;
  client: IClientViewData;

  lbls1: FKVP[] = [
    new FKVP('fullName', 'Full name'),
    new FKVP('email', 'Main Email'),
    new FKVP('alternativeEmail', 'Alternative Email'),
    new FKVP('phoneNumber', 'Phone Number'),
    new FKVP('alternativePhoneNumber', 'Alternative Phone No'),
    new FKVP('website', 'Website'),
    new FKVP(null, 'Statement Action'),
    new FKVP('providerCategory', 'Category'),
    new FKVP('providerSubCategory', 'SubCategory'),
    new FKVP('address', 'Address'),
    new FKVP(
      'country',
      'Country',
      null,
      null,
      null,
      null,
      null,
      async (val) =>
        await this.locS
          .getCountryByCode(val)
          .toPromise()
          .then((r) => r?.description)
    ),
    new FKVP(
      'state',
      'State',
      null,
      null,
      null,
      null,
      null,
      async (val) =>
        await this.locS
          .getStatesCountry(
            this.lbls1.find((x) => x.key == 'country').value as any
          )
          .toPromise()
          .then((r) => r?.find((x) => x.code == val)?.description)
    ),
    new FKVP('town', 'Town',
    null,
    null,
    null,
    null,
    null,
    async (val) =>
      await this.locS
        .getTownByCode(val)
        .toPromise()
        .then((r) => r?.description)),
    new FKVP('language', 'Language'),
    new FKVP('socialMedia', 'Social Media'),
    new FKVP('network', 'Network'),
    new FKVP('facilityDescription', 'Facility Description'),
    new FKVP(
      'dateCreated',
      'Created On',
      null,
      null,
      null,
      null,
      null,
      (value) => this.uS.dateFormat(value, 3)
    ),
    new FKVP('createdBy', 'Created By'),
  ];
  form: FormGroup = new FormGroup({});
  constructor(
    public clientS: ClientService,
    public route: ActivatedRoute,
    public docS: DocumentService,
    public codeS: CodeService,
    public locS: LocationService,
    public uS: UtilityService,
    private helpersAndConstants: HelpersService,
    public appS: AppService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      this.clientNo = this.route.snapshot.queryParams.clientNo;
      this.providerNo = this.route.snapshot.queryParams.providerNo;
      if (!this.providerNo) throw 'Provider number is required';
      this.provider = await this.clientS
        .getClientProviderData(this.providerNo)
        .toPromise();
      if (!this.provider)
        throw `Provider with number ${this.providerNo} could not be found`;

      this.clientNo = this.provider?.providerInformation?.clientNo;
      if (!this.clientNo) throw 'Client number is required';
      this.client = await this.clientS
        .getClientViewData(this.clientNo)
        .toPromise();
      if (!this.client)
        throw `Client with number ${this.clientNo} could not be found`;
      this.form = new FormGroup(
        this.uS.objToFormControls({
          ...this.provider?.providerInformation,
          ...this.client,
        })
      );
      this.form.patchValue(this.provider?.providerInformation);
      this.lbls1.forEach(
        (l) =>
          (l.value =
            this.provider?.providerInformation[l.key] || this.client[l.key])
      );
    } catch (e) {
      this.uS.info(e, 0).then(() => this.uS.back());
    }
    this.loading = false;
    this.getStatusColour = this.helpersAndConstants.getStatusColour;
  }
  changePP(e?: File) {
    this.docS
      .upload(e, {
        refNo: this.providerNo,
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
}
