import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config'; 

const routes: Routes = [
     { path: 'accounts', loadChildren: () => import('src/app/Life/Setup/Account/account.module').then((m) => m.AccountsModule) },
      { path: 'address', loadChildren: () => import('src/app/Life/Setup/Address/address.module').then((m) => m.AddressModule) },
      { path: 'agents', loadChildren: () => import('src/app/Life/Setup/Agents/agents.module').then((m) => m.AgentsModule) },
      { path: 'code', loadChildren: () => import('src/app/Life/Setup/code/code.module').then((m) => m.CodeModule) },
      { path: 'code', loadChildren: () => import('./codes/vehicles/vehicles.module').then((m) => m.VehiclesModule) },
      { path: 'correspondence', loadChildren: () => import('src/app/Life/Setup/correspondence/correspondence.module').then((m) => m.CorrespondenceModule) },
      { path: 'organization', loadChildren: () => import('src/app/Life/Setup/organization/organization.module').then((m) => m.OrganizationModule) },
      { path: 'process-design', loadChildren: () => import('src/app/Life/Setup/process-design/process-design.module').then((m) => m.ProcessDesignModule) },
      { path: 'product', loadChildren: () => import('src/app/Life/Setup/Product/product.module').then((m) => m.ProductModule) },
      { path: 'reinsurance', loadChildren: () => import('src/app/Life/Setup/Reinsurance/reinsurance.module').then((m) => m.ReinsuranceModule) },
      { path: 'tariff', loadChildren: () => import('src/app/Life/Setup/tariffs/tariffs.module').then((m) => m.TariffsModule) },
      { path: 'task-setup', loadChildren: () => import('src/app/Life/Setup/task-setup/task-setup.module').then((m) => m.TaskSetupModule) },
      { path: 'translations', loadChildren: () => import('src/app/Life/Setup/translation/translation.module').then((m) => m.TranslationModule) },
      { path: appRoutes.general.setup.rates._, loadChildren: () => import('src/app/Life/Setup/Rates/rates.module').then((m) => m.RatesModule) },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SetupsRoutingModule {}
