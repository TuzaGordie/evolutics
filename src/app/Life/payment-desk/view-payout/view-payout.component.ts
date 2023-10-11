import { EditPayoutComponent } from './edit-payout/edit-payout.component';
import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from 'src/app/Services/payment.service';
import {UtilityService} from 'src/app/Services/utility.service';
import {configForms} from 'src/app/Shared/models/form.class';
import {FKVP, IBtn, ICodeDescription, KVP, TableCol} from 'src/app/Shared/models/index.model';
import { EditClientComponent } from '../../client-desk/client-desk-comps/view-client-comps/edit-client/edit-client.component';
import { AgentListModalComponent } from '../../life-components/agent-list-modal/agent-list-modal.component';
import { PDService } from '../../policy-desk/policy-desk-extras/policy-desk.service';
import {PolicyEndpointsService} from '../../policy-desk/policy-desk-extras/policy-endpoints.service';
import { ChangeStatusModalComponent } from '../../policy-desk/policy-desk-pages-2/policy-total-payments-outward/change-status-modal/change-status-modal.component';
import { PolicyCoverTableComponent } from '../../policy-desk/policy-desk-pages/view-policy/modal/policy-cover-table/policy-cover-table.component';
import {IPayout} from '../payment-extras/payment.interface';

@Component({
  selector: 'app-view-payout',
  templateUrl: './view-payout.component.html',
  styleUrls: ['./view-payout.component.scss'],
})
export class ViewPayoutComponent implements OnInit {
  paymentNo: string | number;
  showPager: boolean;
  tableLoading:boolean;
  tableLimit = 10;
  isSetPayeeHidden: boolean = true;
  isCreatePaymentOutwardHidden: boolean = true;
  policyCodes: any[];
  policyNo: any;
  policyCode: any;
  suffix: any;
  paymentHistory:any;
  payee:any;
  clientName:string;
  clientLossRatio=[];
  policyLossRatio=[];
  policyLossCodeRatio:any;
  clRoute:any = {route: '',value:''};
  plRoute:any = {route: '',value:''};
  openAgentListDialog = () => {
    this.uS.dialogOpener(
      AgentListModalComponent,
      {
        data: { number: 'this.policyNo' },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        // this.init();
      }
    );
  };

  lbls1: FKVP[] = [
    new FKVP('id', 'Payout No'),
    new FKVP('claimNo', 'Claim No',this.clRoute.route),
    new FKVP('policyNo', 'Policy No',this.plRoute.route),
    new FKVP('policyCode', 'Pol Code Claimed On'),
    new FKVP('id', 'Expense Id'),
    new FKVP('clientNo', 'Owner')
  ];


  lbls2: FKVP[] = [
    new FKVP('refCat', 'Ref Category'),
    new FKVP('refNo', 'Ref No'),
    new FKVP('currency', 'Currency'),
    new FKVP('createdOn', 'Created On'),
    new FKVP('control', 'Control Status'),
    new FKVP('controlOn', 'Control On'),
    new FKVP('payoutReason', 'Payout Reason'),
    new FKVP('coverCode', 'Cover Code'),
    new FKVP('narration', 'Narration'),
    new FKVP('authComplete', 'Auth Complete Status'),
    new FKVP('authReq', 'Auth Required', true),
    new FKVP('nextAuthTier', 'Next Auth Tier'),
    new FKVP('paymentType', 'Payment Type'),
    new FKVP('sentToBank', 'Sent To Bank'),
    new FKVP('sentToBankOn', 'Sent To Bank On'),
  ];

  form = new FormGroup({
    paymentNo: configForms.default(),
    test: configForms.default(),
  });
  payout: IPayout;
  loading: boolean;
  payoutStatus = new FKVP('status', 'Payout Status', true);
  statuses: ICodeDescription[];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public payS: PaymentService,
    public polS: PolicyEndpointsService,
    public uS: UtilityService,
    private dialog: MatDialog,
  ) {
  }

  async init() {
    this.tableLoading = this.loading = true;
    try {
      this.payout = await this.payS.getPayoutByNumber(this.paymentNo as any).toPromise();
      console.log("Payout Result"+JSON.stringify(this.payout));
    } catch (error) {
      this.uS.notify(`Payout does not exist`, 0);
      this.uS.back();
    }
    this.fetchPaymentHistory(this.payout.id);
    this.loading = false;

    this.form.patchValue(this.payout);
    this.lbls1.forEach((l) =>{
      l.value = this.payout[l.key]
      if(l.key == 'clientNo'){
        this.payS.getClientNameByNo(this.payout.clientNo).toPromise().then((r)=>{
          l.value = this.payout.clientNo + ' - ' + r;
        });

      }
    }
    );
    this.lbls2.forEach((l) => {
      l.value = this.payout[l.key]
      if(l.key == 'authComplete'){
        if(l.value == true){
          l.value = 'Completed';
        }else if(l.value == false){
          l.value = 'Not Completed';
        }else{
          l.value = '---';
        }

      }

    });
    this.clRoute = this.lbls1.find((x) => x.key == 'claimNo');
    this.clRoute.route = `../view-claim?claimNo='${this.clRoute.value}`;
    this.plRoute = this.lbls1.find((x) => x.key == 'policyNo');
    this.plRoute.route = `../../policy-desk/view-policy?policyNo='${this.plRoute.value}`;
    this.payoutStatus.value = this.payout[this.payoutStatus.key];
    this.getClientNameByClientNo(this.payout.clientNo);
    this.fetchPaymentHistory(this.payout.id);
    this.getPayee(this.payout.id);
    this.getClientLossRatioYearByClientNo('1');
    this.getPolicyLossRatioYearByPolicyNo(this.payout.policyNo);
    this.getCumLossRatioByPolicyNoAndPolicyCode(this.payout.policyNo,this.payout.policyCode)
    this.loading = false;
  }

  ngOnInit(): void {
    this.paymentNo = this.route.snapshot.queryParams.slug;
    console.log("PAYMENT NUMBER "+this.paymentNo);
    this.init();
  }

  refetch() {
    this.init();
  }


  createPaymentOutward() {
    this.isSetPayeeHidden = true
    this.isCreatePaymentOutwardHidden = false
  }

  setPayee() {
    this.isCreatePaymentOutwardHidden = true
    this.isSetPayeeHidden = false
  }
  get clientNo(){
    return this.payout?.clientNo
  }



  openAuthorizeDialog() {
    this.dialog.open(null,
      {
        width: '80vw',
        data:{
        }
      }
    )
  }

  openPayeeDialog() {
    this.dialog.open(null,
      {
        width: '80vw',
        data:{
        }
      }
    )
  }

  openStatusDialog = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: { status: this.form.value.policyStatus, options: this.statuses },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        this.init();
      }
    );
  };

  openCoverDialog() {
    this.dialog.open(PolicyCoverTableComponent, {
      data: {
        tableLimit: this.tableLimit,
        showPager: this.showPager
      },
      width: 'auto',
      minWidth: '60%',
    });
  }

 async fetchPaymentHistory(payoutId:number){
   this.paymentHistory = await this.payS.getPaymentHistory(payoutId).toPromise();
   console.log("Payment History"+JSON.stringify(this.paymentHistory));
}


async getPayee(payoutId:number){
  this.payee = await this.payS.getPayee(payoutId).toPromise();
  console.log("Payee"+JSON.stringify(this.payee));
}

async getClientNameByClientNo(clientNo:string){
  this.clientName = await this.payS.getClientNameByNo(clientNo).toPromise();
  console.log("Client Name"+JSON.stringify(this.clientName));
}


async getClientLossRatioYearByClientNo(clientNo:string){
  this.clientLossRatio = await this.payS.getClientLossRatioYearByClientNo(clientNo).toPromise();
  console.log("Client Loss Ratio"+JSON.stringify(this.clientLossRatio));
}

async getPolicyLossRatioYearByPolicyNo(clientNo:string){
  this.policyLossRatio = await this.payS.getPolicyLossRatioYearByPolicyNo(clientNo).toPromise();
  console.log("Policy Loss Ratio"+JSON.stringify(this.policyLossRatio));
}

async getCumLossRatioByPolicyNoAndPolicyCode(policyNo:string,policyCode:string){
  this.policyLossCodeRatio = await this.payS.getCumLossRatioByPolicyNoAndPolicyCode(policyNo,policyCode).toPromise();
  console.log("Policy And Policy Code "+JSON.stringify(this.policyLossRatio));
}


onEditClient() {
  this.uS.dialogOpener(
    EditPayoutComponent,
    {
      data: {
        client: this.form,
        clientNo: this.clientNo,
      },
    },
    (val) =>
      console.log('client was successfully edited with return value', val)
  ),
    () => console.log('client editing was cancelled');
}
}
