import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedComponent } from './create-feed.component';

const routes: Routes = [{ path: '', component: CreateFeedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateFeedRoutingModule { }
