import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsermenuComponent } from './create-usermenu.component';

const routes: Routes = [{ path: '', component: CreateUsermenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUsermenuRoutingModule { }
