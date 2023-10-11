import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerRoutingModule } from './logger-routing.module';
import { LoggerComponent } from './logger.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [LoggerComponent],
  imports: [CommonModule, LoggerRoutingModule, SharedModule, ClipboardModule],
})
export class LoggerModule {}
