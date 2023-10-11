import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaModalComponent } from './text-area-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { TextAreaModalService } from './text-area-modal.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TextAreaModalComponent],
  imports: [CommonModule, SharedModule,MatDialogModule],
  providers: [TextAreaModalService],
})
export class TextAreaModalModule {}
