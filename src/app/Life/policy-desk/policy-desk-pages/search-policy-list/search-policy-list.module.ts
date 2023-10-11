import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchPolicyListRoutingModule } from './search-policy-list-routing.module';
import { SearchPolicyListComponent } from './search-policy-list.component';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { TableHttpsModule } from 'src/app/Shared/components/table-https/table-https.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [SearchPolicyListComponent],
  imports: [
    CommonModule,
    RouterModule,
    SearchPolicyListRoutingModule,
    TableHttpsModule,
    TablePlainModule,
    SharedModule
  ],
})
export class SearchPolicyListModule {}
