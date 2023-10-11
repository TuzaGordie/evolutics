import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from './../../../../../Shared/models/form.class';
import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class LifecycleCreateComponent implements OnInit {

  clientLifeCycleForm:FormGroup;
  constructor(public findClientsService : FindClientsService, public fb:FormBuilder,private uS:UtilityService) { }

  ngOnInit(): void {
    this.createLifeCycleForm()


  }

  createLifeCycleForm(){
    this.clientLifeCycleForm = new FormGroup({
      clientLifeCycle: configForms.default(),
      description: configForms.required(),
      lowerDurationBound: configForms.required(),
      higherDurationBound: configForms.required(),
    })
  }


  async submitClient() {
    let data = {
        description: this.clientLifeCycleForm.controls['description'].value,
        clientLifeCycle: this.clientLifeCycleForm.controls['clientLifeCycle'].value,
        lowerDurationBound: this.clientLifeCycleForm.controls['lowerDurationBound'].value,
        higherDurationBound: this.clientLifeCycleForm.controls['higherDurationBound'].value
    };

    this.findClientsService.submitLifeCycle(data).then((res) => {
        console.log("RESPONSE BODY FOR LIFE CYCLE SEGMENT"+ JSON.stringify(res));
        if (res !== null) {
          this.uS.info(res.clientLifeCycle, 1);
        } else {
          this.uS.info("Submission Failed", 0);
        }
      },
      (err) => {
        this.uS.info('An Error Occured'+ JSON.stringify(err), 0);
      }
    );

}
}
