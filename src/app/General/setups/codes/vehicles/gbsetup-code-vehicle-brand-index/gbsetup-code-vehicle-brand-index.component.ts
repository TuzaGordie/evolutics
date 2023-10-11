import { IVehicleBrand } from '../vehicle-extras/vehicle.model';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleExtrasService } from '../vehicle-extras/vehicle-extras.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';
import { VehicleService } from '../vehicle-extras/vehicle.service';

@Component({
  selector: 'app-gbsetup-code-vehicle-brand-index',
  templateUrl: './gbsetup-code-vehicle-brand-index.component.html',
  styleUrls: ['./gbsetup-code-vehicle-brand-index.component.scss'],
})
export class GBSetupCodeVehicleBrandIndexComponent implements OnInit {
  vehicleBrandList: any[] = [];
  form = new FormGroup({
    vehicleBrand: configForms.required(),
  });
  constructor(
    public ves: VehicleExtrasService,
    public vS: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  clone(value: any) {
    this.router.navigate(['../vehicle-brand-clone'], {
      queryParams: { redirect: 'clone', brandCode: value },
      relativeTo: this.route,
    });
  }

  show(value: any) {
    this.router.navigate(['../vehicle-brand-show'], {
      queryParams: { redirect: 'show', brandCode: value },
      relativeTo: this.route,
    });
  }
}
