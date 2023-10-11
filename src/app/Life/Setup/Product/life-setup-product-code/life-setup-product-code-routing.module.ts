import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageType } from 'src/app/Shared/models/index.model';
import { IndexProductCodeComponent } from './index-product-code/index-product-code.component';
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: IndexProductCodeComponent,
    data: { title: 'Set Up / Products' },
  },
  {
    path: 'show',
    data: { title: 'Set Up / View Product', type: EPageType.showPage,checkParam:'prodCode' },
    loadChildren: () =>
      import('./a-e-v-product-code/a-e-v-product-code.module').then(
        (m) => m.AEVProductCodeModule
      ),
  },
  {
    path: 'create',
    data: { title: 'Set Up / Create Product', type: EPageType.createPage },
    loadChildren: () =>
      import('./a-e-v-product-code/a-e-v-product-code.module').then(
        (m) => m.AEVProductCodeModule
      ),
  },
  {
    path: 'edit',
    data: { title: 'Set Up / Edit Product', type: EPageType.editPage ,checkParam:'prodCode' },
    loadChildren: () =>
      import('./a-e-v-product-code/a-e-v-product-code.module').then(
        (m) => m.AEVProductCodeModule
      ),
  },
  {
    path: 'clone',
    data: { title: 'Set Up / Clone Product', type: EPageType.clonePage ,checkParam:'prodCode' },
    loadChildren: () =>
      import('./a-e-v-product-code/a-e-v-product-code.module').then(
        (m) => m.AEVProductCodeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifeSetupProductCodeRoutingModule {}
