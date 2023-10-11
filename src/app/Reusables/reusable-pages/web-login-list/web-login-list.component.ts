import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { ERModule } from '../../reusable-extras/reusable.model';
import { WebLoginListService } from './web-login-list.service';

@Component({
  selector: 'app-web-login-list',
  templateUrl: './web-login-list.component.html',
  styleUrls: ['./web-login-list.component.scss']
})
export class WebLoginListComponent implements OnInit {
  webLoginList: any[] = [];
  webLoginForm: FormGroup = new FormGroup({
      userName: configForms.required(),
      status: configForms.required(),
      language: configForms.default(),
      webAccess: configForms.default(),
      documents: configForms.default(),
      viewPolicies: configForms.default(),
      quotations: configForms.default(),
    });loadingTable: boolean;
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
  clientFullName: string;

  constructor(
    public wlS: WebLoginListService,
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
      this.getDocuments(this.clientNo);
    } else if (this.isPolicy) {
    } else if (this.isWorkflow) {
      this.getDocuments(this.workflowNo)
    } else {
      this.getDocuments(id);
    } 
    this.setClientFullName(this.clientNo || id);
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
  async getDocuments(id: string) {
    this.loadingTable = true;
    try {
      this.webLoginList = await this.wlS
        .getWebLogins(this.rModule, id)
        .toPromise();
      console.log('document Info', this.webLoginList);
    } catch (error) {
      console.log('loading web logins error', error);
    }
    this.loadingTable = false;
  }

  setClientFullName(clientNo) {
    this.cliS.getClientNameByNum(clientNo).subscribe(
      (fullName: string) => (this.clientFullName = fullName),
      (err) =>
        console.log(
          "Error fetching client's full name for client number: ",
          clientNo,
          err
        )
    );
  }

  onSave() {
    console.log('clicked save button');
  }
}
