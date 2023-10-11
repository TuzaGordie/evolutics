import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IVehicleBrand } from '../vehicle-extras/vehicle.model';
import { EPageType } from 'src/app/Shared/models/index.model';
import { configForms } from 'src/app/Shared/models/form.class';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleExtrasService } from '../vehicle-extras/vehicle-extras.service';
import { VehicleService } from '../vehicle-extras/vehicle.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss'],
})
export class CreateBrandComponent implements OnInit {
  loading: boolean;
  vehicleBrandFormData: any;
  form: FormGroup;
  type: EPageType;
  matchingbrand: any;
  submitBtn: boolean;
  constructor(
    public vS: VehicleService,
    public veS: VehicleExtrasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      code: configForms.required(),
      description: configForms.required(),
      VehicleType: configForms.default(),
    });
    this.prefillShowForm();
  }

  onSubmit() {
    this.submit();
  }

  prefillShowForm() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      queryMap.get('brandCode') == null
        ? (this.loading = false)
        : (this.loading = true);
      if (queryMap.has('brandCode')) {
        let bc = queryMap.get('brandCode');
        let clone = queryMap.get('redirect');
        if (bc != null && (clone !== undefined || null)) {
          this.veS.getVehicleBrand().subscribe(async (res) => {
            this.loading = false;
            let result = this.vS.findMatchingValue(res, { code: bc });
            this.form.patchValue({
              code: result[0]?.code,
              description: result[0]?.description,
            });
          });
        }
        if (clone !== null) {
          if (clone.toLowerCase() === 'show') {
            this.form.disable();
            this.submitBtn = true;
            console.log(this.form);
          }
        }
      }
    });
  }

  private async submit() {
    this.loading = true;
    let values = this.form.value as IVehicleBrand;
    values.brandCode = this.vehicleBrandFormData?.code;
    this.veS.getVehicleBrand().subscribe(async (res) => {
      this.loading = false;
      if (res.find((x) => x.code == this.vehicleBrandFormData?.code))
        this.vS.info('Brand Code Already Exists', 0);
      if (
        res.find((x) => x.description == this.vehicleBrandFormData?.description)
      )
        this.vS.info('Brand Name Already Exists', 0);
      else
        try {
          this.vehicleBrandFormData = await (this.vehicleBrandFormData?.code
            ? this.veS.modifyVehicleBrand(
                values,
                this.vehicleBrandFormData.brandCode
              )
            : this.veS.submitVehicleBrand(values));
          console.log('post Vehicle form', this.vehicleBrandFormData);
          this.vS.info('Vehicle Brand was successfully created.', 1);
        } catch (e) {
          this.vS.info('An error occurred', 0);
          console.log(e);
          this.loading = false;
        }
    });
  }
}
