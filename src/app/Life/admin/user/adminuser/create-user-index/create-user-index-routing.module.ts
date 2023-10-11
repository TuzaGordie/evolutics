import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserIndexComponent } from './create-user-index.component';

const routes: Routes = [{ path: '', component: CreateUserIndexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUserIndexRoutingModule { }
