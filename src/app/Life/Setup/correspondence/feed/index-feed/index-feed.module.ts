import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexFeedRoutingModule } from './index-feed-routing.module';
import { IndexFeedComponent } from './index-feed.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    IndexFeedComponent
  ],
  imports: [
    CommonModule,
    IndexFeedRoutingModule,SharedModule
  ]
})
export class IndexFeedModule { }
