import { IVehicleModel } from './../vehicle-extras/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { EPageType } from 'src/app/Shared/models/index.model';
import { VehicleExtrasService } from '../vehicle-extras/vehicle-extras.service';
import { VehicleService } from '../vehicle-extras/vehicle.service';

@Component({
  selector: 'app-gbsetup-code-vehicle-model-create',
  templateUrl: './gbsetup-code-vehicle-model-create.component.html',
  styleUrls: ['./gbsetup-code-vehicle-model-create.component.scss']
})
export class GBSetupCodeVehicleModelCreateComponent implements OnInit {
  form: FormGroup;
  type: EPageType;
  loading: boolean;
  vehicleModelFormData: any;
  submitBtn: boolean;
  constructor(
    public vS: VehicleService,
    public veS: VehicleExtrasService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      modelCode: configForms.required(),
      modelName: configForms.required(),
      vehicleBrand: configForms.required(),
      vehicleMake: configForms.required(),
      modelStartYear: configForms.required(),
      modelEndYear: configForms.required()
    });

    this.prefillForm();
  }

  onSubmit() {
    this.submit();
  }

  //   {
//     "vehiclebrand":{"description":"Aro","code":"7"},
//   "vehicleMake":{"description":"10","code":"56"},
//   "vehicleModel":{"description":"SUV 3-doors 1.4 MT (58 hp)","code":"15797"}
// }

  prefillForm(){
    this.route.queryParamMap.subscribe(async(queryMap)=>{
      if(queryMap.has('redirect') && (queryMap.get('redirect') === 'show' ||  queryMap.get('redirect')=== 'clone')){
      if (queryMap.get('redirect') ===  'show'){ this.form.disable(); this.submitBtn = true;this.loading = true } else{};
      if (queryMap.get('redirect') ===  'clone'){this.loading = true} else{};
      const vehicleModel:any = queryMap.get('vehicleModel');
      console.log("vehicleModel "+vehicleModel);
       this.veS.getVehicleModelByModelCode(vehicleModel).subscribe((res:any)=>{
        this.loading = false;
        console.log("result from finding matching value"+res);
        this.form.patchValue({
          modelCode: res?.code,
          modelName: res?.description,
          vehicleBrand: res?.brandCode,
          vehicleMake: res?.makeCode,
          modelStartYear:(!res?.startProduct) ? '' : res?.startProduct,
          modelEndYear:(!res?.endProduct) ? '' : res?.endProduct
        })
       })
      }
    });
  }

  private async submit() {
    console.log("FORM VALUE "+ JSON.stringify(this.form.value));

    this.loading = true;
    const addVehicleModel: IVehicleModel = {};
    addVehicleModel.brandCode = this.form?.value?.code;
    addVehicleModel.description = this.form?.value?.description;
    addVehicleModel.makeCode = this.form?.value?.makeCode;
    addVehicleModel.endProduct = this.form?.value?.modelStartYear;
    addVehicleModel.startProduct = this.form?.value?.modelEndYear;
    addVehicleModel.vehicleCat = '';
    addVehicleModel.vehicleGenre = '';

    try {
      this.vehicleModelFormData = await (this.vehicleModelFormData?.code
        ? this.veS.modifyVehicleMake(addVehicleModel,this.vehicleModelFormData.brandCode)
        : this.veS.submitVehicleMake(addVehicleModel));
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
