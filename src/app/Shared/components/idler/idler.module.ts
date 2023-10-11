import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdlerComponent } from './idler.component';
import { IdlerService } from './idler.service';



@NgModule({
  declarations: [IdlerComponent],
  imports: [CommonModule],
  providers: [IdlerService],
})
export class IdlerModule {}
