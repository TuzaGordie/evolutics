import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindPolicyComponent } from './find-policy/find-policy.component';
import { PolicySearchComponent } from './policy-search/policy-search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewPolicyComponent } from './view-policy/view-policy.component';
import { EndorsementsComponent } from './policyinfo-buttons/endorsements/endorsements.component';
import { DocumentsComponent } from './policyinfo-buttons/documents/documents.component';
import { WorkflowsComponent } from './policyinfo-buttons/workflows/workflows.component';
import { WebLoginComponent } from './policyinfo-buttons/web-login/web-login.component';
import { UnderwritingEventsComponent } from './policyinfo-buttons/underwriting-events/underwriting-events.component';
import { PoliciesComponent } from './policyinfo-buttons/policies/policies.component';
import { RelationshipsComponent } from './policyinfo-buttons/relationships/relationships.component';
import { BusinessComponent } from './policyinfo-buttons/business/business.component';
import { PendingQuotesComponent } from './policyinfo-buttons/pending-quotes/pending-quotes.component';
import { PendingPaymentsComponent } from './policyinfo-buttons/pending-payments/pending-payments.component';
import { PolicynoteComponent } from './policynote/policynote.component';
// import { IndividualPolicyComponent } from './create-individual-policy/create-individual-policy.component';



@NgModule({
    declarations: [
        FindPolicyComponent,
        PolicySearchComponent,
        ViewPolicyComponent,
        EndorsementsComponent,
        DocumentsComponent,
        WorkflowsComponent,
        WebLoginComponent,
        UnderwritingEventsComponent,
        PoliciesComponent,
        RelationshipsComponent,
        BusinessComponent,
        PendingQuotesComponent,
        PendingPaymentsComponent,
        PolicynoteComponent

    ],
    exports: [
        ViewPolicyComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule
    ]
})
export class FindPolicyModule { }
