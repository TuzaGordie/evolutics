import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GBSetupCodeVehicleBrandIndexComponent } from './gbsetup-code-vehicle-brand-index/gbsetup-code-vehicle-brand-index.component';
import { GBSetupCodeVehicleCertCreateComponent } from './gbsetup-code-vehicle-cert-create/gbsetup-code-vehicle-cert-create.component';
import { GBSetupCodeVehicleCertIndexComponent } from './gbsetup-code-vehicle-cert-index/gbsetup-code-vehicle-cert-index.component';
import { GBSetupCodeVehicleMakeCreateComponent } from './gbsetup-code-vehicle-make-create/gbsetup-code-vehicle-make-create.component';
import { GBSetupCodeVehicleMakeIndexComponent } from './gbsetup-code-vehicle-make-index/gbsetup-code-vehicle-make-index.component';
import { GBSetupCodeVehicleModelCreateComponent } from './gbsetup-code-vehicle-model-create/gbsetup-code-vehicle-model-create.component';
import { GBSetupCodeVehicleModelIndexComponent } from './gbsetup-code-vehicle-model-index/gbsetup-code-vehicle-model-index.component';
import { VehiclesRoutingModule } from './vehicles-routing.module'; 
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [  
    GBSetupCodeVehicleBrandIndexComponent,
    GBSetupCodeVehicleCertCreateComponent,
    GBSetupCodeVehicleCertIndexComponent,
    GBSetupCodeVehicleMakeCreateComponent,
    GBSetupCodeVehicleMakeIndexComponent,
    GBSetupCodeVehicleModelCreateComponent,
    GBSetupCodeVehicleModelIndexComponent,
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule,
    ComponentsModule,
    ChartsModule,
  ],
})
export class VehiclesModule {}
