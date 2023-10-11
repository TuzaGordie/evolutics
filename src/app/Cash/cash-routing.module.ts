import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashDatesComponent } from './cash-pages/admin/cash-dates/cash-dates.component';
import { CashRunbatchComponent } from './cash-pages/admin/cash-runbatch/cash-runbatch.component';
import { ShowbatchComponent } from './cash-pages/admin/cash-runbatch/showbatch/showbatch.component';
import { CashCreateUsergroupComponent } from './cash-pages/admin/user/user-group/cash-create-usergroup/cash-create-usergroup.component';
import { CashNewusergroupComponent } from './cash-pages/admin/user/user-group/cash-newusergroup/cash-newusergroup.component';
import { CashCreateUsermenuComponent } from './cash-pages/admin/user/user-menu/cash-create-usermenu/cash-create-usermenu.component';
import { CashNewusermenuComponent } from './cash-pages/admin/user/user-menu/cash-newusermenu/cash-newusermenu.component';
import { UserMenuComponent } from './cash-pages/admin/user/user-menu/user-menu.component';
import { CashCreateuserComponent } from './cash-pages/admin/user/user/cash-createuser/cash-createuser.component';
import { CashNewuserComponent } from './cash-pages/admin/user/user/cash-newuser/cash-newuser.component';
import { UserComponent } from './cash-pages/admin/user/user/user.component'; 
import { CloneReportComponent } from './cash-pages/report/create-report/clone-report/clone-report.component';
import { CreateCloneReportComponent } from './cash-pages/report/create-report/create-clone-report/create-clone-report.component';
import { CreateReportComponent } from './cash-pages/report/create-report/create-report.component';
import { NewReportComponent } from './cash-pages/report/create-report/new-report/new-report.component';
import { CashCodeSubgroupComponent } from './cash-pages/setups/code/parameters/code-subgroup/code-subgroup.component';
import { CashCreateParametersComponent } from './cash-pages/setups/code/parameters/create-parameters/create-parameters.component';
import { CashIndexParametersComponent } from './cash-pages/setups/code/parameters/index-parameters/index-parameters.component';
import { CashTaskSetupComponent } from './cash-pages/setups/task-setup/task-setup.component';
import { UsersComponent } from './cash-pages/users/users.component';
import { CreateWorkflowScheduleComponent } from './cash-pages/workflows/create-new-workflow/create-workflow-schedule/create-workflow-schedule.component';
import { CreateWorkflowTaskComponent } from './cash-pages/workflows/create-new-workflow/create-workflow-task/create-workflow-task.component';
import { FindtaskWorkflowComponent } from './cash-pages/workflows/findtask-workflow/findtask-workflow.component';
import { WorkflowTasklistComponent } from './cash-pages/workflows/findtask-workflow/workflow-tasklist/workflow-tasklist.component';
import { WorkflowOverviewComponent } from './cash-pages/workflows/workflow-overview/workflow-overview.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('../Cash/cash-pages/cash-home/cash-home.module').then(
        (m) => m.CashHomeModule
      ),
  },
  { path: 'users', component: UsersComponent },
  { path: 'workflow-find-task', component: FindtaskWorkflowComponent },
  { path: 'workflow-task-list', component: WorkflowTasklistComponent },
  { path: 'workflow-task', component: CreateWorkflowTaskComponent },
  { path: 'workflow-schedule', component: CreateWorkflowScheduleComponent },
  { path: 'workflow-oviewview', component: WorkflowOverviewComponent },
  { path: 'cash-report', component: CreateReportComponent },
  { path: 'cash-new-report', component: NewReportComponent },
  { path: 'cash-clone-new-report', component: CreateCloneReportComponent },
  { path: 'cash-clone-report', component: CloneReportComponent }, 
  { path: 'cash-dates', component: CashDatesComponent },
  { path: 'cash-runbatch', component: CashRunbatchComponent },
  { path: 'cash-showrunbatch', component: ShowbatchComponent },
  { path: 'cash-createuser', component: CashCreateuserComponent },
  { path: 'cash-user', component: UserComponent },
  { path: 'cash-user/:operation', component: UserComponent },
  { path: 'cash-newuser', component: CashNewuserComponent },
  { path: 'cash-createusergroup', component: CashNewusergroupComponent },
  { path: 'cash-usergroup', component: CashCreateUsergroupComponent },
  {
    path: 'cash-usergroup/:operation',
    component: CashCreateUsergroupComponent,
  },
  { path: 'cash-createusermenu', component: CashNewusermenuComponent },
  { path: 'cash-usermenu', component: UserMenuComponent },
  { path: 'cash-newusermenu', component: CashCreateUsermenuComponent },

  { path: 'code', component: CashIndexParametersComponent },
  {
    path: 'code/create-subgroup-parameters',
    component: CashCodeSubgroupComponent,
  },
  {
    path: 'code/create-parameters',
    component: CashCreateParametersComponent,
  },
  { path: 'task-setup', component: CashTaskSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRoutingModule {}
