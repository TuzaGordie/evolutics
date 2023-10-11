import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndorsementListComponent } from './endorsement-list.component';

const routes: Routes = [{ path: '', component: EndorsementListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndorsementListRoutingModule { }
