import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateFeedRoutingModule } from './create-feed-routing.module';
import { CreateFeedComponent } from './create-feed.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CorrespondenceCompsModule } from '../../correspondence-comps/correspondence-comps.module';


@NgModule({
  declarations: [
    CreateFeedComponent
  ],
  imports: [
    CommonModule,
    CreateFeedRoutingModule,SharedModule,CorrespondenceCompsModule
  ]
})
export class CreateFeedModule { }
