import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PolicyService } from 'src/app/Services/cash/policy.service';
import { ReceiptBatch } from 'src/app/Shared/models/cash/receipt';

@Component({
  selector: 'app-batch-receipt-modal',
  templateUrl: './batch-receipt-modal.component.html',
  styleUrls: ['./batch-receipt-modal.component.scss']
})
export class BatchReceiptModalComponent implements OnInit {
  mode: 'UPLOAD' | 'MANUAL';
  receipt;
  receiptBatch;
  createBatchReceipt;
  receiptUpload;

  policyCodes = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private policyService: PolicyService,
  ) { 
    this.mode = data.mode;
    this.receipt = data.receipt;
    this.receiptBatch = data.receiptBatch;
    this.createBatchReceipt = data.createBatchReceipt;
    this.receiptUpload = data.receiptUpload;
   }

  ngOnInit(): void {
  }

  setPolicyCodes({policyNo}) {
    this.policyService.getPolicyCodesByPolicyNo(policyNo)
      .subscribe((data: any) => {
        this.policyCodes[policyNo] = data
      })
  }

  getClientName(i: number) {
    this.policyService.getPolicyOwnersNameByPolicyNo(this.createBatchReceipt.receiptBatches[i].policyNo)
      .subscribe((data: any) => {
        this.createBatchReceipt.receiptBatches[i].clientName = data?.ownerName
        this.createBatchReceipt.receiptBatches[i].refNo = this.createBatchReceipt.receiptBatches[i].policyNo + "_" + this.createBatchReceipt.receiptBatches[i].policyCode
        this.createBatchReceipt.receiptBatches[i].refCat = "POL"
      })
  }

  removeReceiptBatch(i: number) {
    this.createBatchReceipt.receiptBatches.splice(i, 1)
  }


  addReceiptBatch() {
    var createcreateBatchReceipt = new ReceiptBatch();
    createcreateBatchReceipt.id = this.createBatchReceipt.receiptBatches.length + 1;
    this.createBatchReceipt.receiptBatches.push(createcreateBatchReceipt);
  }

  get totalAmountEntered(){
    return this.createBatchReceipt.receiptBatches.reduce((sum, item) => {
      const amount = +item.amount || 0;
      return sum + amount;
    }, 0)
  }
}
