import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportTableComponent } from './report-table.component';

const routes: Routes = [{ path: '', component: ReportTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTableRoutingModule { }
