import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../Shared/components/components.module';
import { SharedModule } from '../Shared/shared.module';
import { CashDatesComponent } from './cash-pages/admin/cash-dates/cash-dates.component';
import { CashRunbatchComponent } from './cash-pages/admin/cash-runbatch/cash-runbatch.component';
import { ShowbatchComponent } from './cash-pages/admin/cash-runbatch/showbatch/showbatch.component';
import { CashCreateUsergroupComponent } from './cash-pages/admin/user/user-group/cash-create-usergroup/cash-create-usergroup.component';
import { TabUsergroupComponent } from './cash-pages/admin/user/user-group/cash-create-usergroup/tab-usergroup/tab-usergroup.component';
import { CashNewusergroupComponent } from './cash-pages/admin/user/user-group/cash-newusergroup/cash-newusergroup.component';
import { UserGroupComponent } from './cash-pages/admin/user/user-group/user-group.component';
import { CashCreateUsermenuComponent } from './cash-pages/admin/user/user-menu/cash-create-usermenu/cash-create-usermenu.component';
import { TabsUsermenuComponent } from './cash-pages/admin/user/user-menu/cash-create-usermenu/tabs-usermenu/tabs-usermenu.component';
import { CashNewusermenuComponent } from './cash-pages/admin/user/user-menu/cash-newusermenu/cash-newusermenu.component';
import { UserMenuComponent } from './cash-pages/admin/user/user-menu/user-menu.component';
import { CashCreateuserComponent } from './cash-pages/admin/user/user/cash-createuser/cash-createuser.component';
import { TabsComponent } from './cash-pages/admin/user/user/cash-createuser/tabs/tabs.component';
import { CashNewuserComponent } from './cash-pages/admin/user/user/cash-newuser/cash-newuser.component';
import { UserComponent } from './cash-pages/admin/user/user/user.component';
import { CashRoutingModule } from './cash-routing.module';
import { CloneReportComponent } from './cash-pages/report/create-report/clone-report/clone-report.component';
import { CreateCloneReportComponent } from './cash-pages/report/create-report/create-clone-report/create-clone-report.component';
import { CreateReportComponent } from './cash-pages/report/create-report/create-report.component';
import { NewReportComponent } from './cash-pages/report/create-report/new-report/new-report.component';
import { ReportOverviewComponent } from './cash-pages/report/report-overview/report-overview.component';
import { UnreconciledTrasactionComponent } from './cash-pages/report/unreconciled-trasaction/unreconciled-trasaction.component';
import { CashCodeComponent } from './cash-pages/setups/code/code.component';
import { CashCodeSubgroupComponent } from './cash-pages/setups/code/parameters/code-subgroup/code-subgroup.component';
import { CashCreateParametersComponent } from './cash-pages/setups/code/parameters/create-parameters/create-parameters.component';
import { CashIndexParametersComponent } from './cash-pages/setups/code/parameters/index-parameters/index-parameters.component';
import { ParametersComponent } from './cash-pages/setups/code/parameters/parameters.component';
import { CashStartParametersComponent } from './cash-pages/setups/code/parameters/start-parameters/start-parameters.component';
import { SetupsComponent } from './cash-pages/setups/setups.component';
import { CashTaskSetupComponent } from './cash-pages/setups/task-setup/task-setup.component';
import { UsersComponent } from './cash-pages/users/users.component';
import { CreateNewWorkflowComponent } from './cash-pages/workflows/create-new-workflow/create-new-workflow.component';
import { CreateWorkflowScheduleComponent } from './cash-pages/workflows/create-new-workflow/create-workflow-schedule/create-workflow-schedule.component';
import { CreateWorkflowTaskComponent } from './cash-pages/workflows/create-new-workflow/create-workflow-task/create-workflow-task.component';
import { FindtaskWorkflowComponent } from './cash-pages/workflows/findtask-workflow/findtask-workflow.component';
import { WorkflowTasklistComponent } from './cash-pages/workflows/findtask-workflow/workflow-tasklist/workflow-tasklist.component';
import { WorkflowOverviewComponent } from './cash-pages/workflows/workflow-overview/workflow-overview.component';


@NgModule({
  declarations: [
    CashCodeComponent,
    CashCodeSubgroupComponent, 
    CashCreateParametersComponent,
    CashCreateuserComponent,
    CashCreateUsergroupComponent,
    CashCreateUsermenuComponent,
    CashDatesComponent,
    CashIndexParametersComponent,
    CashNewuserComponent,
    CashNewusergroupComponent,
    CashNewusermenuComponent,
    CashRunbatchComponent,
    CashStartParametersComponent,
    CashTaskSetupComponent,
    CloneReportComponent,
    CreateCloneReportComponent, 
    CreateNewWorkflowComponent,
    CreateReportComponent,
    CreateWorkflowScheduleComponent,
    CreateWorkflowTaskComponent,
    FindtaskWorkflowComponent,
    NewReportComponent,
    ParametersComponent,
    ReportOverviewComponent,
    SetupsComponent,
    ShowbatchComponent,
    TabsComponent,
    TabsUsermenuComponent,
    TabUsergroupComponent, 
    UnreconciledTrasactionComponent, 
    UserComponent,
    UserGroupComponent,
    UserMenuComponent,
    UsersComponent,
    WorkflowOverviewComponent,
    WorkflowTasklistComponent,
  
  ],
    imports: [
      CommonModule,CashRoutingModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      SharedModule,ComponentsModule
    ],
})
export class CashModule { } 