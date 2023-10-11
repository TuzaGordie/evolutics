import { Environment } from './../../../../Shared/models/index.model';
import { User } from 'src/app/Shared/models/life/user/Users';
import { ICreateCampaign } from './../../Setup/codes/extras/setup.model';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { SetupService } from '../../Setup/codes/extras/setup.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss']
})
export class CampaignCreateComponent implements OnInit {
  reportGroupList:any = [];
  reportList:any = [];
  private nboftarget: number = 1;
  defineTargets: FormArray;
  template: FormArray;
  dt: string[] = [''];
  tm: string[] = [''];
  form: FormGroup;
  loading: boolean;
  targetGroupArray: any[];
  totalCount:string;

  constructor(
    private route: ActivatedRoute,
    public setS: SetupService,
    private fb: FormBuilder,
    private utilityService: UtilityService,
  ) {}


  private get getUserCode() {
    return environment.user.code;
  }

  ngOnInit(): void {
    this.defineTargets = this.fb.array([
      new FormGroup({
        attribute: configForms.default(''),
        condition: configForms.default(0),
        value: configForms.default('')
      }),
    ]);

    this.template = this.fb.array([
      new FormGroup({
        medium: configForms.default(''),
        template: configForms.default(''),
      }),
    ]);

    this.form = this.fb.group({
      controlGroup: configForms.default(0),
      costCurrency: configForms.default(''),
      description: configForms.default(''),
      endDate: configForms.default(''),
      expectRequests: this.defineTargets,
      recurrence: configForms.default(''),
      sendTime: configForms.default(0),
      startDate: configForms.default(''),
      campaignCode: configForms.default(''),
      targetGroup: configForms.default(''),
      template: this.template
    });

    this.setS.getTargetGroup().subscribe((res:any)=>{
      console.log(JSON.stringify(res));
      this.targetGroupArray = res?.content;
  })
  console.log("User Code"+this.getUserCode);
  this.setS.getUserPrimaryCompany(this.getUserCode).subscribe((res:any)=>{
    console.log("User Result"+res);
    this.setS.getClientGroupingByCompanyCode('').subscribe((result)=>{
      let clientGrouping = result;
      console.log(clientGrouping);
    })
})
  }


  onSubmit() {
    this.submit();
  }

  private async submit() {
    this.loading = true;
    let values = this.form.value as ICreateCampaign;
    // values.sendTime?.hour = values.sendTime.
    // values.sendTime.minute = values.sendTime
    // values.sendTime.nano = values.sendTime
    // values.sendTime.second = values.sendTime
    console.log("Submit values for create Campaign "+JSON.stringify(values));
    console.log("Submit values for create Campaign "+values.sendTime);
    this.setS.submitCampaign(values)
      .then((res) => {
        if (res !== null) {
          this.utilityService.info('Succesfully Created', 1);
        } else {
          this.utilityService.info('Succesfully Created', 0);
        }
      })
      .catch((error) => {
        this.utilityService.info('An Error Occurred', 0);
      });
  }

  calculateControlTarget(){
    let targetGroupCode = this.form.value.targetGroup;
    let ctrlTargetGroup = this.form.value.controlGroup;
    this.setS.getControlTargetGroup(targetGroupCode,ctrlTargetGroup).subscribe((res:any)=>{
      console.log(res);
      this.totalCount = res["Total Count"];
  })
  }



  targetInc() {
    const b = new FormGroup({
      attribute: configForms.default(''),
      condition: configForms.default(''),
      value: configForms.default('')
    });
    this.dt.push('');
    this.defineTargets.push(b);
  }

  removeCampaign(i) {
    this.defineTargets.removeAt(i);
    this.dt.splice(i, 1);
  }


  templateInc() {
    const b = new FormGroup({
      template: configForms.default(''),
      medium: configForms.default(''),
    });
    this.tm.push('');
    this.template.push(b);
  }

  removeTemplate(i) {
    this.template.removeAt(i);
    this.tm.splice(i, 1);
  }










}
