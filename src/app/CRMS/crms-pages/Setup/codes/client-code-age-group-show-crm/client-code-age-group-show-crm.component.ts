import { IAgeGroup } from './../extras/setup.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { SetupService } from '../extras/setup.service';
import { env } from 'process';

@Component({
  selector: 'app-client-code-age-group-show-crm',
  templateUrl: './client-code-age-group-show-crm.component.html',
  styleUrls: ['./client-code-age-group-show-crm.component.scss']
})
export class ClientCodeAgeGroupShowCRMComponent implements OnInit {

  loading: boolean;
  form: FormGroup;
  submitBtn: boolean;
  showPage:boolean;
  showPageReadOnly:boolean;
  constructor(
    private route: ActivatedRoute,
    public setS: SetupService,
    private fb: FormBuilder,
    private utilityService:UtilityService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      authBy: configForms.default(''),
      authOn: configForms.default(''),
      code: configForms.default(''),
      description: configForms.required(''),
      ageFrom: new FormControl(null,[Validators.required,Validators.min(1),Validators.max(120)]),
      ageTo: new FormControl(null,[Validators.required,Validators.max(120)]),
    });

    this.prefillShowForm();
  }



  prefillShowForm() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      let ageGroup = queryMap.get('ageGroup');
      ageGroup == null ? (this.loading = false) : (this.loading = true);
      if(ageGroup == null || undefined){
        this.showPage = false;
      }else{
        this.setS.showAgeGroup(ageGroup).subscribe((res:any) => {
          this.loading = false;
          console.log("SHOW AGE GROUP"+JSON.stringify(res));
          this.form.patchValue({
            code: res?.code,
            description: res?.description,
            ageFrom: res?.ageFrom,
            ageTo: res?.ageTo,
          });
          this.form.disable();
          this.showPage= true;

        });
      }

    });
  }


  onSubmit() {
    this.submit();
  }

  private async submit() {
    this.loading = true;
    let values = this.form.value as IAgeGroup;
    // values.active = true;
    // values.authBy = "Roland";
    // values.authOn = "2022-04-06T12:32:46.056Z";
    console.log(values);
    this.setS.submitAgeGroup(values).then((res) => {
      this.loading = false
        console.log("RESULT"+ JSON.stringify(res));
        if (res !== null) {
          this.utilityService.info('Succesfully Created',1);
        } else {
          this.utilityService.info('Succesfully Created',0);
        }
      }).catch((error) => {
        this.loading = false
        this.utilityService.info(error?.error?.message,0);
      });
  }




}
