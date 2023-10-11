import {Component, OnInit} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { IMarketingEvent } from '../extras/setup.model';
import { SetupService } from '../extras/setup.service';

@Component({
  selector: 'app-marketing-event-crm',
  templateUrl: './marketing-event-crm.component.html',
  styleUrls: ['./marketing-event-crm.component.scss'],
})
export class MarketingEventCRMComponent implements OnInit {
  private nbofpl: number = 1;
  private nbofpl2: number = 1;
  loading: boolean;
  form: FormGroup;
  destStatus: string[] = [''];
  submitBtn: boolean;
  marketingExpectList: FormArray;
  exp: string[] = [''];
  locationList: FormArray;
  loc: string[] = [''];
  customerAttributesList: ICodeTitle[] = [];
  showmode = true;

  constructor(
    private route: ActivatedRoute,
    public setS: SetupService,
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.marketingExpectList = this.fb.array([
      new FormGroup({
        attribute: configForms.default(),
        valueExpected: configForms.default(),
      }),
    ]);

    this.locationList = this.fb.array([
      new FormGroup({
        dateFrom: configForms.default(),
        dateTo: configForms.default(),
        eventAddress: configForms.default(),
        eventCity: configForms.default(),
        eventCountry: configForms.default(),
        eventRegion: configForms.default(),
        eventTown: configForms.default(),
      }),
    ]);

    this.form = this.fb.group({
      eventCode: configForms.default(),
      company: configForms.default(),
      currency: configForms.default(),
      description: configForms.default(),
      estimatedEventCost: configForms.default(),
      partnerName: configForms.default(),
      partnerNo: configForms.default(),
      locationList: this.locationList,
      marketingExpectList: this.marketingExpectList,
    });

    this.setCustomerAttributesList();
    this.prefillShowForm();
  }

  prefillShowForm() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      let mktEventCode = queryMap.get('mktEventCode');
      if (mktEventCode == null) {
        this.loading = false;
      } else {
        this.setS.showMarketingEvent(mktEventCode).subscribe(
          (res: any) => {
            this.loading = false;
            this.showmode = false;
            let marketingEvent = res?.marketingEventList[0];
            this.form.patchValue({
              eventCode: marketingEvent?.mktEventCode,
              company: marketingEvent?.company,
              currency: marketingEvent?.currency,
              description: marketingEvent?.description,
              estimatedEventCost: marketingEvent?.estimatedCost,
              partnerName: marketingEvent?.partnerName,
              partnerNo: marketingEvent?.partner,
            });
            let mktExpectList: any[] = res?.marketingEventExpectList;
            let locationList: any[] = res?.marketingEventLocationList;
            if (Array.isArray(mktExpectList)) {
              mktExpectList.forEach((attr) => {
                this.marketingExpectList.push(
                  new FormGroup({
                    attribute: new FormControl(attr.attribute),
                    valueExpected: new FormControl(attr.valueExpected),
                  })
                );
              });
            }
            if (Array.isArray(locationList)) {
              locationList.forEach((attr) => {
                this.locationList.push(
                  new FormGroup({
                    dateFrom: new FormControl(attr.dateFrom),
                    dateTo: new FormControl(attr.dateTo),
                    eventAddress: new FormControl(attr.address),
                    eventCity: new FormControl(attr.city),
                    eventCountry: new FormControl(attr.country),
                    eventRegion: new FormControl(attr.region),
                    eventTown: new FormControl(attr.town)
                  })
                );
              });

              this.form.disable();
            }
          },
          (error) => {
            this.loading = false;
            this.utilityService.info(error?.error?.message, 0);
          }
        );
      }
    });
  }

  setCustomerAttributesList() {
    this.setS
      .getCustomerAttributesList()
      .subscribe((res) => (this.customerAttributesList = res));
  }
  onSubmit() {
    this.submit();
  }

  private async submit() {
    this.loading = true;
    let values = this.form.value as IMarketingEvent;
    let i = 0
    values.locationList.forEach((res)=>{
      values.locationList[i].dateFrom = res.dateFrom +' 00:00:00';
      values.locationList[i].dateTo = res.dateTo +' 00:00:00';
      i++;
    })

    console.log('VALUES FOR MARKTING ' + JSON.stringify(values));
    this.setS.submitMarketingEvent(values).then((res:any) => {
        if (res !== null) {
          this.utilityService.info(`Succesfully Created marketing event ${res?.marketingEvent?.mktEventCode}`, 1);
        } else {
          this.utilityService.info('Succesfully Created', 0);
        }
      })
      .catch((error) => {
        this.utilityService.info('An Error Occurred', 0);
      });
  }

  expectationInc() {
    const b = new FormGroup({
      attribute: configForms.default(),
      valueExpected: configForms.default(),
    });
    this.exp.push('');
    this.marketingExpectList.push(b);
  }

  removeExpectations(i) {
    this.locationList.removeAt(i);
    this.exp.splice(i, 1);
  }

  locationInc() {
    const b = new FormGroup({
      dateFrom: configForms.default(),
      dateTo: configForms.default(),
      eventAddress: configForms.default(),
      eventCity: configForms.default(),
      eventCountry: configForms.default(),
      eventRegion: configForms.default(),
      eventTown: configForms.default(),
    });
    this.loc.push('');
    this.locationList.push(b);
  }

  removeLocation(i) {
    this.locationList.removeAt(i);
    this.loc.splice(i, 1);
  }

  findPartner() {
    const partnerNo = this.form.value?.partnerNo;
    this.setS.getPartnerName(partnerNo).subscribe((data: any) => {
      console.log('PARTNER NAME' + data?.fullName);
      this.form.controls['partnerName'].setValue(data?.fullName);
    });
  }
}
