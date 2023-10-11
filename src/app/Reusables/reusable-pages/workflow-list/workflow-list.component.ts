import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClientService } from 'src/app/Services/client.service';
import { ERModule } from '../../reusable-extras/reusable.model';
import { WorkflowListService } from './workflow-list.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit {
  webflowsList: any[] = [];
  workflowStatusList: any[] = [];
  slaLevelsList: any[] = [];
  clientName: string;

  // filter fields
  startFrom: string;
  startTo: string;
  slaLevel: string;
  status: string;
  rModule: ERModule;
  id: string;
  agentNo: string;
  clientNo: string;
  enroleeNo: string;
  enroleeNoSuffix: string;
  policyCode: string;
  policyNo: string;
  policyNoSuffix: string;
  providerNo: string;
  workflowNo: string;
  loadingTable: boolean;
  newTaskRoute='/life/workflow-desk/task'
  constructor(
    public wfS: WorkflowListService,
    public cliS: ClientService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.agentNo = this.route.snapshot.queryParamMap.get('agentNo');
    this.clientNo = this.route.snapshot.queryParamMap.get('clientNo');
    this.enroleeNo = this.route.snapshot.queryParamMap.get('enroleeNo');
    this.enroleeNoSuffix =
      this.route.snapshot.queryParamMap.get('enroleeNoSuffix');
    this.policyCode = this.route.snapshot.queryParamMap.get('policyCode');
    this.policyNo = this.route.snapshot.queryParamMap.get('policyNo');
    this.policyNoSuffix =
      this.route.snapshot.queryParamMap.get('policyNoSuffix');
    this.providerNo = this.route.snapshot.queryParamMap.get('providerNo');
    this.workflowNo = this.route.snapshot.queryParamMap.get('workflowNo');

    let id = this.id;
    this.rModule = this.route.snapshot.data.rModule;
    console.log('config', id, this.rModule);
    if (this.isClient) {
      this.setWebflows(this.clientNo);
    } else if (this.isPolicy) {
    } else if (this.isWorkflow) {
      this.setWebflows(this.workflowNo);
    } else {
      this.setWebflows(id);
    }
    console.log('param id', id);
    this.setWorkflowStatusList();
    this.setSlaLevelsList();
    this.setClientFullName(id);
  }
  get isClient() {
    return this.rModule == ERModule.client;
  }
  get isPolicy() {
    return this.rModule == ERModule.policy;
  }
  get isWorkflow() {
    return this.rModule == ERModule.workflow;
  }
  get isAgent() {
    return this.rModule == ERModule.agent;
  }
  async setWebflows(id: string) {
    this.loadingTable = true;
    try {
      this.webflowsList = await this.wfS
        .getWorkflows(this.rModule, id)
        .toPromise();
      console.log('document Info', this.webflowsList);
    } catch (error) {
      console.log('loading workflows error', error);
    }
    this.loadingTable = false;
  }
  setWorkflowStatusList() {
    this.wfS.getWorkflowStatusList().subscribe((res) => {
      this.workflowStatusList = res;
    });
  }
  setSlaLevelsList() {
    this.wfS.getSlaLevelsList().subscribe((res) => {
      this.slaLevelsList = res;
    });
  }
  clearFilters() {
    this.startFrom = this.startTo = this.slaLevel = this.status = undefined;
  }
  setClientFullName(clientNo: string) {
    this.cliS.getClientNameByNum(clientNo).subscribe(
      (fullName: string) => (this.clientName = fullName),
      (err) =>
        console.log(
          "Error fetching client's full name for client number: ",
          clientNo,
          err
        )
    );
  }
}

//#region PIPES
@Pipe({
  name: 'workflowsFilter',
})
export class WorkflowsFilterPipe implements PipeTransform {
  transform(
    workflows: any[],
    startFrom: string,
    startTo: string,
    slaLevel: string,
    status: string
  ): any[] {
    // if no filters, return an unfiltered list
    if (!(startFrom || startTo || slaLevel || status)) return workflows;

    return workflows.filter(
      (workflow) =>
        this.stripTime(workflow.startOn) === startFrom ||
        this.stripTime(workflow.dueOn) === startTo ||
        workflow.slaLevel === slaLevel ||
        workflow.status === status
    );
  }

  stripTime(dateString: string): string {
    return dateString.split('T')[0];
  }
}
@Pipe({
  name: 'slaLevelColour',
})
export class SlaLevelColourPipe implements PipeTransform {
  transform(slaLevel: string): string {
    switch (slaLevel) {
      case 'G':
        return 'green';
      case 'R':
        return 'red';
      case 'B':
        return 'black';
      case 'Y':
        return 'yellow';
      default:
        return '';
    }
  }
}
@Pipe({
  name: 'formatMinutes',
})
export class FormatMinutesPipe implements PipeTransform {
  transform(minutes: number): string {
    const mins = minutes % 60;
    const hourDays = Math.floor(minutes / 60);
    const hours = hourDays % 24;
    const days = Math.floor(hourDays / 24);

    const daysLabel = `day${days > 1 ? 's' : ''}`;
    const hoursLabel = `hour${hours > 1 ? 's' : ''}`;
    const minsLabel = `min${mins > 1 ? 's' : ''}`;

    let result = days ? `${days}${daysLabel} ` : '';
    result += hours ? `${hours}${hoursLabel} ` : '';

    return `${result}${mins}${minsLabel}`;
  }
}
//#endregion
