import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EVFunctions } from 'src/app/configs/base-functions';
import { CreateCoverCodeComponent } from './create-cover-code/create-cover-code.component';
import { IndexCoverCodeComponent } from './index-cover-code/index-cover-code.component';

const routes: Routes = EVFunctions.extendRoute(
  {
    path: '',
    component: CreateCoverCodeComponent,
    data: { title: 'Set Up / Covers' },
  },
  IndexCoverCodeComponent
);
console.log('covers routes', routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifeSetupProductCoverCodeRoutingModule {}
