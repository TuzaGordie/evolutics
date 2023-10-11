import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgentDocumentsComponent} from './agentinfo-button/agent-documents/agent-documents.component';
import {AgentEndorsementsComponent} from './agentinfo-button/agent-endorsements/agent-endorsements.component';
import {AgentWebLoginComponent} from './agentinfo-button/agent-web-login/agent-web-login.component';
import {AgentWorkflowsComponent} from './agentinfo-button/agent-workflows/agent-workflows.component';
import {FindMainAgentComponent} from './find-main-agent.component';


const routes: Routes = [
  {
    path: '', component: FindMainAgentComponent, children: [
      {
        path: 'agent-endorsements', component: AgentEndorsementsComponent
      },
      {
        path: 'agent-documents', component: AgentDocumentsComponent
      },
      {
        path: 'agent-workflows', component: AgentWorkflowsComponent
      },
      {
        path: 'agent-web-login', component: AgentWebLoginComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindagentRoutingModule {
}
