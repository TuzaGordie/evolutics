import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerComponent } from './visualizer.component';
import { ChartsModule } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { LoaderModule } from '../loader/loader.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [VisualizerComponent],
  imports: [CommonModule, ChartsModule, MatTabsModule,LoaderModule,MatSidenavModule,SharedModule],
  exports: [VisualizerComponent],
})
export class VisualizerModule {}
