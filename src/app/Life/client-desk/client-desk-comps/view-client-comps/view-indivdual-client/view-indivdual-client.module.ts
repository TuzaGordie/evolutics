import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIndivdualClientComponent } from './view-indivdual-client.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { ClientDeskPipesModule } from '../../../pipes/pipes.module';
import { DirectivesModule } from 'src/app/Shared/directives/index.directive';
import { CRMSClientPipesModule } from 'src/app/CRMS/crms-pages/client-desk/pipes/c-r-m-s-client-pipes.module';

@NgModule({
  declarations: [ViewIndivdualClientComponent],
  imports: [CommonModule, SharedModule, RouterModule, ClientDeskPipesModule,DirectivesModule, CRMSClientPipesModule],
  exports: [ViewIndivdualClientComponent],
})
export class ViewIndivdualClientCompModule {}
