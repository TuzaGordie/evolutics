import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageType } from 'src/app/Shared/models/index.model'; 
// import { ShortTermRatesComponent } from './short-term-rates.component';

const routes: Routes = [
  // { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: '',
    data: { title: 'Set Up /  Rates / Short Term Rate' },
    loadChildren: () =>
      import(
        './short-term-rates-pages/index-short-term-rates/index-short-term-rates.module'
      ).then((m) => m.IndexShortTermRatesModule),
  },
  {
    path: 'create',
    data: {
      title: 'Set Up / Rates / Short Term Rate',
      type: EPageType.createPage,
    },
    loadChildren: () =>
      import(
        './short-term-rates-pages/create-short-term-rates/create-short-term-rates.module'
      ).then((m) => m.CreateShortTermRatesModule),
  },
  {
    path: 'show/:id',
    data: {
      title: 'Set Up / Rates / Show Short Term Rate',
      type: EPageType.showPage,
    },
    loadChildren: () =>
      import(
        './short-term-rates-pages/create-short-term-rates/create-short-term-rates.module'
      ).then((m) => m.CreateShortTermRatesModule),
  },
  {
    path: 'edit/:id',
    data: {
      title: 'Set Up / Rates / Edit Short Term Rate',
      type: EPageType.editPage,
    },
    loadChildren: () =>
      import(
        './short-term-rates-pages/create-short-term-rates/create-short-term-rates.module'
      ).then((m) => m.CreateShortTermRatesModule),
  },
  {
    path: 'clone/:id',
    data: {
      title: 'Set Up / Rates / Clone Short Term Rate',
      type: EPageType.clonePage,
    },
    loadChildren: () =>
      import(
        './short-term-rates-pages/create-short-term-rates/create-short-term-rates.module'
      ).then((m) => m.CreateShortTermRatesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShortTermRatesRoutingModule {}
