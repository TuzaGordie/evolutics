import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const lifeSetupProductRoutes: Routes = [
  {
    path: 'product-code',
    loadChildren: () =>
      import(
        '../../../Life/Setup/Product/life-setup-product-code/life-setup-product-code.module'
      ).then((m) => m.LifeSetupProductCodeModule),
  },
  {
    path: 'product-cover-code',
    loadChildren: () =>
      import(
        '../../../Life/Setup/Product/life-setup-product-cover-code/life-setup-product-cover-code.module'
      ).then((m) => m.LifeSetupProductCoverCodeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(lifeSetupProductRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
