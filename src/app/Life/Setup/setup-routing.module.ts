import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';

export const lifeSetupRoutes: Routes = [
  {
    path: 'accounts',
    loadChildren: () =>
      import('./Account/account.module').then((m) => m.AccountsModule),
  },
  {
    path: 'address',
    loadChildren: () =>
      import('./Address/address.module').then((m) => m.AddressModule),
  },
  {
    path: 'agents',
    loadChildren: () =>
      import('./Agents/agents.module').then((m) => m.AgentsModule),
  },
  {
    path: 'code',
    loadChildren: () => import('./code/code.module').then((m) => m.CodeModule),
  },
  {
    path: 'correspondence',
    loadChildren: () =>
      import('./correspondence/correspondence.module').then(
        (m) => m.CorrespondenceModule
      ),
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('./organization/organization.module').then(
        (m) => m.OrganizationModule
      ),
  },
  {
    path: 'process-design',
    loadChildren: () =>
      import('./process-design/process-design.module').then(
        (m) => m.ProcessDesignModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./Product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'reinsurance',
    loadChildren: () =>
      import('./Reinsurance/reinsurance.module').then(
        (m) => m.ReinsuranceModule
      ),
  },
  {
    path: 'tariff',
    loadChildren: () =>
      import('./tariffs/tariffs.module').then((m) => m.TariffsModule),
  },
  {
    path: 'task-setup',
    loadChildren: () =>
      import('./task-setup/task-setup.module').then((m) => m.TaskSetupModule),
  },
  {
    path: 'translations',
    loadChildren: () =>
      import('./translation/translation.module').then(
        (m) => m.TranslationModule
      ),
  },
  {
    path: appRoutes.life.setup.rates._,
    loadChildren: () =>
      import('./Rates/rates.module').then((m) => m.RatesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(lifeSetupRoutes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
