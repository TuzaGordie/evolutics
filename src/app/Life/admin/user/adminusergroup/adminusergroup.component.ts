import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { AppraisalService } from 'src/app/Services/life/appraisal.service';
import { BatchService } from 'src/app/Services/life/batch.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UsersService } from 'src/app/Services/life/users.service';
import {
  CreateCrmUserGroup,
  CrmUserGroup,
  CrmUserGroupBatches,
  CrmUserGroupDoc,
  CrmUserGroupPayout,
  CrmUserGroupTiers,
} from 'src/app/Shared/models/life/user/UserGroup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { UsermenuService } from '../usermenu/usermenu-extras/usermenu.service';
import {
  MenuItemConfig,
  IUserMenu,
  IUserMenuConfig,
} from '../usermenu/usermenu-extras/usermenu.interface';
import { UserAccessModalService } from '../adminuser/user-access-modal/user-access-modal.service';
import { NgForm } from '@angular/forms';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';

@Component({
  selector: 'app-adminusergroup',
  templateUrl: './adminusergroup.component.html',
  styleUrls: ['./adminusergroup.component.scss'],
})
export class AdminusergroupComponent
  extends PageTemplateComponent
  implements OnInit
{
  @ViewChild('f') form: NgForm;

  operation: string = '';
  tab: string = 'Basic';

  private nbofpl: number = 1;
  private nbofpal: number = 1;
  private nbofqal: number = 1;
  private nbofdva: number = 1;
  private nbofpac: number = 1;

  templateMenu: { name: string; active: boolean }[] = [
    { name: 'Basic', active: true },
    { name: 'Batches', active: false },
    { name: 'Limits', active: false },
    { name: 'Documents', active: false },
  ];

  private nbofbatches: number = 1;
  private nbofdocs: number = 1;

  usergroup: string = '';
  userGroups: any[] = [];
  tiers: any[] = [];
  tierCategories: any[] = [];
  appraisalCodes: any[] = [];
  allUserMenus: IUserMenuConfig[] = [];
  batchCodes: any[] = [];
  userIds: any[] = [];
  currencies: any[] = [];
  dayOfWeek: any[] = [];
  documentCatCodes: any[] = [];
  documentSentivityCodes: any[] = [];
  tierCompanyAndCodesPO: any[] = [];
  tierCompanyAndCodesPA: any[] = [];
  tierCompanyAndCodesQT: any[] = [];
  tierCompanyAndCodesDV: any[] = [];
  userid: string = '';

  disableGroup: boolean = false;

  crmUserGroup = new CrmUserGroup();
  crmUserGroupBatches = new CrmUserGroupBatches();
  crmUserGroupDoc = new CrmUserGroupDoc();
  crmUserGroupPayout = new CrmUserGroupPayout();
  crmUserGroupTiers = new CrmUserGroupTiers();
  createCrmUserGroup = new CreateCrmUserGroup(
    this.crmUserGroup,
    [this.crmUserGroupBatches],
    [this.crmUserGroupDoc],
    [this.crmUserGroupPayout],
    [this.crmUserGroupTiers]
  );

  userGroupData: any = {};

  message = {
    success: false,
    warning: false,
    error: false,
  };

  loadingText = '';
  loading = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private userService: UsersService,
    private userMenuService: UsermenuService,
    private currencyService: CurrencyService,
    private codeService: CodeService,
    private batchService: BatchService,
    private commpanyService: CompanyService,
    private appraisalService: AppraisalService,
    private localStorage: StorageService,
    public utility: UtilityService,
    public userAccessService: UserAccessModalService
  ) {
    super(route, utility);
    this.idField = 'usergroup';
  }

  ngOnInit(): void {
    // this.populateTiersForm()
    this.getusersGroup();
    this.getCurrency();
    this.getBatcheCodes();
    this.getUserMenu();
    this.getAppraisalCodes();
    this.getTiers();
    this.getTierCategory();
    this.getuserId();
    this.getDocumentCatCodes();
    this.getDocumentSentivityCodes();
  }
  ngAfterViewInit(): void {
    super.init(() => {
      return this.fetchData().then((r) => {
        if (this.isShow) this.form.form.disable();
        setTimeout(() => {
          if (this.isShow) this.form.form.disable();
        }, 1000);
      });
    });
  }
  fetchData = async () => {
    return this.userService
      .getuserUserGroupByGroup(this.usergroup)  
      .toPromise()
      .then((r) => {
        if (this.isClone) {
          this.createCrmUserGroup.crmUserGroupBatches = [];
          this.createCrmUserGroup.crmUserGroupDoc = [];
          this.createCrmUserGroup.crmUserGroupPayout = [];
          this.createCrmUserGroup.crmUserGroupTiers = [];

          this.createCrmUserGroup.crmUserGroup = r.crmUserGroup;

          delete this.createCrmUserGroup.crmUserGroup.group;
          delete this.createCrmUserGroup.crmUserGroup.id;

          r.crmUserGroupBatches.map((crmUserGroupBatches, index) => {
            crmUserGroupBatches.rowId = index;
            crmUserGroupBatches.deleted = false;
            this.createCrmUserGroup.crmUserGroupBatches.push(
              crmUserGroupBatches
            );
          });

          r.crmUserGroupDoc.map((crmUserGroupDoc, index) => {
            crmUserGroupDoc.rowId = index;
            crmUserGroupDoc.deleted = false;
            this.createCrmUserGroup.crmUserGroupDoc.push(crmUserGroupDoc);
          });

          r.crmUserGroupPayout.map((crmUserGroupPayout, index) => {
            crmUserGroupPayout.rowId = index;
            crmUserGroupPayout.deleted = false;
            this.createCrmUserGroup.crmUserGroupPayout.push(crmUserGroupPayout);
          });

          r.crmUserGroupTiers.map((crmUserGroupTiers, index) => {
            crmUserGroupTiers.rowId = index;
            crmUserGroupTiers.deleted = false;
            this.createCrmUserGroup.crmUserGroupTiers.push(crmUserGroupTiers);
          });
        } else if (this.isShow || this.isEdit) {
          this.createCrmUserGroup.crmUserGroupBatches = [];
          this.createCrmUserGroup.crmUserGroupDoc = [];
          this.createCrmUserGroup.crmUserGroupPayout = [];
          this.createCrmUserGroup.crmUserGroupTiers = [];

          this.createCrmUserGroup.crmUserGroup = r.crmUserGroup;

          this.disableGroup = true;

          r.crmUserGroupBatches.map((crmUserGroupBatches, index) => {
            crmUserGroupBatches.rowId = index;
            crmUserGroupBatches.deleted = false;
            this.createCrmUserGroup.crmUserGroupBatches.push(
              crmUserGroupBatches
            );
          });

          r.crmUserGroupDoc.map((crmUserGroupDoc, index) => {
            crmUserGroupDoc.rowId = index;
            crmUserGroupDoc.deleted = false;
            this.createCrmUserGroup.crmUserGroupDoc.push(crmUserGroupDoc);
          });

          r.crmUserGroupPayout.map((crmUserGroupPayout, index) => {
            crmUserGroupPayout.rowId = index;
            crmUserGroupPayout.deleted = false;
            this.createCrmUserGroup.crmUserGroupPayout.push(crmUserGroupPayout);
          });

          r.crmUserGroupTiers.map((crmUserGroupTiers, index) => {
            crmUserGroupTiers.rowId = index;
            crmUserGroupTiers.deleted = false;
            this.createCrmUserGroup.crmUserGroupTiers.push(crmUserGroupTiers);
          });
        }
      });
  };
  fetchUserGroup(action: string, path: string): void {
    this.router.navigate([path], {
      relativeTo: this.route,
      queryParams: { usergroup: this.usergroup },
    });
  }

  show(): void {
    if (this.usergroup?.trim() != '') this.fetchUserGroup('update', 'show');
    else this.message.error = true;
  }

  clone(): void {
    if (this.usergroup?.trim() != '') this.fetchUserGroup('clone', 'clone');
    else this.message.error = true;
  }

  openAccess() {
    this.userAccessService.openAccess(this.form.form, this.isShow);
  }
  getUserMenu() {
    this.userMenuService.getAllUserMenus().subscribe((data) => {
      this.allUserMenus = data;
    });
  }

  getAppraisalCodes() {
    this.appraisalService.getAppraisalsSetup().subscribe((data: any) => {
      this.appraisalCodes = data;
    });
  }

  getTiers() {
    this.codeService
      .getCodesByCodeSubGroup('AUTH_TIER')
      .subscribe((data: any) => {
        this.tiers = data;
      });
  }

  getTierCategory() {
    this.codeService
      .getCodesByCodeSubGroup('TIER_CATEGORY')
      .subscribe((data: any) => {
        this.tierCategories = data;
      });
  }

  onSelectGroup(group: string) {
    this.usergroup = group;
  }

  getusersGroup() {
    this.userService.getusersGroup().subscribe((data: any) => {
      this.userGroups = data;
    });
  }

  getBatcheCodes() {
    this.batchService.getBatcheCodeDesc().subscribe((data: any) => {
      this.batchCodes = data;
    });
  }

  getuserId() {
    this.userService.getuserId().subscribe((data: any) => {
      this.userIds = data;
    });
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe((data: any) => {
      this.currencies = data;
    });
  }

  addBatches(index: number) {
    let batches = new CrmUserGroupBatches();
    batches.deleted = false;
    batches.rowId = this.createCrmUserGroup.crmUserGroupBatches.length + 1;
    this.createCrmUserGroup.crmUserGroupBatches.splice(index, 0, batches);
  }

  removeBatches(i: number) {
    if (this.createCrmUserGroup.crmUserGroupBatches[i].id != null)
      this.createCrmUserGroup.crmUserGroupBatches[i].deleted = true;
    else this.createCrmUserGroup.crmUserGroupBatches.splice(i, 1);
  }

  addDocs(index: number) {
    let docs = new CrmUserGroupDoc();
    docs.deleted = false;
    docs.rowId = this.createCrmUserGroup.crmUserGroupDoc.length + 1;
    this.createCrmUserGroup.crmUserGroupDoc.splice(index, 0, docs);
  }

  removeDocs(i: number) {
    if (this.createCrmUserGroup.crmUserGroupDoc[i].id != null)
      this.createCrmUserGroup.crmUserGroupDoc[i].deleted = true;
    else this.createCrmUserGroup.crmUserGroupDoc.splice(i, 1);
  }

  populateTiersForm() {
    this.addTiers('PO');
    this.addTiers('PA');
    this.addTiers('QT');
    this.addTiers('DV');
  }

  addPayoutLimits() {
    let payouts = new CrmUserGroupPayout();
    payouts.deleted = false;
    payouts.rowId = this.createCrmUserGroup.crmUserGroupPayout.length + 1;
    this.createCrmUserGroup.crmUserGroupPayout.push(payouts);
  }

  removePayoutLimits(i: number) {
    if (this.createCrmUserGroup.crmUserGroupPayout[i].id != null)
      this.createCrmUserGroup.crmUserGroupPayout[i].deleted = true;
    else this.createCrmUserGroup.crmUserGroupPayout.splice(i, 1);
  }

  addTiers(
    cat?: string,
    index: number = this.createCrmUserGroup.crmUserGroupTiers?.length
  ) {
    let tier = new CrmUserGroupTiers();
    tier.deleted = false;
    tier.rowId = this.createCrmUserGroup.crmUserGroupTiers.length + 1;
    tier.tierCategory = cat;
    this.createCrmUserGroup.crmUserGroupTiers.splice(index, 0, tier);
  }

  removeTiers(i: number) {
    if (this.createCrmUserGroup.crmUserGroupTiers[i].id != null)
      this.createCrmUserGroup.crmUserGroupTiers[i].deleted = true;
    else this.createCrmUserGroup.crmUserGroupTiers.splice(i, 1);
  }

  getDocumentCatCodes() {
    this.codeService
      .getCodesByCodeSubGroup('DOCUMENT_CATEGORY')
      .subscribe((data: []) => {
        this.documentCatCodes = data;
      });
  }

  getDocumentSentivityCodes() {
    this.codeService
      .getCodesByCodeSubGroup('DOCUMENT_SENSITIVITY')
      .subscribe((data: []) => {
        this.documentSentivityCodes = data;
      });
  }

  createCrmUserGroupGroup() {
    if (this.form.valid ) {
      this.loading = true;
      this.loadingText = 'Saving User Group.....';
      if (this.route.snapshot.queryParams.action == 'clone')
        delete this.createCrmUserGroup.crmUserGroup.id;
      if (
        this.createCrmUserGroup.crmUserGroup.id == null ||
        this.createCrmUserGroup.crmUserGroup.id == undefined
      ) {
        this.createCrmUserGroup.crmUserGroupBatches.map(
          (user_: CrmUserGroupBatches, index: number) => {
            delete user_.id;
          }
        );

        this.createCrmUserGroup.crmUserGroupDoc.map(
          (user_: CrmUserGroupDoc, index: number) => {
            delete user_.id;
          }
        );

        this.createCrmUserGroup.crmUserGroupPayout.map(
          (user_: CrmUserGroupPayout, index: number) => {
            delete user_.id;
          }
        );

        this.createCrmUserGroup.crmUserGroupTiers.map(
          (user_: CrmUserGroupTiers, index: number) => {
            delete user_.id;
          }
        );
        this.createCrmUserGroup.crmUserGroupTiers =
          this.createCrmUserGroup.crmUserGroupTiers?.filter(
            (x) => x.tierCode || x.tierCategory || x.currCode
          );
      }
      this.userService.createUserGroup(this.createCrmUserGroup).subscribe(
        (data) => {
          this.loading = false;
          this.utility.info(
            `User group ${data?.crmUserGroup?.group} saved successfully!`,
            1
          );
        },
        (err: any) => {
          this.loading = false;
          this.utility.info('Internal server error.', 0);
        }
      );
    } else {
      this.utility.notify('Kindly fill all required fields to continue!.', 2);
    }
  }

  activate(name: string) {
    this.templateMenu.forEach((m) => {
      m.active = m.name === name ? true : false;
    });
    this.tab = name;
  }

  plCounter() {
    return new Array(this.nbofpl);
  }

  plInc() {
    this.nbofpl = this.nbofpl + 1;
  }

  palCounter() {
    return new Array(this.nbofpal);
  }

  palInc() {
    this.nbofpal = this.nbofpal + 1;
  }

  qalCounter() {
    return new Array(this.nbofqal);
  }

  qalInc() {
    this.nbofqal = this.nbofqal + 1;
  }

  dvaCounter() {
    return new Array(this.nbofdva);
  }

  dvaInc() {
    this.nbofdva = this.nbofdva + 1;
  }

  pacCounter() {
    return new Array(this.nbofpac);
  }

  pacInc() {
    this.nbofpac = this.nbofpac + 1;
  }

  batchesCounter() {
    return new Array(this.nbofbatches);
  }

  batchesInc() {
    this.nbofbatches = this.nbofbatches + 1;
  }

  docsInc() {
    this.nbofdocs = this.nbofdocs + 1;
  }

  docsCounter() {
    return new Array(this.nbofdocs);
  }
}
