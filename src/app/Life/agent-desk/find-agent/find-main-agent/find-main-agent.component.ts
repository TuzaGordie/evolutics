import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISearchFormSchema } from 'src/app/Reusables/reusable-comps/find-item/find-item.model';
import { AgentService } from 'src/app/Services/agent.service';
import { ClientService } from 'src/app/Services/client.service';
import { RouteService } from 'src/app/Services/route.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageModal } from 'src/app/Shared/components/page-to-component/page-to-component.component';
import { TableCol } from 'src/app/Shared/models/index.model';
import { FindMainAgentService } from './service/find-main-agent.service';

@Component({
  selector: 'app-find-main-agent',
  templateUrl: './find-main-agent.component.html',
  styleUrls: ['./find-main-agent.component.scss'],
})
export class FindMainAgentComponent extends PageModal implements OnInit {
  displayedColumns: TableCol[];
  loading: boolean;
  usersList: any[];
  schema: ISearchFormSchema[];
  agentNo: string;
  uniqueAgents: { hierAgentNo: string; agentName: string }[];
  constructor(
    public findAgentService: FindMainAgentService,
    public agentS: AgentService,
    public userS: UserService,
    public router: Router,
    public route: ActivatedRoute,
    public rS: RouteService,
    public clientS: ClientService,
    public uS: UtilityService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.displayedColumns = [
      {
        f: 'no',
        t: 'Agent No',
        routeFormatter: this.isModal
          ? null
          : (agent) => {
              return '../view-agent?agentNo=' + agent.agentNo;
            },
        action: this.isModal ? this.modalOnComplete : null,
      },
      { f: 'name', t: 'Full Name' },
      // {
      //   f: 'clientNo',
      //   t: 'Client Number',
      //   routeFormatter: this.isModal
      //     ? null
      //     : (agent) => {
      //         return '../../client-desk/view-client?clientNo=' + agent.clientNo;
      //       },
      // },
      { f: 'branch', t: 'Branch' },
      { f: 'hierachyAgentNo', t: 'Manager' },
      { f: 'hierachyAgentType', t: 'Manager Type' },
      { f: 'phoneNumber', t: 'Phone Number' },
      { f: 'email', t: 'Email' },
      { f: 'createdOn', t: 'Created On', formatter: this.uS.fullDateTime },
      { f: 'status', t: 'Status' },
    ];

    await Promise.all([
      this.setUsersList(),
      this.agentS.getAgentTypes().toPromise(),
      this.setUniqueAgents(),
    ]);
    this.schema = [
      {
        field: 'agentNo',
        label: 'Agent Number',
        type: 'text',
        standalone: true,
        validators: [Validators.required],
        asyncValidators: [this.validateAgentNo],
        action: (form, cell) => {
          this.isModal ? this.modalOnComplete(form) : this.openAgent(cell);
        },
      },
      {
        field: 'clientNo',
        label: 'Client Number',
        type: 'text',
        standalone: true,
        validators: [Validators.required],
        asyncValidators: [this.validateClientNo],
        action: (form, cell) => {
          this.isModal
            ? this.modalOnComplete({ agentNo: this.agentNo })
            : this.openAgent(this.agentNo);
        },
      },
      { field: 'name', label: 'Name', type: 'text' },
      {
        field: 'agentType',
        label: 'Agent Type',
        type: 'select',
        options: this.agentS.agentTypes,
        valueField: 'type',
        labelType: 'td',
      },
      {
        field: 'createdBy',
        label: 'Created By',
        type: 'select',
        options: this.usersList,
        labelType: 'uf',
        valueField: 'userName',
      },
      {
        field: 'manager',
        label: 'Manager',
        type: 'select',
        options: this.uniqueAgents,
        valueField: 'hierAgentNo',
        labelType: 'ha',
      },
      { field: 'createDateFrom', label: 'Create Date From', type: 'date' },
      { field: 'createDateTo', label: 'Create Date To', type: 'date' },
    ];
    this.loading = false;
  }
  search = (query) => this.findAgentService.getsearch(query);
  openAgent(agentNo: string) {
    this.router.navigate(['../view-agent/'], {
      relativeTo: this.route,
      queryParams: { agentNo },
    });
  }

  onNext(agentNo = this.agentNo) {
    if (agentNo) {
      this.rS.go('../view-agent', {
        relativeTo: this.route,
        queryParams: { agentNo },
      });
      /* this.findClientService.clientInfo(this.clientNoForm.value); */
    }
  }

  validateClientNo = async (control: AbstractControl) => {
    const val: string = control?.value;
    if (!val) return null;
    return this.agentS
      .getAgentNoByClientNo(val)
      .toPromise()
      .then((agentNo) => {
        if (!agentNo) return { notFound: true };
        this.agentNo = agentNo;
        return null;
      })
      .catch((err) => {
        return { notFound: true };
      });
  };

  validateAgentNo = (control: AbstractControl) => {
    return new Promise<any>((res) => {
      if (!control.value) res({ invalid: true });
      else
        this.findAgentService
          .getAgentByNo(control.value)
          .toPromise()
          .then((r) => {
            res(r ? null : { notFound: true });
          });
    });
  };

  setUsersList() {
    return this.userS
      .getAllUserCodeAndFullName()
      .toPromise()
      .then((res) => (this.usersList = res));
  }
  setUniqueAgents() {
    return this.agentS
      .findAllUniqueHierAgent()
      .toPromise()
      .then((res) => (this.uniqueAgents = res));
  }
}
