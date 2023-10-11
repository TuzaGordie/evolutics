import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AccountsRoutingModule } from './account-routing.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule,
    ComponentsModule,
    ChartsModule,
    MatDialogModule,
  ],
})
export class AccountsModule {}
