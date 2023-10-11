import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexProcessDesignControlComponent } from './index-control/index-control.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [IndexProcessDesignControlComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        data: { title: 'Set Up / Process Design / Control' },
        component: IndexProcessDesignControlComponent,
      },
    ]),
  ],
})
export class ControlModule {}
