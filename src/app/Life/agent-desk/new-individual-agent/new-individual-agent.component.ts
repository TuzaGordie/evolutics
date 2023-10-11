import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { AgentInfoComponent } from './agent-info/agent-info.component';
import { LicenseComponent } from './license/license.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { IndividualAgentService } from './services/individual-agent.service';

@Component({
  selector: 'app-new-individual-agent',
  templateUrl: './new-individual-agent.component.html',
  styleUrls: ['./new-individual-agent.component.scss'],
})
export class NewIndividualAgentComponent implements OnInit {
  individualForm: FormGroup = new FormGroup({}); 
  clientNo: string;
  loading: boolean;
  clientType: string;
  constructor(
    public individualService: IndividualAgentService,
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public uS: UtilityService,
    public clientS: ClientService,
  ) {}

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.queryParamMap.get('clientNo');
    this.clientType = this.route.snapshot.queryParamMap.get('clientType')||this.route.snapshot.data.clientType;
    // if(this.clientType!=)
    // if (!this.clientNo) this.uS.back(); 
    this.individualForm = new FormGroup({
      paymentInformation: new FormGroup({
        accountName: new FormControl(null),
        accountNo: new FormControl(null),
        accountType: new FormControl(null),
        bankBranch: new FormControl(null),
        bankName: new FormControl(null),
        country: new FormControl(null, Validators.required),
        currency: new FormControl(null),
        frequency: new FormControl(null),
        payeeName: new FormControl(null),
        payoutMethod: new FormControl(null),
        sortCode: new FormControl(null),
      }),
      agentInformation: new FormGroup({
        branch: new FormControl(null),
        clientNo: new FormControl(null),
        company: new FormControl(null),
        hierarchyAgentNo: new FormControl(null),
        hierarchyAgentType: new FormControl(null),
        hierarchyManager: new FormControl(null),
        name: new FormControl(null),
        type: new FormControl(null),
        productList: new FormArray([
          new FormGroup({
            productClass: new FormControl(null),
            product: new FormControl(null),
          }),
        ]),
      }),
      license: new FormGroup({
        certificateNumber: new FormControl(null),
        licenseAuthority: new FormControl(null),
        expiryDate: new FormControl(null),
        licenceType: new FormControl(null),
        issueDate: new FormControl(null),
      }),
    });
  }

  get paymentInformation() {
    return this.individualForm.get('paymentInformation');
  }
  get agentInformation(): any {
    return this.individualForm.get('agentInformation');
  }
  get license() {
    return this.individualForm.get('license') as FormGroup;
  }
  changeTab(tab: any) {
    console.log('tab');
    this.individualService.tabChange(tab);
  }
  @ViewChild('agentInfoTab') agentInfoTabRef: AgentInfoComponent;
  @ViewChild('paymentInfoTab') paymentInfoTabRef: PaymentInfoComponent;
  @ViewChild('licenseTab') licenseTabRef: LicenseComponent;
  onSubmit() {
    this.loading = true;
    delete this.paymentInformation.value.country;
    delete this.paymentInformation.value.sortCode;
    delete this.paymentInformation.value.bankName;
    delete this.paymentInformation.value.bankBranch;
    delete this.paymentInformation.value.accountType;
    delete this.paymentInformation.value.accountName;
    delete this.paymentInformation.value.accountNo;
    this.agentInformation.value.clientNo = this.clientNo;
    const data = {
      paymentInformation: this.paymentInformation.value,
      agentInformation: this.agentInformation.value,
      license: this.license.value,
    };
    debugger
    const fd = new FormData();
    let docMetadata: IDocMetadata[] = [];
    if (this.licenseTabRef.file && this.licenseTabRef.file) {
      docMetadata.push({
        boxNo: '9',
        category: 'License',
        sensitivity: '12',
        subCategory: 'LIC',
        title: 'agent',
      });
      fd.append('files', this.licenseTabRef.file, this.licenseTabRef.file.name);
    }
    if (this.agentInfoTabRef.file && this.agentInfoTabRef.fileMetadata) {
      docMetadata.push(this.agentInfoTabRef.fileMetadata);
      fd.append(
        'files',
        this.agentInfoTabRef.file,
        this.agentInfoTabRef.file.name
      );
    }

    let formValueString = JSON.stringify(data);
    let docMetadataString = JSON.stringify(docMetadata);

    fd.append('request', formValueString);
    fd.append('document', docMetadataString);
    this.individualService.submitPostData(fd).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.uS
          .info(
            `Agent Number ${res.agentInformation.no} has been created successfully`,
            1
          )
          .then((r) => {
            this.uS.router.navigate(['../view-agent'], {
              queryParams: { agentNo: res.agentInformation.no },
              relativeTo: this.route,
            });
          });
      },
      (e) => {
        this.uS.info(`An error occurred`, 0);
        this.loading = false;
      }
    );
  }
}
