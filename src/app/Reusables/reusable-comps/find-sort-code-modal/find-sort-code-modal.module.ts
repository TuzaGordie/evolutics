import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindSortCodeModalComponent } from './find-sort-code-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FindSortCodeFormComponent } from './find-sort-code-form/find-sort-code-form.component';

@NgModule({
  declarations: [FindSortCodeModalComponent, FindSortCodeFormComponent],
  imports: [CommonModule, SharedModule],
  exports: [FindSortCodeModalComponent,  FindSortCodeFormComponent],
})
export class FindSortCodeModalModule {}
