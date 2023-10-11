import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  lifeSetupPDRoutes,
  ProcessDesignRoutingModule,
} from './process-design-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UnderwritingRequirementsIndexComponent } from './Underwriting/underwriting-requirements-index/underwriting-requirements-index.component';
import { UnderwritingRequirementsCreateComponent } from './Underwriting/underwriting-requirements-create/underwriting-requirements-create.component';
import { UnderwritingTableIndexComponent } from './Underwriting/underwriting-table-index/underwriting-table-index.component';
import { UnderwritingTableCreateComponent } from './Underwriting/underwriting-table-create/underwriting-table-create.component';
import { UnderwritingQuestionsIndexComponent } from './Underwriting/underwriting-questions-index/underwriting-questions-index.component';
import { UnderwritingQuestionsCreateComponent } from './Underwriting/underwriting-questions-create/underwriting-questions-create.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UnderwritingLoadingsIndexComponent } from './Underwriting/underwriting-loadings-index/underwriting-loadings-index.component';
import { UnderwritingLoadingsCreateComponent } from './Underwriting/underwriting-loadings-create/underwriting-loadings-create.component';

@NgModule({
  declarations: [
    UnderwritingRequirementsIndexComponent,
    UnderwritingRequirementsCreateComponent,
    UnderwritingTableIndexComponent,
    UnderwritingTableCreateComponent,
    UnderwritingQuestionsIndexComponent,
    UnderwritingQuestionsCreateComponent,
    UnderwritingLoadingsIndexComponent,
    UnderwritingLoadingsCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    ProcessDesignRoutingModule,
    MatAutocompleteModule,
  ],
})
export class ProcessDesignModule {}
