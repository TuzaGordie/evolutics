import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAssetIndexRoutingModule } from './create-asset-index-routing.module';
import { CreateAssetIndexComponent } from './create-asset-index.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [CreateAssetIndexComponent],
  imports: [CommonModule, CreateAssetIndexRoutingModule, SharedModule],
})
export class CreateAssetIndexModule {}
