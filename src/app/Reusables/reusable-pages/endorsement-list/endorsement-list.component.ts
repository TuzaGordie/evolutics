import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { TableCol, FCInput } from 'src/app/Shared/models/index.model';
import { ERModule } from '../../reusable-extras/reusable.model';
import { EndorsementListService } from './endorsement-list.service';
import { AddEndorsementComponent } from './add-endorsement/add-endorsement.component';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-endorsement-list',
  templateUrl: './endorsement-list.component.html',
  styleUrls: ['./endorsement-list.component.scss'],
})
export class EndorsementListComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('Endorsement  No'),
    new TableCol('Endorsement Category'),
    new TableCol('Type'),
    new TableCol('Field Name'),
    new TableCol('From'),
    new TableCol('To'),
    new TableCol('Current Premium'),
    new TableCol('Revised Premium'),
    new TableCol('Additional Premium'),
    new TableCol('Created By'),
    new TableCol('Auth By'),
    new TableCol('Pending'),
    new TableCol('Created On'),
    new TableCol('Auth On'),
  ];
  loadingTable: boolean;
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
  filterForm = new FormGroup({
    username: new FormControl(),
    module: new FormControl(),
    createdFrom: new FormControl(),
    createdTo: new FormControl(),
    action: new FormControl(),
  });
  actions: any[];
  modules: any[];
  users: { fullName: string; userName: string; code: string; }[];
  constructor(
    public cliS: ClientService,
    public endS: EndorsementListService,
    public route: ActivatedRoute,
    private userService: UserService,
    public router: Router,
    public uS: UtilityService
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
      this.getDocuments(this.workflowNo);
    } else {
      this.getDocuments(id);
    }
    this.setClientFullName(this.clientNo || id);
    this.getDefaultUsers()
    this.getActions()
    this.getModules()
  }
  getActions() {
    this.endS.getActions().pipe(tap((r) => (this.actions = r)));
  }
  getModules() {
    this.endS.getModules().pipe(tap((r) => (this.modules = r)));
  }
  add() {
    this.uS.dialogOpener(
      AddEndorsementComponent,
      {
        height: 'auto',
        width: 'calc(100vw * 0.7569)',
        maxWidth: '90vw',
        maxHeight: '90vh',
      },
      () => {}
    );
  }
  filter() {}
  clearFilters() {}
  async getDocuments(id: string) {
    this.loadingTable = true;
    try {
      this.list = await this.endS.getEndorsements(this.rModule, id).toPromise();
      console.log('document Info', this.documentList);
    } catch (error) {
      console.log('loading documents error', error);
    }
    this.loadingTable = false;
  }
  documentList(arg0: string, documentList: any) {
    throw new Error('Method not implemented.');
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
  getDefaultUsers() {
    this.userService.getAllUserCodeAndFullName().subscribe((data) => {
      this.users = data;
      console.log('users', data);
    });
  }
  genProForma() {}
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
}
