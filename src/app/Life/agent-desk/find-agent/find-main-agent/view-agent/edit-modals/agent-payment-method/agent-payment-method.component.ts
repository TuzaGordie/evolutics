import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FindMainAgentService } from '../../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-payment-method',
  templateUrl: './agent-payment-method.component.html',
  styleUrls: ['./agent-payment-method.component.scss']
})
export class AgentPaymentMethodComponent implements OnInit {
  paymentMethodForm: FormGroup;
  clientNo: string;
  agentNo: string;
  agentName: string; // if option of cheque is chosen, then prefill the payee name with this
  agentBankAccounts: any[];

  constructor(
    private agentService: FindMainAgentService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<AgentPaymentMethodComponent>,
  ){
    this.agentName = data.agentName;
    this.agentNo = data.agentNo;
    this.clientNo = data.clientNo;
  }

  ngOnInit(): void {
    this.createPaymentMethodForm()
    this.setAgentBankAccounts()
  }

  createPaymentMethodForm(){
    this.paymentMethodForm = new FormGroup({
      method: new FormControl(null, Validators.required),
      bankAccount: new FormControl(null),
      chequePayeeName: new FormControl(this.agentName)
    })
  }

  setAgentBankAccounts(){
    this.agentService.getClientBankAccounts(this.clientNo).subscribe(
      (res: any[]) => {
        this.agentBankAccounts = res
      }
    )
  }

  isSelectedAccount(account){
    return account.id == this.paymentMethodForm.get('bankAccount')?.value
  }

  onCloseDialog(){
    this.dialogRef.close({
      event: 'save',
      data: this.paymentMethodForm.value
    })
  }
}
