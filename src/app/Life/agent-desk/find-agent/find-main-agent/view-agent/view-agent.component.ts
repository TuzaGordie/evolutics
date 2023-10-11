import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { AppService } from 'src/app/Services/app.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { AgentPaymentMethodComponent } from './edit-modals/agent-payment-method/agent-payment-method.component';
import { FindMainAgentService } from '../service/find-main-agent.service';
import { HelpersService } from '../service/helpers.service';
import { AgentSalaryStatusComponent } from './edit-modals/agent-salary-status/agent-salary-status.component';
import { AgentTypeComponent } from './edit-modals/agent-type/agent-type.component';
import { BranchComponent } from './edit-modals/branch/branch.component';
import { LicenseCertComponent } from './edit-modals/license-cert/license-cert.component';
import { ProductClassPermissionComponent } from './edit-modals/product-class-permission/product-class-permission.component';
import { CreateAccountModalComponent } from 'src/app/Life/life-components/create-account-modal/create-account-modal.component';
import { AgentHierarchyComponent } from './edit-modals/agent-hierarchy/agent-hierarchy.component';
import { PaymentInfoComponent } from '../../../new-individual-agent/payment-info/payment-info.component';
import { IAgentInfo } from '../../../agent-extras/agent.interface';
import { AgentService } from 'src/app/Services/agent.service';
import { PaymentInformationModalComponent } from 'src/app/Life/life-components/payment-information-modal/payment-information-modal.component';
import { FullNamePipe } from 'src/app/Life/client-desk/pipes/full-name.pipe';

declare var $: any;
@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.scss', './view-agent.component.css'],
})
export class ViewAgentComponent implements OnInit {
  viewAgentForm: FormGroup;
  readonlyValue: any;
  policyLength: any;
  policyList: any;
  relationshipLength: any;
  quoteList: any[];
  quoteLength: number;
  pendingPaymentsList: any;
  paymentLength: any;
  agentStatus: string;
  getStatusColour;
  statusCodesList: any[];
  loading: boolean;
  agentNo: string;
  totalCommissionPaid: number;
  totalProduction: number;
  creditNoteBalance: number;
  exceedValidity: boolean;
  providerNo: string;
  passport: string;
  hierarchyAgentsCount: number | null = null;

  agentName: string;
  editModal = {
    medium: { width: '60vw', maxHeight: '80vh' },
    wide: { width: '90vw', maxHeight: '80vh' },
    large: { width: '100vw', maxWidth: '100vw', maxHeight: '80vh' },
  };
  agentInfo: IAgentInfo;

  constructor(
    public findAgentService: FindMainAgentService,
    private findClientService: FindClientService,
    private helpersService: HelpersService,
    private appService: AppService,
    public route: ActivatedRoute,
    public uS: UtilityService,
    private agentS: AgentService,
    private fullNamePipe: FullNamePipe,
  ) {
    this.getStatusColour = helpersService.getStatusColour;
  }

  ngOnInit() {
    this.agentNo = this.route.snapshot.queryParams.number|| this.route.snapshot.queryParams.agentNo
    
    this.createForm();
    this.getAgentInfo();
    /* this.findAgentService.submitPostData(this.viewAgentForm.value).subscribe(res => {
      console.log(res)
    }) */
    this.setPolicies();
    this.setPendingQuotes();
    this.setPendingPayments();
    this.setStatusCodesList();
    this.setTotalCommissionPaid();
    this.setCreditNoteBalance();
    this.setTotalProduction();
    this.setHierarchyAgents();
    this.setBranch();
    this.setProductClassPermission();
  }

  createForm() {
    this.viewAgentForm = new FormGroup({
      agentName: new FormControl(null),
      agentType: new FormControl(null),
      activeDate: new FormControl(null),
      productClassPermission: new FormControl(null),
      agentSalary: new FormControl(null),
      phoneNumber: new FormControl(null),
      alternativePhoneNumber: new FormControl(null),
      email: new FormControl(null),
      alternativeEmail: new FormControl(null),
      address: new FormControl(null),
      branch: new FormControl(null),
      payoutMethod: new FormControl(null),
      hierarchyManager: new FormControl(null),
      license: new FormControl(null),
      contactPerson: new FormControl(null),
      crm: new FormControl(null),
      minPayable: new FormControl(null),
      language: new FormControl(null),
      currency: new FormControl(null),
      band: new FormControl(null),
      commissionRateTax: new FormControl(null),
      statusCode: new FormControl(null),
    });
  }
  setPolicies() {
    this.findAgentService.getAgentPolicies(this.agentNo).subscribe((res) => {
      this.policyList = res;
      this.policyLength = this.policyList.length;
      console.log('policy Info', res);
    });
  }
  setPendingQuotes() {
    const busLine = this.appService.getCurrentSystemMetadata.busline;
    this.findAgentService
      .getPendingQuotes(this.agentNo, busLine)
      .subscribe((res) => {
        this.quoteList = res;
        this.quoteLength = this.quoteList.length;
        console.log('quotes Info', res);
      });
  }
  setPendingPayments() {
    this.findAgentService.getPendingPayments().subscribe((res) => {
      this.pendingPaymentsList = res;
      this.paymentLength = this.pendingPaymentsList.length;
      console.log('payment Info', res);
    });
  }

  setStatusCodesList() {
    this.findAgentService.getStatusCodesList().subscribe(
      (res: any[]) => (this.statusCodesList = res),
      (err: HttpErrorResponse) =>
        console.log('Error fetching agent status codes', err)
    );
  }

  setTotalCommissionPaid() {
    this.findAgentService.getCommissionPaid(this.agentNo).subscribe(
      (res: number) => (this.totalCommissionPaid = res),
      (err: HttpErrorResponse) =>
        console.log('Error fetching agent status codes', err)
    );
  }

  // onSubmit() {
  //   console.log('formdata', this.viewAgentForm.value);
  //   /*    this.findClientService.ownerInfo(this.viewClientForm.value); */
  //   this.setEditFormData(this.viewAgentForm.value);
  // }
  onNext() {
    console.log('formdata', this.viewAgentForm.value);
    /*  this.findClientService.ownerInfo(this.viewClientForm.value); */
  }

  checkReadonly(value: any) {
    if (value == this.readonlyValue) {
      return false;
    } else {
      return true;
    }
  }
  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }
  setAgentData(data: any) {
    this.viewAgentForm.patchValue({
      agentType: data?.agentInformation?.type,
      activeDate: data?.license?.expiryDate,
      // productClassPermission: data?.agentInformation?.productList?.length, // fetched seperately from another endpoint
      agentSalary: data?.agentInformation.salaryStatus,
      // branch: data?.agentInformation?.branch, // fetched seperately from another endpoint
      payoutMethod: data?.paymentInformation?.payoutMethod,
      hierarchyManager: data?.agentInformation?.hierarchyManager,
      license: data?.license?.expiryDate,
      minPayable: data?.paymentInformation.minPayAmount,
      currency: data?.paymentInformation?.agentPaymentCurrency,
      commissionRateTax: data?.paymentInformation?.commTaxRate,
    });
  }

  setClientData(data: any) {
    this.viewAgentForm.patchValue({
      phoneNumber: data?.phoneNumber,
      alternativePhoneNumber: data?.alternativePhoneNumber,
      email: data?.email,
      alternativeEmail: data?.alternativeEmail,
      language: data?.language,
      crm: data?.crmId,
      band: data?.band,
      agentName: this.fullNamePipe.transform(data),
      statusCode: data?.statusCode
    });
    this.agentName = this.fullNamePipe.transform(data);
  }

  setClientContactPersonData(data: any) {
    this.viewAgentForm.patchValue({
      contactPerson: data[0]?.relClientName,
    });
  }

  getAgentInfo() {
    this.loading = true;
    this.findAgentService
      .getAgentList(this.agentNo)
      .pipe(
        tap((res) => this.getClientInfo(res?.agentInformation?.clientNo)),
        tap((res) => this.getContactPersons(res?.agentInformation?.clientNo)),
        tap((res) => this.getPassport(res?.agentInformation?.clientNo))
      )
      .subscribe(
        (res) => {
          this.agentInfo = this.findAgentService.agentInfo = res;
          this.setAgentData(res);
          console.log('agent', res);
          this.loading = false;
        },
        async (err: HttpErrorResponse) => {
          console.log(
            'Error fetching agent info for agent no: ' + this.agentNo,
            err
          );

          await this.uS.info(
            `Agent with number ${this.agentNo} was not found`,
            0
          );
          this.uS.back();
          this.loading = false;
        }
      );
  }

  setAgentType(){
    this.findAgentService.getAgentList(this.agentNo).subscribe(
      res => this.viewAgentForm.patchValue({agentType: res?.agentInformation?.type})
    )
  }

  getClientInfo(clientNo: string) {
    this.findClientService.getClientList(clientNo).subscribe(
      (res: any) => this.setClientData(res),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching client Info for agent with agent no: ' + this.agentNo,
          err
        )
    );
  }
  getContactPersons(clientNo: string) {
    this.findClientService.getClientContactPersons(clientNo).subscribe(
      (res: any) => this.setClientContactPersonData(res),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching contact persons data for agent no: ' + this.agentNo,
          err
        )
    );
  }
  // setEditFormData(data: any) {
  //   this.viewAgentForm.patchValue({
  //     agentName: data?.agentName,
  //     agentType: data?.agentType,
  //     activeDate: data?.activeDate,
  //     productClassPermission: data?.productClassPermission,
  //     agentSalary: data?.agentSalary,
  //     phoneNumber: data?.phoneNumber,
  //     alternativePhoneNumber: data?.alternativePhoneNumber,
  //     email: data?.email,
  //     alternativeEmail: data?.alternativeEmail,
  //     branch: data?.branch,
  //     paymoutMethod: data?.payoutMethod,
  //     hierarchyManager: data?.hierarchyManager,
  //     license: data?.license,
  //     contactPerson: data?.contactPerson,
  //     crm: data?.crm,
  //     minPayable: data?.minPayable,
  //     language: data?.language,
  //     currency: data?.currency,
  //     band: data?.band,
  //     commissionRateTax: data?.commissionRateTax,
  //     statusCode: data?.statusCode,
  //   });
  // }
  savePaymentInfo = (paymentInfo: any) => {
    return this.agentS.updateAgentPayment(this.agentNo, paymentInfo);
  };
  editAgentPaymentMethod() {
    this.uS.dialogOpener(
      PaymentInformationModalComponent,
      {
        ...this.editModal.wide,
        autoFocus: false,
        data: {
          agentNo: this.agentNo,
          agentName: this.agentName,
          clientNo:
            this.findAgentService.agentInfo?.paymentInformation?.clientNo,
          paymentInfo: this.agentInfo.paymentInformation,
          dimensions: this.editModal.wide,
          saveFunction: this.savePaymentInfo,
        },
      },
      (data) => {
        this.updatePaymentMethod(data);
      },
      () => console.log('payment method modal cancelled')
    );
  }

  updatePaymentMethod(data) {
    console.log('about to set this payment method: ', data);
    this.viewAgentForm.patchValue({
      payoutMethod: data.data.method,
    });
    // this.findAgentService.updatePaymentMethod(this.agentNo, method)
  }
  editLicenseCert() {
    this.uS.dialogOpener(
      LicenseCertComponent,
      {
        ...this.editModal.wide,
        data: {}
      },
      (data) => {
        this.updateLicenseMethod(data);
      },
      () => console.log('license modal closed')
    );
  }

  updateLicenseMethod(data) {}

  editAgentHierarchy() {
    this.uS.dialogOpener(
      AgentHierarchyComponent,
      {
        ...this.editModal.wide,
        data: {},
      },
      (data) => this.updateAgentHierarchy(data),
      () => console.log('agent hierarchy  modal cancelled')
    );
  }

  updateAgentHierarchy(data) {}

  editAgentSalaryStatus() {
    this.uS.dialogOpener(
      AgentSalaryStatusComponent,
      {
        ...this.editModal.wide,
        data: {},
      },
      (data) => this.updateAgentSalaryStatus(data),
      () => console.log('agent salary status modal cancelled')
    );
  }

  updateAgentSalaryStatus(data) {}

  editAgentType() {
    this.uS.dialogOpener(
      AgentTypeComponent,
      {
        ...this.editModal.wide,
        data: {},
      },
      (data) => this.setAgentType(),
      () => this.setAgentType()
    );
  }

  editBranch() {
    this.uS.dialogOpener(
      BranchComponent,
      {
        ...this.editModal.wide,
        data: {},
      },
      (data) => this.setBranch(),
      () => this.setBranch()
    );
  }

  setBranch() {
    this.findAgentService.getBranch(this.agentNo).subscribe(
      res => this.viewAgentForm.patchValue({branch: res?.branchCode})
    )
  }

  editProductClassPermission() {
    this.uS.dialogOpener(
      ProductClassPermissionComponent,
      {
        ...this.editModal.wide,
        data: {}
      },
      (data) => this.setProductClassPermission(),
      () => this.setProductClassPermission()
    );
  }

  setProductClassPermission() {
    this.findAgentService.getProductClassPermissions(this.agentNo).subscribe(
      res => this.viewAgentForm.patchValue({productClassPermission: res?.totalElements})
    )
  }

  get clientNo() {
    return this.findAgentService.agentInfo?.paymentInformation
      ?.clientNo as string;
  }

  onEdit(field) {}

  setCreditNoteBalance() {
    this.findAgentService.getCreditNoteBalance(this.agentNo).subscribe();
  }

  setTotalProduction() {
    this.findAgentService
      .getTotalProduction(this.agentNo)
      .subscribe((res) => (this.totalProduction = +res));
  }

  setHierarchyAgents() {
    this.findAgentService
      .getHierarchyAgents(this.agentNo)
      .subscribe((res) => (this.hierarchyAgentsCount = res.length))
  }

  getPassport(clientNo){
    this.findClientService.getClientPassport(clientNo).subscribe(
      res => this.passport = res
    )
  }

  getStatusText(statusCode){
    return this.statusCodesList?.find(({code}) => code == statusCode)?.title
  }
}
