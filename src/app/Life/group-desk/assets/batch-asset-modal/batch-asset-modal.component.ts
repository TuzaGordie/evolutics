import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchUploadBaseComponent } from 'src/app/CRMS/crms-pages/admin/admin-pages/batch-uploads/batch-uploads-comps/batch-upload-base/batch-upload-base.component';
import { PolicyService } from 'src/app/Services/cash/policy.service';
import { CodeService } from 'src/app/Services/code.service';
import { InputTableComponent } from 'src/app/Shared/components/input-table/input-table.component';
import { ReceiptBatch } from 'src/app/Shared/models/cash/receipt';

@Component({
  selector: 'app-batch-asset-modal',
  templateUrl: './batch-asset-modal.component.html',
  styleUrls: ['./batch-asset-modal.component.scss'],
})
export class BatchAssetModalComponent
  extends BatchUploadBaseComponent
  implements OnInit
{
  mode: 'UPLOAD' | 'MANUAL';
  asset;
  receiptBatch;
  createBatchReceipt;
  receiptUpload;
  schemas: any[];
  title: any;

  policyCodes = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private policyService: PolicyService,
    private codeS: CodeService
  ) {
    super();
    console.log(data);
    this.title = 'Batch Asset Upload';
    this.mode = data.mode;
    this.asset = data.asset;
    this.receiptBatch = data.receiptBatch;
    this.createBatchReceipt = data.createBatchReceipt;
    this.receiptUpload = data.receiptUpload;
  }

  ngOnInit(): void {
    this.init(
      Promise.all([
        this.codeS.getAllCodeByCodeSubGroup('vehicle_category').toPromise(),
        this.codeS.getAllCodeByCodeSubGroup('vehicle_genre').toPromise(),
      ])
    ).then((rs) => {
      this.schemas = [
        {
          f: 'Asset Id',
          t: 'Asset ID',
          type: 'text',
          validators: Validators.required,
        },
        {
          f: 'Brand Code',
          t: 'Brand Code',
          type: 'text',
          validators: Validators.required,
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'Make Code',
          t: 'Make Code',
          type: 'text',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'Asset Redg No',
          t: 'Asset Redg No',
          type: 'email',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'Year Manufactured',
          t: 'Year Manufactured',
          type: 'email',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'Engine Number',
          t: 'Engine No',
          type: 'text',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'Chasis Number',
          t: 'Chasis No',
          type: 'text',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'vin',
          t: 'VIN',
          type: 'text',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'Location City',
          t: 'Location City',
          type: 'text',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'vehicle_category',
          t: 'Vehicle Cat',
          type: 'select',
          options: rs[0],
          labelType: 'ct',
          valueField: 'code',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'vehicle_genre',
          t: 'Vehicle Genre',
          type: 'select',
          options: rs[1],
          labelType: 'ct',
          valueField: 'code',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'mv_client',
          t: 'Mv Client',
          type: 'text',
          disabledIf: (row: any) => row['Asset ID'],
        },
        {
          f: 'cover_value',
          t: 'Cover Value',
          type: 'text',
        },
        {
          f: 'subgroup',
          t: 'Subgroup',
          type: 'text',
        },
        {
          f: 'assured',
          t: 'Assured',
          type: 'text',
        },
        {
          f: 'assured_name',
          t: 'Assured Name',
          type: 'text',
        },
        {
          f: 'join_date',
          t: 'Join Date',
          hint: 'yyyy-MM-dd',
          type: 'date',
        },
        {
          f: 'leave_date',
          t: 'Leave Date',
          hint: 'yyyy-MM-dd',
          type: 'date',
        },
        {
          f: 'change_date',
          t: 'Change Date',
          hint: 'yyyy-MM-dd',
          type: 'date',
        },
      ];
    });
  }

  setPolicyCodes({ policyNo }) {
    this.policyService
      .getPolicyCodesByPolicyNo(policyNo)
      .subscribe((data: any) => {
        this.policyCodes[policyNo] = data;
      });
  }

  getClientName(i: number) {
    this.policyService
      .getPolicyOwnersNameByPolicyNo(
        this.createBatchReceipt.receiptBatches[i].policyNo
      )
      .subscribe((data: any) => {
        this.createBatchReceipt.receiptBatches[i].clientName = data?.ownerName;
        this.createBatchReceipt.receiptBatches[i].refNo =
          this.createBatchReceipt.receiptBatches[i].policyNo +
          '_' +
          this.createBatchReceipt.receiptBatches[i].policyCode;
        this.createBatchReceipt.receiptBatches[i].refCat = 'POL';
      });
  }

  removeReceiptBatch(i: number) {
    this.createBatchReceipt.receiptBatches.splice(i, 1);
  }

  addReceiptBatch() {
    var createcreateBatchReceipt = new ReceiptBatch();
    createcreateBatchReceipt.id =
      this.createBatchReceipt.receiptBatches.length + 1;
    this.createBatchReceipt.receiptBatches.push(createcreateBatchReceipt);
  }

  // get totalAmountEntered() {
  //   return this.createBatchReceipt.receiptBatches.reduce((sum, item) => {
  //     const amount = +item.amount || 0;
  //     return sum + amount;
  //   }, 0);
  // }
}
