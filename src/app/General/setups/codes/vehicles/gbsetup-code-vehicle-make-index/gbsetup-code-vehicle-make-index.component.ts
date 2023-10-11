import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { VehicleExtrasService } from '../vehicle-extras/vehicle-extras.service';
import { VehicleService } from '../vehicle-extras/vehicle.service';

@Component({
  selector: 'app-gbsetup-code-vehicle-make-index',
  templateUrl: './gbsetup-code-vehicle-make-index.component.html',
  styleUrls: ['./gbsetup-code-vehicle-make-index.component.scss'],
})
export class GBSetupCodeVehicleMakeIndexComponent implements OnInit {
  form = new FormGroup({
    brandCode: configForms.required(),
    makeCode: configForms.required(),
  });
  constructor(
    public ves: VehicleExtrasService,
    public vS: VehicleService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  clone() {
    this.router.navigate(['../vehicle-make-create'], {
      queryParams: { redirect: 'clone', ...this.form.value },
      relativeTo: this.route,
    });
  }

  show() {
    this.router.navigate(['../vehicle-make-create'], {
      queryParams: { redirect: 'show', ...this.form.value },
      relativeTo: this.route,
    });
  }
}
