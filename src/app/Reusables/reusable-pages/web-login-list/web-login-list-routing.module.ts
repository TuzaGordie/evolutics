import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLoginListComponent } from './web-login-list.component';

const routes: Routes = [{ path: '', component: WebLoginListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLoginListRoutingModule { }
