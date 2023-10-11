import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { EPageType } from 'src/app/Shared/models/index.model';

const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.general.report.index._,
    pathMatch: 'full',
  },  {
    path: 'batch',
    loadChildren: () =>
      import(
        '../../Life/Report/report-pages/life-report-batch/life-report-batch.module'
      ).then((m) => m.LifeReportBatchModule),
    data: { title: 'Run Batch' },
  },
  {
    path: appRoutes.general.report.index._,
    loadChildren: () =>
      import(
        'src/app/Life/Report/report-pages/life-report-index/life-report-index.module'
      ).then((m) => m.LifeReportIndexModule),
    data: { title: 'Index' },
  },
  {
    path: 'create',
    loadChildren: () =>
      import(
        'src/app/Life/Report/report-pages/life-report-create/life-report-create.module'
      ).then((m) => m.LifeReportCreateModule),
    data: { title: 'Create', type: EPageType.createPage },
  },
  {
    path: 'show',
    loadChildren: () =>
      import(
        'src/app/Life/Report/report-pages/life-report-create/life-report-create.module'
      ).then((m) => m.LifeReportCreateModule),
    data: { title: 'Show', type: EPageType.showPage },
  },
  {
    path: 'edit',
    loadChildren: () =>
      import(
        'src/app/Life/Report/report-pages/life-report-create/life-report-create.module'
      ).then((m) => m.LifeReportCreateModule),
    data: { title: 'Load', type: EPageType.editPage },
  },
  {
    path: 'clone',
    loadChildren: () =>
      import(
        'src/app/Life/Report/report-pages/life-report-create/life-report-create.module'
      ).then((m) => m.LifeReportCreateModule),
    data: { title: 'Clone', type: EPageType.clonePage },
  },
  {
    path: 'visualize',
    loadChildren: () =>
      import(
        'src/app/Life/Report/report-pages/visualize-report/visualize-report.module'
      ).then((m) => m.VisualizeReportModule),
    data: { title: 'Visualize' },
  },
];

routes
  .filter((x) => x.data?.title)
  .forEach((x) => (x.data.title = 'Reports / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportDeskRoutingModule {}
