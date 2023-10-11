import { configForms } from './../../../../../Shared/models/form.class';
import { UtilityService } from './../../../../../Services/utility.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICreateLeadClassification } from '../extras/setup.model';
import { SetupService } from '../extras/setup.service';
import { config } from 'process';

@Component({
  selector: 'app-lead-classification-crm',
  templateUrl: './lead-classification-crm.component.html',
  styleUrls: ['./lead-classification-crm.component.scss'],
})
export class LeadClassificationCRMComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  destStatus: string[] = [''];
  submitBtn: boolean;
  destinationStatus: FormArray;
  showmode = true;
  constructor(
    private route: ActivatedRoute,
    public setS: SetupService,
    private fb: FormBuilder,
    private utilityService:UtilityService
  ) {}

  ngOnInit(): void {


      this.destinationStatus = this.fb.array([
        new FormGroup ({
          destinationStatus: configForms.default(null)
        })
    ])



    this.addDestinationStatus();

    this.form = this.fb.group({
      company: configForms.default(),
      leadStatusCode: configForms.default(),
      processNode: configForms.default(),
      description: configForms.default(),
      destinationStatus: this.destinationStatus
    });
    this.prefillShowForm();
  }

  prefillShowForm() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      let leadStatusCode = queryMap.get('leadStatusCode');
      if (leadStatusCode == null) {
        this.loading = false
        }else{
          this.loading = true;
          this.showmode = false;
          this.setS.getLeadClassificationDetails(leadStatusCode).subscribe((res:any) => {
            console.log("Result from details"+ JSON.stringify(res));
            this.loading = false
            this.form.patchValue({
              company: res?.statusCode?.companyCode,
              leadStatusCode: res?.statusCode?.code,
              processNode: ""+res?.statusCode?.processNode,
              description: res?.statusCode?.description
            })
            res.statusCodeDestinationList?.forEach((x) => {
              this.addDestinationStatus(x);
            });
            this.form.disable();
          });
        }
    });

  }

  addDestinationStatus(output?: any,index: number = this.destinationStatus?.length || 0) {
    const b = new FormGroup({
      destinationStatus: configForms.default(),
    });
    // this.destStatus.push('');
    this.destinationStatus.push(b);
    if (output) {
      console.log("destination Status"+ output.destStatus);
      b.patchValue({
        destinationStatus: output.destStatus
      });
    }
  }

  removeDestinationStatus(i) {
    this.destinationStatus.removeAt(i);
    this.destStatus.splice(i, 1);
  }

  onSubmit() {
    this.submit();
  }

  private async submit() {
    this.loading = true;
    let values:any = this.form.value as ICreateLeadClassification;
    console.log("LEAD CALSSIFICATION VALUES"+JSON.stringify(values));
    this.setS.submitNewLeadClassification(values).then((res) => {
        console.log("result from lead"+JSON.stringify(res));
        if (res !== null) {
          this.utilityService.info('Succesfully Created',1);
        } else {
          this.utilityService.info('Could not create',0);
        }
      }).catch((error) => {
        this.utilityService.info('An Error Occurred',0);
      });
  }
}

