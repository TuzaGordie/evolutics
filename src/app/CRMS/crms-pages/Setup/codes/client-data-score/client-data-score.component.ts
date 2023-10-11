import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import {IDataScore } from '../extras/setup.model';
import { SetupService } from '../extras/setup.service';

@Component({
  selector: 'app-client-data-score',
  templateUrl: './client-data-score.component.html',
  styleUrls: ['./client-data-score.component.scss']
})
export class ClientDataScoreComponent implements OnInit {
  form: FormGroup;
  loading:any;
  constructor(
    private route: ActivatedRoute,
    public setS: SetupService,
    private fb: FormBuilder,
    private utilityService:UtilityService
  ) { }

  ngOnInit(): void {
  this.form = this.fb.group({
      bank: configForms.default(false),
      bvn: configForms.default(false),
      clientDataScore: configForms.required(0),
      clientId: configForms.default(0),
      description: configForms.default(""),
      dob: configForms.default(false),
      email: configForms.default(false),
      employment: configForms.default(false),
      fullName: configForms.default(false),
      gender: configForms.default(false),
      id: configForms.default(0),
      income: configForms.default(false),
      maritalStatus: configForms.default(false),
      nin: configForms.default(false),
      phoneNumber: configForms.default(false),
      policy: configForms.default(false),
      surname: configForms.default(false)
  });

  this.prefillShowForm();
}

prefillShowForm() {
  this.route.queryParamMap.subscribe(async (queryMap) => {
    let clientDataScore = queryMap.get('scoreCode');
    clientDataScore == null ? (this.loading = false) : (this.loading = true);
    this.setS.showClientDataScore(clientDataScore).subscribe((res:any) => {
      console.log("Data Score Result"+JSON.stringify(res));
      this.loading = false
      this.form.patchValue({
        clientDataScore: res?.clientDataScore,
        description: res?.description,
        fullName:res?.fullName,
        phoneNumber: res?.phoneNumber,
        surname: res?.surname,
        email: res?.email,
        dob: res?.dob,
        income: res?.income,
        gender: res?.gender,
        maritalStatus: res?.maritalStatus,
        employment: res?.employment,
        bank: res?.bank,
        nin: res?.nin,
        bvn: res?.bvn,
        id: res?.id
      })
      this.form.disable();
    });
  });

}

onSubmit() {
  this.submit();
}


private async submit() {
  this.loading = true;
  let values = this.form.value as IDataScore;
  console.log("Request object"+JSON.stringify(values));
  this.setS.submitDataScore(values).then((res:any) => {
      console.log("Response from score"+JSON.stringify(res));
      if (res !== null) {
        this.utilityService.info(`Client Data Score ${res?.clientDataScore} was saved successfully`,1);
      } else {
        this.utilityService.info('Could not create',0);
      }
    }).catch((error) => {
      this.utilityService.info(error.error?.message,0);
    });
}
}
