import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceFieldsTabComponent } from './fields-tab/fields-tab.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { TemplatesToAttachToEmailComponent } from './templates-to-attach-to-email/templates-to-attach-to-email.component';



@NgModule({
  declarations: [
    CorrespondenceFieldsTabComponent,
    TemplatesToAttachToEmailComponent
  ],
  exports: [
    CorrespondenceFieldsTabComponent,
    TemplatesToAttachToEmailComponent
  ],
  imports: [
    CommonModule,SharedModule
  ]
})
export class CorrespondenceCompsModule { }
