import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizeReportComponent } from './visualize-report.component';

const routes: Routes = [{ path: '', component: VisualizeReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizeReportRoutingModule { }
