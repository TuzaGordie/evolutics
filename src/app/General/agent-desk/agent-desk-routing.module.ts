import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../Life/agent-desk/agent-desk.module').then(
        (m) => m.AgentDeskModule
      ),
  },
];
console.log('GENERAL AGENT ROUTES', routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentDeskRoutingModule {}
