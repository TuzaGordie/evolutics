import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageType } from 'src/app/Shared/models/index.model';
import { GBSetupCodeVehicleBrandIndexComponent } from './gbsetup-code-vehicle-brand-index/gbsetup-code-vehicle-brand-index.component';
import { GBSetupCodeVehicleCertCreateComponent } from './gbsetup-code-vehicle-cert-create/gbsetup-code-vehicle-cert-create.component';
import { GBSetupCodeVehicleCertIndexComponent } from './gbsetup-code-vehicle-cert-index/gbsetup-code-vehicle-cert-index.component';
import { GBSetupCodeVehicleMakeCreateComponent } from './gbsetup-code-vehicle-make-create/gbsetup-code-vehicle-make-create.component';
import { GBSetupCodeVehicleMakeIndexComponent } from './gbsetup-code-vehicle-make-index/gbsetup-code-vehicle-make-index.component';
import { GBSetupCodeVehicleModelCreateComponent } from './gbsetup-code-vehicle-model-create/gbsetup-code-vehicle-model-create.component';
import { GBSetupCodeVehicleModelIndexComponent } from './gbsetup-code-vehicle-model-index/gbsetup-code-vehicle-model-index.component';

const routes: Routes = [
  {
    path: 'vehicle-brand-index',
    component: GBSetupCodeVehicleBrandIndexComponent,
    data: { title: 'Vehicle Brand' },
  },
  {
    path: 'vehicle-brand-create',
    data: {
      title: 'Create Vehicle Brand',
      type: EPageType.createPage,
    },
    loadChildren: () =>
      import(
        'src/app/General/setups/codes/vehicles/create-brand/create-brand.module'
      ).then((m) => m.CreateBrandModule),
  }, 
  {
    path: 'vehicle-brand-show', 
    data: {
      title: 'Show Vehicle Brand',
      type: EPageType.showPage,
      checkParam: 'brandCode',
    },
    loadChildren: () =>
      import(
        'src/app/General/setups/codes/vehicles/create-brand/create-brand.module'
      ).then((m) => m.CreateBrandModule),
  },
  {
    path: 'vehicle-brand-clone', 
    data: {
      title: 'Clone Vehicle Brand',
      type: EPageType.clonePage,
      checkParam: 'brandCode',
    },
    loadChildren: () =>
      import(
        'src/app/General/setups/codes/vehicles/create-brand/create-brand.module'
      ).then((m) => m.CreateBrandModule),
  },
  {
    path: 'vehicle-make-index',
    component: GBSetupCodeVehicleMakeIndexComponent,
    data: { title: 'Vehicle Make' },
  },
  {
    path: 'vehicle-make-create',
    component: GBSetupCodeVehicleMakeCreateComponent,
    data: { title: 'Vehicle Make' },
  },
  {
    path: 'vehicle-model-index',
    component: GBSetupCodeVehicleModelIndexComponent,
    data: { title: 'Vehicle Model' },
  },
  {
    path: 'vehicle-model-create',
    component: GBSetupCodeVehicleModelCreateComponent,
    data: { title: 'Vehicle Model' },
  },
  {
    path: 'vehicle-cert-index',
    component: GBSetupCodeVehicleCertIndexComponent,
    data: { title: 'Vehicle Cert' },
  },
  {
    path: 'vehicle-cert-create',
    component: GBSetupCodeVehicleCertCreateComponent,
    data: { title: 'Vehicle Cert' },
  },
];
routes
  .filter((x) => x.data?.title)
  .forEach((x) => (x.data.title = 'Set Up / Code / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
