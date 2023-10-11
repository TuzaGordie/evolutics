import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { BankService } from 'src/app/Services/bank.service';
import { LocationService } from 'src/app/Services/location.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IAccount } from 'src/app/Shared/models/account.interface';
import { configForms } from 'src/app/Shared/models/form.class';
import { environment } from 'src/environments/environment';
import { IndividualAgentService } from '../../agent-desk/new-individual-agent/services/individual-agent.service';
import { QuotationService } from '../../services/quotation-service.service';

@Component({
  templateUrl: './convert-quote-modal.component.html',
  styleUrls: ['./convert-quote-modal.component.scss'],
})
export class JointOwnerModalComponent implements OnInit {
  form = new FormGroup({
    reason: configForms.required(),
  });
  reasons: any[];
  file: File;
  clientNo: string;
  bankModel: boolean;
  mobileModel: boolean;
  loading: boolean;
  constructor(
    public uS: UtilityService,
    public qS: QuotationService,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<JointOwnerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientNo: string }
  ) {}

  async ngOnInit(): Promise<void> {
    this.reasons = await this.qS
      .getCodesBySubGroup('BASIS_CONVERSION')
      .toPromise();
    console.log(this.reasons);
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    const queryParams = this.route.snapshot.queryParamMap;
    const userCode = environment.user.code;
    const quoteNo = queryParams.get('quoteNo');
    const convert = this.qS
      .convertQuote(quoteNo, userCode, this.form.value.reason)
      .toPromise();
    await convert
      .then((data) => {
        console.log(data);
        this.uS.info(data.message, 1, `Quote ${quoteNo}`);
      })
      .catch((err) =>
        this.uS.info(`Quote ${quoteNo} not converted due to ${err.message}`, 0)
      );
  }
}
