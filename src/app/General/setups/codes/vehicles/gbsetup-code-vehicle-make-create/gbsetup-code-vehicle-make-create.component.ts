import { Form, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { configForms, configPatterns } from 'src/app/Shared/models/form.class';
import { EPageType } from 'src/app/Shared/models/index.model';
import { IVehicleMake } from '../vehicle-extras/vehicle.model';
import { ActivatedRoute } from '@angular/router';
import { values } from 'lodash-es';
import { VehicleExtrasService } from '../vehicle-extras/vehicle-extras.service';
import { VehicleService } from '../vehicle-extras/vehicle.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-gbsetup-code-vehicle-make-create',
  templateUrl: './gbsetup-code-vehicle-make-create.component.html',
  styleUrls: ['./gbsetup-code-vehicle-make-create.component.scss'],
})
export class GBSetupCodeVehicleMakeCreateComponent implements OnInit {
  form: FormGroup;
  type: EPageType;
  loading: boolean;
  vehicleMakeFormData: any;
  submitBtn: boolean;
  constructor(
    public vS: VehicleService,
    public veS: VehicleExtrasService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      makeCode: configForms.number(),
      description: configForms.required(),
      brandCode: configForms.number()
    });

    this.prefillForm();
  }

  onSubmit() {
    this.submit();
  }

  prefillForm(){
    this.route.queryParamMap.subscribe(async(queryMap)=>{
      if(queryMap.has('redirect') && (queryMap.get('redirect') === 'show' ||  queryMap.get('redirect')=== 'clone')){
      if (queryMap.get('redirect') ===  'show'){ this.form.disable(); this.submitBtn = true;this.loading = true } else{};
      if (queryMap.get('redirect') ===  'clone'){this.loading = true} else{};
      const vehiclebrandCode:string = queryMap.get('brandCode');
      const vehicleMakeCode:string = queryMap.get('makeCode');
       this.veS.getVehicleMake(vehiclebrandCode).subscribe((res)=>{
         this.loading = false;
        let result = this.vS.findMatchingValue(res,{code:vehicleMakeCode})
        console.log("RESULT "+JSON.stringify(result));
        this.vehicleMakeFormData =  res;
        this.form.patchValue({
          makeCode: result[0]?.code,
          description: result[0]?.description,
          brandCode: vehiclebrandCode
        })
       })
      }
    });
  }

  private async submit() {
    console.log("FORM VALUE "+ JSON.stringify(this.form.value));

    this.loading = true;
    const addVehicleMake: IVehicleMake = {};
    addVehicleMake.brandCode = this.form.value.code;
    addVehicleMake.description = this.form.value.description;
    addVehicleMake.makeCode = this.form.value.makeCode;


    try {
      this.vehicleMakeFormData = await (this.vehicleMakeFormData?.code
        ? this.veS.modifyVehicleMake(addVehicleMake,this.vehicleMakeFormData.brandCode)
        : this.veS.submitVehicleMake(addVehicleMake));
      console.log('post Vehicle form', this.vehicleMakeFormData);
      this.loading = false;
      this.vS.notify('Successfully Submitted', 1);
    } catch (e) {
      this.vS.notify('An error occurred', 0);
      console.log(e);
      this.loading = false;
      this.form.reset();
    }
  }
}
