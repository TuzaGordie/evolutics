import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnderwritingListComponent} from './underwriting-list.component';
import {UnderwritingListDecisionComponent} from "./underwriting-list-decision/underwriting-list-decision.component";
import {UnderwritingDocumentComponent} from "./underwriting-document/underwriting-document.component";

const routes: Routes = [{path: '', component: UnderwritingListComponent},
  {path: 'decision', component: UnderwritingListDecisionComponent},
  {path: 'document', component: UnderwritingDocumentComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderwritingListRoutingModule {
}
