import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageType } from 'src/app/Shared/models/index.model';

const routes: Routes = [
  // { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: '',
    data: { title: 'Set Up / General Rates' },
    loadChildren: () =>
      import(
        './general-rates-pages/index-general-rates/index-general-rates.module'
      ).then((m) => m.IndexGeneralRatesModule),
  },
  {
    path: 'show',
    loadChildren: () =>
      import(
        './general-rates-pages/create-general-rates/create-general-rates.module'
      ).then((m) => m.CreateGeneralRatesModule),
    data: { title: 'Set Up / Show General Rates', type: EPageType.showPage },
  },
  {
    path: 'edit',
    loadChildren: () =>
      import(
        './general-rates-pages/create-general-rates/create-general-rates.module'
      ).then((m) => m.CreateGeneralRatesModule),
    data: { title: 'Set Up / Show General Rates', type: EPageType.editPage },
  },
  {
    path: 'clone',
    loadChildren: () =>
      import(
        './general-rates-pages/create-general-rates/create-general-rates.module'
      ).then((m) => m.CreateGeneralRatesModule),
    data: { title: 'Set Up / Clone General Rates', type: EPageType.clonePage },
  },
  {
    path: 'create',
    loadChildren: () =>
      import(
        './general-rates-pages/create-general-rates/create-general-rates.module'
      ).then((m) => m.CreateGeneralRatesModule),
    data: { title: 'Set Up / General Rates', type: EPageType.createPage },
  }, 
  // {
  //   path: 'start',
  //   data: { title: 'Set Up / General Rates' },
  //   loadChildren: () =>
  //     import(
  //       './general-rates-pages/start-general-rates/start-general-rates.module'
  //     ).then((m) => m.StartGeneralRatesModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRatesRoutingModule {}
