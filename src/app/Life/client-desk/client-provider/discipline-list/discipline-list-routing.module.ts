import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineListComponent } from './discipline-list.component';

const routes: Routes = [{ path: '', component: DisciplineListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplineListRoutingModule { }
