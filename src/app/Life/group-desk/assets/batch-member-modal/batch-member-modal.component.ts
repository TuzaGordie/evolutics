import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchUploadBaseComponent } from 'src/app/CRMS/crms-pages/admin/admin-pages/batch-uploads/batch-uploads-comps/batch-upload-base/batch-upload-base.component';
import { PolicyService } from 'src/app/Services/cash/policy.service';
import { CodeService } from 'src/app/Services/code.service';
import { LocationService } from 'src/app/Services/location.service';
import { InputTableComponent } from 'src/app/Shared/components/input-table/input-table.component';
import { ReceiptBatch } from 'src/app/Shared/models/cash/receipt';

@Component({
  selector: 'app-batch-member-modal',
  templateUrl: './batch-member-modal.component.html',
  styleUrls: ['./batch-member-modal.component.scss'],
})
export class BatchMemberModalComponent
  extends BatchUploadBaseComponent
  implements OnInit
{
  mode: 'UPLOAD' | 'MANUAL';
  schemas: any[];
  title: any;

  policyCodes = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private policyService: PolicyService,
    private codeS: CodeService,
    privatelocS: LocationService
  ) {
    super();
    console.log(data);
    this.title = 'Batch Member Upload';
    this.mode = data.mode;
  }

  ngOnInit(): void {
    this.init(
      Promise.all([
        this.codeS.getAllCodeByCodeSubGroup('gender').toPromise(),
        this.codeS.getAllCodeByCodeSubGroup('marital_status').toPromise(),
      ])
    ).then((rs) => {
      this.schemas = [
        {
          f: 'Client No',
          t: 'Client No',
          type: 'text',
          validators: Validators.required,
        },
        {
          f: 'Title',
          t: 'Title',
          type: 'select',
          options: rs[0],
          labelType: 'ct',
          valueField: 'code',
          validators: Validators.required,
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'First Care',
          t: 'First Name',
          type: 'text',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Middle Name',
          t: 'Middle Name',
          type: 'email',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Surname',
          t: 'Surname',
          type: 'email',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Gender',
          t: 'Gender',
          type: 'select',
          options: rs[0],
          labelType: 'ct',
          valueField: 'code',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Marital Status',
          t: 'Marital Status',
          type: 'select',
          options: rs[1],
          labelType: 'ct',
          valueField: 'code',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Date of Birth',
          t: 'Date of Birth',
          type: 'date',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Address',
          t: 'Address',
          type: 'text',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'City',
          t: 'City',
          type: 'text',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Phone',
          t: 'Phone',
          type: 'text',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Email',
          t: 'Email',
          type: 'text',
          disabledIf: (row: any) => row['Client No'],
        },
        {
          f: 'Salary',
          t: 'Salary',
          type: 'text',
        },
        {
          f: 'Cover Value',
          t: 'Cover Value',
          type: 'text',
        },
        {
          f: 'Staff ID',
          t: 'Staff ID',
          type: 'text',
        },
        {
          f: 'Subgroup',
          t: 'Subgroup',
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

  // get totalAmountEntered() {
  //   return this.createBatchReceipt.receiptBatches.reduce((sum, item) => {
  //     const amount = +item.amount || 0;
  //     return sum + amount;
  //   }, 0);
  // }
}
