import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageComponent } from './upload-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { NgxImageCompressService } from 'ngx-image-compress';

@NgModule({
  declarations: [UploadImageComponent],
  exports: [UploadImageComponent],
  // providers: [NgxImageCompressService],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class UploadImageModule {}
