import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { VehicleExtrasService } from '../vehicle-extras/vehicle-extras.service';
import { VehicleService } from '../vehicle-extras/vehicle.service';

@Component({
  selector: 'app-gbsetup-code-vehicle-model-index',
  templateUrl: './gbsetup-code-vehicle-model-index.component.html',
  styleUrls: ['./gbsetup-code-vehicle-model-index.component.scss']
})
export class GBSetupCodeVehicleModelIndexComponent implements OnInit {
  form = new FormGroup({
    vehicleBrand: configForms.required(),
    vehicleMake: configForms.required(),
    vehicleModel: configForms.required(),
  });

  constructor(
    public ves: VehicleExtrasService,
    public vS: VehicleService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {}

  async clone( ) { 
    await this.router.navigate(['../vehicle-model-create'],{ relativeTo : this.route,
      queryParams: { redirect: 'show',vehicleModel:this.form.value.vehicleModel}
    });
}


  async show( ) { 
    await this.router.navigate(['../vehicle-model-create'], { relativeTo : this.route,
      queryParams: { redirect: 'show',vehicleModel:this.form.value.vehicleModel}
    });
  }

}
