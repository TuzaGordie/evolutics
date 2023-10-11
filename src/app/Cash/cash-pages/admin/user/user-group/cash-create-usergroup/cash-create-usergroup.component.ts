import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { UsersService } from 'src/app/Services/life/users.service';
import { BatchService } from 'src/app/Services/life/batch.service';
import { AppraisalService } from 'src/app/Services/life/appraisal.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { CreateCrmUserGroup, CrmUserGroup, CrmUserGroupBatches, CrmUserGroupDoc, CrmUserGroupPayout, CrmUserGroupTiers } from 'src/app/Shared/models/life/user/UserGroup';



@Component({
  selector: 'app-cash-create-usergroup',
  templateUrl: './cash-create-usergroup.component.html',
  styleUrls: ['./cash-create-usergroup.component.scss']
})
export class CashCreateUsergroupComponent implements OnInit {

  data = 'Receipting';

  operation: string = ''
  tab: string = 'Basic'

  private nbofpl: number = 1;
  private nbofpal: number = 1;
  private nbofqal: number = 1;
  private nbofdva: number = 1;
  private nbofpac: number = 1;

  templateMenu: { name: string, active: boolean }[] = [
    { name: 'Basic', active: true },
    { name: 'Batches', active: false },
    { name: 'Limits', active: false },
    { name: 'Documents', active: false }
  ]

  weekday: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  companyalloweddata: string[] = ['']
  branchesalloweddata: string[] = ['']
  private nbofappr: number = 1;
  private nbofbd: number = 1;
  private nbofbatches: number = 1;
  private nbofdocs: number = 1;

  appraisalCodes: any[] = []
  usergroup: any = ""
  userGroups: any[] = []
  tierCategories: any[] = []
  userIds: any[] = []
  currencies: any[] = []
  dayOfWeek: any[] = []
  allUserMenus: any[] = []
  documentCatCodes: any[] = []
  batchCodes: any[] = []
  documentSentivityCodes: any[] = []
  tierCompanyAndCodesPO: any[] = []
  tierCompanyAndCodesPA: any[] = []
  tierCompanyAndCodesQT: any[] = []
  tierCompanyAndCodesDV: any[] = []
  userid: string = ""

  crmUserGroup = new CrmUserGroup()
  crmUserGroupBatches = new CrmUserGroupBatches()
  crmUserGroupDoc = new CrmUserGroupDoc()
  crmUserGroupPayout = new CrmUserGroupPayout()
  crmUserGroupTiers = new CrmUserGroupTiers()
  createCrmUserGroup = new CreateCrmUserGroup(
    this.crmUserGroup,
    [this.crmUserGroupBatches],
    [this.crmUserGroupDoc],
    [this.crmUserGroupPayout],
    [this.crmUserGroupTiers]
  )

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private batchService: BatchService,
    private currencyService: CurrencyService,
    private codeService: CodeService,
    private appraisalService: AppraisalService,
    private commpanyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.populateTiersForm()
    this.getusersGroup()
    this.getCurrency()
    this.getBatcheCodes()
    this.getUserMenu()
    this.getAppraisalCodes()
    this.getTierCategory()
    this.getuserId()
    this.getDocumentCatCodes()
    this.getDocumentSentivityCodes()
    this.getTierCompanyAndCodesDV()
    this.getTierCompanyAndCodesQT()
    this.getTierCompanyAndCodesPO()
    this.getTierCompanyAndCodesPA()

    this.route.paramMap.subscribe(
      params => {
        const oper = params.get('operation')
        this.operation = oper ? oper : 'actions';
      }
    )
  }

  getUserMenu() {
    this.usersService.getAllUserMenus()
      .subscribe((data: any) => {
        this.allUserMenus = data
      })
  }

  getAppraisalCodes() {
    this.appraisalService.getAppraisalsSetup()
      .subscribe((data: any) => {
        this.appraisalCodes = data
      })
  }

  getTierCategory() {
    this.codeService.getCodesByCodeSubGroup("AUTH_TIER")
      .subscribe((data: any) => {
        this.tierCategories = data
      })
  }

  getTierCompanyAndCodesPA() {
    this.commpanyService.getCodeAndCompanyCodeTeirCat("PA")
      .subscribe((data: any) => {
        this.tierCompanyAndCodesPA = data
      })
  }

  getTierCompanyAndCodesPO() {
    this.commpanyService.getCodeAndCompanyCodeTeirCat("PO")
      .subscribe((data: any) => {
        this.tierCompanyAndCodesPO = data
      })
  }

  getTierCompanyAndCodesDV() {
    this.commpanyService.getCodeAndCompanyCodeTeirCat("DV")
      .subscribe((data: any) => {
        this.tierCompanyAndCodesDV = data
      })
  }

  getTierCompanyAndCodesQT() {
    this.commpanyService.getCodeAndCompanyCodeTeirCat("QT")
      .subscribe((data: any) => {
        this.tierCompanyAndCodesQT = data
      })
  }

  populateTiersForm() {
    let tiersPO = new CrmUserGroupTiers()
    tiersPO.tierCategory = "PO"
    tiersPO.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    this.createCrmUserGroup.crmUserGroupTiers.push(tiersPO)

    let tiersPA = new CrmUserGroupTiers()
    tiersPA.tierCategory = "PA"
    tiersPA.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    this.createCrmUserGroup.crmUserGroupTiers.push(tiersPA)

    let tiersQT = new CrmUserGroupTiers()
    tiersQT.tierCategory = "QT"
    tiersQT.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    this.createCrmUserGroup.crmUserGroupTiers.push(tiersQT)

    let tiersDV = new CrmUserGroupTiers()
    tiersDV.tierCategory = "DV"
    tiersDV.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    this.createCrmUserGroup.crmUserGroupTiers.push(tiersDV)
  }

  getBatcheCodes() {
    this.batchService.getBatcheCodeDesc()
      .subscribe((data: any) => {
        this.batchCodes = data
      })
  }

  onSelectGroup(group: string) {
    this.usergroup = group
  }

  getusersGroup() {
    this.usersService.getusersGroup()
      .subscribe((data: any) => {
        this.userGroups = data
      })
  }

  getuserId() {
    this.usersService.getuserId()
      .subscribe((data: any) => {
        this.userIds = data
      })
  }

  getCurrency() {
    this.currencyService.getCurrency()
      .subscribe((data: any) => {
        this.currencies = data
      })
  }

  addBatches() {
    let batches = new CrmUserGroupBatches()
    batches.id = this.createCrmUserGroup.crmUserGroupBatches.length + 1
    this.createCrmUserGroup.crmUserGroupBatches.push(batches)
  }

  removeBatches(i: number) {
    this.createCrmUserGroup.crmUserGroupBatches.splice(i, 1)
  }

  addQuotationApprovalLimit() {
    let tiers = new CrmUserGroupTiers()
    tiers.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    tiers.tierCategory = "QT"
    this.createCrmUserGroup.crmUserGroupTiers.push(tiers)
  }

  addPayoutAuthorisationLimits() {
    let tiers = new CrmUserGroupTiers()
    tiers.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    tiers.tierCategory = "PO"
    this.createCrmUserGroup.crmUserGroupTiers.push(tiers)
  }

  addDischargeVoucherAuthorization() {
    let tiers = new CrmUserGroupTiers()
    tiers.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    tiers.tierCategory = "DV"
    this.createCrmUserGroup.crmUserGroupTiers.push(tiers)
  }

  removeDischargeVoucherAuthorization(i: number) {
    this.createCrmUserGroup.crmUserGroupTiers.splice(i, 1);
  }

  addPolicyAccounting() {
    let tiers = new CrmUserGroupTiers()
    tiers.id = this.createCrmUserGroup.crmUserGroupTiers.length + 1
    tiers.tierCategory = "PA"
    this.createCrmUserGroup.crmUserGroupTiers.push(tiers)
  }

  removePolicyAccounting(i: number) {
    this.createCrmUserGroup.crmUserGroupTiers.splice(i, 1);
  }

  removePayoutAuthorisationLimits(i: number) {
    this.createCrmUserGroup.crmUserGroupTiers.splice(i, 1);
  }

  removeQuotationApprovalLimit(i: number) {
    this.createCrmUserGroup.crmUserGroupTiers.splice(i, 1);
  }

  addDocs() {
    let docs = new CrmUserGroupDoc()
    docs.id = this.createCrmUserGroup.crmUserGroupDoc.length + 1
    this.createCrmUserGroup.crmUserGroupDoc.push(docs)
  }

  removeDocs(i: number) {
    this.createCrmUserGroup.crmUserGroupDoc.splice(i, 1)
  }

  addPayoutLimits() {
    let batches = new CrmUserGroupPayout()
    batches.id = this.createCrmUserGroup.crmUserGroupPayout.length + 1
    this.createCrmUserGroup.crmUserGroupPayout.push(batches)
  }

  removePayoutLimits(i: number) {
    this.createCrmUserGroup.crmUserGroupPayout.splice(i, 1)
  }

  getDocumentCatCodes() {
    this.codeService.getCodesByCodeSubGroup("DOCUMENT_CATEGORY")
      .subscribe((data: []) => {
        this.documentCatCodes = data
      })
  }

  getDocumentSentivityCodes() {
    this.codeService.getCodesByCodeSubGroup("DOCUMENT_SENSITIVITY")
      .subscribe((data: []) => {
        this.documentSentivityCodes = data
      })
  }

  createUserGroup() {
    this.usersService.createUserGroup(this.createCrmUserGroup)
      .subscribe((data: any) => {
        alert("Crm user groupo created successfully!")
      })
  }

  createCrmUserGroupGroup() {

    this.createCrmUserGroup.crmUserGroupBatches.map(
      (user_: CrmUserGroupBatches, index: number) => {
        delete user_.id
      })

    this.createCrmUserGroup.crmUserGroupDoc.map(
      (user_: CrmUserGroupDoc, index: number) => {
        delete user_.id
      })

    this.createCrmUserGroup.crmUserGroupPayout.map(
      (user_: CrmUserGroupPayout, index: number) => {
        delete user_.id
      })

    this.createCrmUserGroup.crmUserGroupTiers.map(
      (user_: CrmUserGroupTiers, index: number) => {
        delete user_.id
      })

    var tiers = this.createCrmUserGroup.crmUserGroupTiers.filter(
      obj => !(obj && Object.keys(obj).length === 0)
    );

    this.createCrmUserGroup.crmUserGroupTiers = tiers

    this.usersService.createUserGroup(this.createCrmUserGroup)
      .subscribe((data: any) => {
        alert("Crm user group created successfully!")
      })
  }

  activate(name: string) {
    this.templateMenu.forEach(m => { m.active = (m.name === name) ? true : false })
    this.tab = name
  }

  addcompanydataallowedaccess() {
    this.companyalloweddata.push('')
  }

  addbranchdatallowedaccess() {
    this.branchesalloweddata.push('')
  }


  plCounter() {
    return new Array(this.nbofpl);
  }

  plInc() {
    this.nbofpl = this.nbofpl + 1
  }

  palCounter() {
    return new Array(this.nbofpal);
  }

  palInc() {
    this.nbofpal = this.nbofpal + 1
  }

  qalCounter() {
    return new Array(this.nbofqal);
  }

  qalInc() {
    this.nbofqal = this.nbofqal + 1
  }

  dvaCounter() {
    return new Array(this.nbofdva);
  }

  dvaInc() {
    this.nbofdva = this.nbofdva + 1
  }

  pacCounter() {
    return new Array(this.nbofpac);
  }

  pacInc() {
    this.nbofpac = this.nbofpac + 1
  }

  apprCounter() {
    return new Array(this.nbofappr);
  }

  apprInc() {
    this.nbofappr = this.nbofappr + 1
  }


  bdCounter() {
    return new Array(this.nbofbd);
  }

  bdInc() {
    this.nbofbd = this.nbofbd + 1
  }


  batchesCounter() {
    return new Array(this.nbofbatches);
  }

  batchesInc() {
    this.nbofbatches = this.nbofbatches + 1
  }

  docsInc() {
    this.nbofdocs = this.nbofdocs + 1
  }

  docsCounter() {
    return new Array(this.nbofdocs);
  }

  deletebranchdatallowedaccess() {
    this.branchesalloweddata.pop()
  }

  showSetup(value: any) {
    this.data = value
    console.log(this.data)
  }

}
