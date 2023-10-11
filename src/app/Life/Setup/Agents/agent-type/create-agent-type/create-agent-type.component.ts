import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { AgentType } from '../agent-type';
import { AgentTypeService } from '../agent-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/Services/utility.service';
import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';

@Component({
  selector: 'app-create-agent-type',
  templateUrl: './create-agent-type.component.html',
  styleUrls: ['./create-agent-type.component.scss'],
})
export class CreateSetupsAgentTypeComponent implements OnInit {
  @ViewChild('agentForm') form: NgForm;
  public commissionActionBasis: any;
  public channels: any;
  public branchNameAndDes: any;
  public salaryFreqLevel: any;
  public agentProdGroup: any;
  public agentSalaryLevel: any;
  public companyCode: any;
  public currencyCodeAndDes: any;
  public payments: [{ currCode: string; minPayAmount: number }] = [
    { currCode: '', minPayAmount: 1 },
  ];

  productClassList: any = [];
  productQualification: any[] = [];

  agentInformation: any;
  productListForm: any[] = [
    {
      productClass: '',
      product: '',
    },
  ];

  constructor(
    private agentTypeService: AgentTypeService,
    public utility: UtilityService,
    public individualS: IndividualAgentService
  ) {}

  loading = false;
  disableEdit: boolean = false;

  loopArrayFunc(res: any, genVar) {
    let scopeVar = [];
    for (let i = 0; i < res.length; i++) {
      scopeVar.push(res[i]);
    }
    genVar = scopeVar;
    return genVar;
  }

  public agentData: AgentType = {
    agentSetupType: {
      type: '',
      defaultBranch: '',
      description: '',
      company: '',
      channel: '',
      commTaxRate: null,
      agentBandBasis: '',
      holdComm: false,
      salaryLevel: '',
      salaryFreq: '',
      basicSalary: null,
      maxSalAchievable: null,
      commStatementActionBasis: '',
      maxNoOfAgents: null,
      minNoOfUnitsAgency: null,
      fixedNoOfAgentsAgency: null,
      maxNoOfUnitsAgency: null,
      minNoOfAgents: null,
      production: null,
      fixedNoAgentUnit: null,
      id: null,
    },
    agentSetupTypePayment: [
      {
        rowId: 1,
        id: null,
        currCode: '',
        minPayAmount: null,
      },
    ],
    agentSetuptypeVersion: {
      id: null,
      versionNo: null,
    },
  };

  ngOnInit(): void {
    // Getting all the dropdown Values from the database and parsing them to the template
    this.agentTypeService.getAgentSetupType();
    this.agentTypeService
      .getCodeAndTitleByCodeSubgroup('STATEMENT_ACTION')
      .subscribe((res) => {
        this.commissionActionBasis = this.loopArrayFunc(
          res,
          this.commissionActionBasis
        );
      });
    this.agentTypeService.getBranchCodeAndDescription().subscribe((res) => {
      this.branchNameAndDes = this.loopArrayFunc(res, this.branchNameAndDes);
    });
    this.agentTypeService
      .getCodeAndTitleByCodeSubgroup('AGENT_SALARY_LEVEL')
      .subscribe((res) => {
        this.agentSalaryLevel = this.loopArrayFunc(res, this.agentSalaryLevel);
      });
    this.agentTypeService.getCompanyCodeAndDescription().subscribe((res) => {
      this.companyCode = this.loopArrayFunc(res, this.companyCode);
    });

    this.agentTypeService
      .getCodeAndTitleByCodeSubgroup('FREQUENCY')
      .subscribe((res) => {
        this.salaryFreqLevel = this.loopArrayFunc(res, this.salaryFreqLevel);
      });
    this.agentTypeService
      .getCodeAndTitleByCodeSubgroup('AGENT_PROD_GROUP')
      .subscribe((res) => {
        this.agentProdGroup = this.loopArrayFunc(res, this.agentProdGroup);
      });
    this.agentTypeService
      .getCodeAndTitleByCodeSubgroup('CHANNEL')
      .subscribe((res) => {
        this.channels = this.loopArrayFunc(res, this.channels);
      });
    this.agentTypeService.getCurrencyCodeAndDescription().subscribe((res) => {
      this.currencyCodeAndDes = this.loopArrayFunc(
        res,
        this.currencyCodeAndDes
      );
    });

    var cloneAgentType: AgentType = JSON.parse(
      localStorage.getItem('cloneAgentType')
    );
    var showAgentType: AgentType = JSON.parse(
      localStorage.getItem('showAgentType')
    );

    if (cloneAgentType != null) {
      // Deleting all the id for the clone
      delete cloneAgentType.agentSetupType.id;
      delete cloneAgentType.agentSetuptypeVersion.id;
      for (
        let index = 0;
        index < cloneAgentType.agentSetupTypePayment.length;
        index++
      ) {
        delete cloneAgentType.agentSetupTypePayment[index].id;
      }
      this.agentData = cloneAgentType;
      localStorage.removeItem('cloneAgentType');
    }

    if (showAgentType != null) {
      this.agentData = showAgentType;
      this.disableEdit = true;
      localStorage.removeItem('showAgentType');
    }
  }

  addPayment() {
    this.agentData.agentSetupTypePayment.push({
      rowId: this.agentData.agentSetupTypePayment.length + 1,
      currCode: '',
      minPayAmount: 1,
    });
  }

  deletePayment(i: number) {
    this.payments.splice(i, 1);
  }

  createAgent() {
    if (this.form.form.invalid) {
      console.log(this.form.form);
      this.utility.notify('Some fields are required.', 0, 5000);
      return;
    }
    this.loading = true;
    this.agentTypeService.setupAgent(this.agentData).subscribe(
      () => {
        this.loading = false;
        this.utility.notify(
          'Agent Type has been created successfully!.',
          1,
          3000
        );
      },
      () => {
        this.loading = false;
        this.utility.notify('Error, Please try again later', 0, 3000);
      }
    );
  }

  getProductListForm() {
    this.productListForm = this.agentInformation.get('productList');
  }

  getProductCode = (productCls: string) => {
    // debugger
    return this.individualS.getProductList(productCls);
  };

  addProduct() {
    let data = {
      productClass: '',
      product: '',
    };
    this.productListForm.push(data);
  }
  removeProduct(index: number) {
    this.productListForm.splice(index, 1);
  }

  async setProductClassList() {
    this.productClassList = await this.individualS
      .getProductClassList()
      .toPromise();
  }
}
