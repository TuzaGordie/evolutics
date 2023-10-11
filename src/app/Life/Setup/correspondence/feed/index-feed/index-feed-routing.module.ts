import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexFeedComponent } from './index-feed.component';

const routes: Routes = [{ path: '', component: IndexFeedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexFeedRoutingModule { }
