/* import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DocumentsComponent } from './agentinfo-button/documents/documents.component';
import { EndorsementsComponent } from './agentinfo-button/endorsements/endorsements.component';
import { WebLoginComponent } from './agentinfo-button/web-login/web-login.component';
import { WorkflowsComponent } from './agentinfo-button/workflows/workflows.component';
import { FindMainAgentComponent } from './find-main-agent.component';


const routes: Routes = [
    {path: '' , component: FindMainAgentComponent, children:[
        {
            path: 'agent-endorsements', component: EndorsementsComponent
          },
          {
            path: 'agent-documents', component: DocumentsComponent
          },
          {
            path: 'agent-workflows', component: WorkflowsComponent
          },
          {
            path: 'agent-web-login' , component: WebLoginComponent
          }
    ]}
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FindagentRoutingModule {
}
 */