import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAssetModalComponent } from './add-asset-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    AddAssetModalComponent
  ],
  imports: [
    CommonModule,SharedModule
  ]
})
export class AddAssetModalModule { }
