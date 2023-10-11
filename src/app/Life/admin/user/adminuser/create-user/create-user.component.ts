import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { CodeService } from 'src/app/Services/code.service';
import { DocumentService } from 'src/app/Services/document.service';
import { AppraisalService } from 'src/app/Services/life/appraisal.service';
import { BranchService } from 'src/app/Services/life/branch.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { UsersService } from 'src/app/Services/life/users.service';
import { PageService } from 'src/app/Services/page.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Services/utility.service';
import {
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import { CreateUser, UserGroup } from 'src/app/Shared/models/life/user/Users';
import { IUserMenuConfig } from '../../usermenu/usermenu-extras/usermenu.interface';
import { UsermenuService } from '../../usermenu/usermenu-extras/usermenu.service';
import { UserAccessModalComponent } from '../user-access-modal/user-access-modal.component';
import { UserAccessModalService } from '../user-access-modal/user-access-modal.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form = new FormGroup({
    users: new FormGroup({
      allowAuthAgent: new FormControl(false),
      allowAuthClient: new FormControl(false),
      allowAuthCoupon: new FormControl(false),
      allowAuthPolicy: new FormControl(false),
      allowAuthPolicyAcct: new FormControl(false),
      allowAuthSetup: new FormControl(false),
      allowAuthSnooze: new FormControl(false),
      allowAuthSuspenseSwitch: new FormControl(false),
      allowReassignWf: new FormControl(false),
      allowSnooze: new FormControl(false),
      allowTermWf: new FormControl(false),
      allowWs: new FormControl(false),
      appraisalCode: new FormControl(),
      appraisalCoy: new FormControl(),
      clientNo: new FormControl(null, Validators.required),
      code: new FormControl(),
      createdBy: new FormControl(),
      directSupervisor: new FormControl(),
      discountLimit: new FormControl(),
      divCode: new FormControl(),
      docBox: new FormControl(),
      email: new FormControl(
        null,
        Validators.email,
        this.validateEmail.bind(this)
      ),
      expiryOn: new FormControl(),
      firstName: new FormControl(),
      fullName: new FormControl(),
      group: new FormControl(),
      handoverUser: new FormControl(),
      id: new FormControl(),
      imageUrl: new FormControl(),
      language: new FormControl(),
      lastName: new FormControl(),
      onBreak: new FormControl(false),
      outOfOffice: new FormControl(false),
      overrideExistClient: new FormControl(false),
      partTimeWeight: new FormControl(100),
      password: new FormControl(),
      primaryCompany: new FormControl(),
      reliefOfficer: new FormControl(),
      relManager: new FormControl(false),
      sendNoticeWf: new FormControl(false),
      status: new FormControl('A'),
      subDivCode: new FormControl(),
      subRelManager: new FormControl(false),
      teamCode: new FormControl(),
      tm: new FormControl(false),
      userJobRole: new FormControl(),
      userMenu: new FormControl(),
      userName: new FormControl(
        null,
        Validators.required,
        this.validateUsername.bind(this)
      ),
      wfAutoReassignUser: new FormControl(),
    }),
    usersBranch: new FormArray([]),
    usersCompany: new FormArray([]),
    usersPayoutList: new FormArray([]),
    usersTiers: new FormArray([]),
    userWorkingTimes: new FormArray([]),
    usersOutOfOffice: new FormGroup({
      createdBy: new FormControl(),
      id: new FormControl(),
      outOfOfficeFrom: new FormControl(),
      outOfOfficeTo: new FormControl(),
      updatedBy: new FormControl(),
      userCode: new FormControl(),
      usersId: new FormControl(),
    }),
  });
  user: CreateUser;
  loading: boolean;
  tierCategories: ICodeTitle[];
  currencies: ICodeDescription[];
  tiers: ICodeTitle[];
  userId: any;
  clientNo: any;
  companyCodes: ICodeDescription[];
  users: any[];
  file: File;
  uploadImg: any;
  loadingText: string;
  userGroup: UserGroup;
  constructor(
    public uS: UtilityService,
    public route: ActivatedRoute,
    public appraisalService: AppraisalService,
    public branchService: BranchService,
    public clientService: ClientService,
    public codeService: CodeService,
    public companyService: CompanyService,
    public currencyService: CurrencyService,
    public documentService: DocumentService,
    public domSanitizer: DomSanitizer,
    public fb: FormBuilder,
    public router: Router,
    public umS: UsermenuService,
    public userService: UsersService,
    public userService2: UserService,
    public pageS: PageService,
    public userAccessService: UserAccessModalService
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.codeService
      .getCodesByCodeSubGroup('DAYS_OF_WEEK')
      .toPromise()
      .then((data) => {
        data.forEach((x) => this.addUserWorkingTimes(null, { day: x.title }));
      });
    this.codeService
      .getCodesByCodeSubGroup('TIER_CATEGORY')
      .subscribe((data) => {
        this.tierCategories = data;
      });
    this.currencyService.getCurrency().subscribe((data) => {
      this.currencies = data;
    });
    this.codeService.getCodesByCodeSubGroup('AUTH_TIER').subscribe((data) => {
      this.tiers = data;
    });
    this.companyService.getCompanyCodeAndDesc().subscribe((data) => {
      this.companyCodes = data;
    });
    this.userService.getAllUsers().subscribe((r) => {
      this.users = r;
    });
    try {
      this.userId = this.route.snapshot.queryParams.id;
      this.clientNo = this.route.snapshot.queryParams.clientNo;
      if (!this.isCreate) {
        if (this.userId) {
          this.user = await this.userService
            .getUserByUserId(this.userId)
            .toPromise();
          if (!this.user) throw `User with ID ${this.userId} does not exist`;
          this.form.patchValue(this.user);
          this.initializeArrays();
          if (this.isShow) this.form.disable();
        } else {
          throw 'User ID is required';
        }
      } else {
        if (!this.clientNo) throw `Client number is required to create a user`;
        const client = await this.clientService
          .getClientViewData(this.clientNo)
          .toPromise();
        if (!client) throw `Client with number ${this.clientNo} was not found`;
        this.userFG.patchValue({
          clientNo: this.clientNo,
          firstName: client?.firstName,
          fullName: client?.fullName,
          lastName: client?.surname,
        });
        this.initializeArrays();
      }
    } catch (error) {
      console.error(error);
      await this.uS.info(error, 0);
      this.uS.back();
    }
    this.loading = false;
  }

  initializeArrays() {
    this.user?.usersTiers?.forEach((x) => this.addUserTiers(null, x));
    if (!this.userTiersFA.controls.length) this.addUserTiers();

    this.user?.usersBranch?.forEach((x) => this.addUserBranch(null, x));
    if (!this.userBranchesFA.controls.length) this.addUserBranch();

    this.user?.usersCompany?.forEach((x) => this.addUserCompany(null, x, true));
    if (!this.userCompanyFA.controls.length)
      this.addUserCompany(null, null, true);

    if (this.user?.userWorkingTimes?.length) {
      this.user.userWorkingTimes.forEach((uwt) => {
        this.userWorkingTimesFA.controls
          .find((x) => x.value?.day == uwt.day)
          ?.patchValue(uwt);
      });
    }
  }

  get userFG() {
    return this.form.get('users') as FormGroup;
  }

  get usersOutOfOfficeFG() {
    return this.form.get('usersOutOfOffice') as FormGroup;
  }

  get userImageUrl() {
    return this.userFG.get('imageUrl');
  }

  uploadFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];

    this.uploadImg = this.domSanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(this.file)
    ) as any;
  }
  openAccess() {
    this.userAccessService.openAccess(this.userFG, this.isShow);
  }
  //#region usersBranch
  get userBranchesFA() {
    return this.form.get('usersBranch') as FormArray;
  }
  addUserBranch(i = this.userBranchesFA.controls?.length, val?: any) {
    const form = new FormGroup({
      id: new FormControl(),
      userCode: new FormControl(),
      branches: new FormControl(),
      createdBy: new FormControl(),
      deleted: new FormControl(false),
    });
    if (val) form.patchValue(val);
    this.userBranchesFA.insert(i, form);
  }
  removeUserBranch(i: number) {
    this.userBranchesFA.removeAt(i);
  }
  //#endregion

  //#region userWorkingTimes
  get userWorkingTimesFA() {
    return this.form.get('userWorkingTimes') as FormArray;
  }
  addUserWorkingTimes(i = this.userWorkingTimesFA.controls?.length, val?: any) {
    // debugger
    const form = new FormGroup({
      createdBy: new FormControl(),
      closeTime: new FormControl(),
      openTime: new FormControl(),
      day: new FormControl(),
      id: new FormControl(),
      deleted: new FormControl(false),
    });
    if (val) form.patchValue(val);
    this.userWorkingTimesFA.insert(
      i || this.userWorkingTimesFA.controls?.length,
      form
    );
  }
  removeUserWorkingTimes(i: number) {
    this.userWorkingTimesFA.removeAt(i);
  }
  //#endregion

  //#region usersTiers
  get userTiersFA() {
    return this.form.get('usersTiers') as FormArray;
  }
  addUserTiers(i = this.userTiersFA.controls?.length, val?: any) {
    const form = new FormGroup({
      createdBy: new FormControl(),
      currCode: new FormControl(),
      deleted: new FormControl(false),
      id: new FormControl(),
      limit: new FormControl(),
      tierCategory: new FormControl(),
      tierCode: new FormControl(),
      userCode: new FormControl(),
    });
    if (val) form.patchValue(val);
    this.userTiersFA.insert(i || this.userTiersFA.controls?.length, form);
  }
  removeUserTiers(i: number) {
    this.userTiersFA.removeAt(i);
  }
  //#endregion

  //#region usersPayoutList
  get usersPayoutListFA() {
    return this.form.get('usersPayoutList') as FormArray;
  }
  addUsersPayoutList(i = this.usersPayoutListFA.controls?.length, val?: any) {
    const form = new FormGroup({
      id: new FormControl(),

      currCode: new FormControl(),
      payoutLimit: new FormControl(),
      userCode: new FormControl(),
      createdBy: new FormControl(),
      deleted: new FormControl(false),
    });
    if (val) form.patchValue(val);
    this.usersPayoutListFA.insert(i, form);
  }
  removeUsersPayoutList(i: number) {
    this.usersPayoutListFA.removeAt(i);
  }
  //#endregion

  //#region usersCompany
  get userCompanyFA() {
    return this.form.get('usersCompany') as FormArray;
  }
  addUserCompany(
    i = this.userCompanyFA.controls?.length,
    val?: any,
    dontAddBranch?: boolean
  ) {
    const form = new FormGroup({
      id: new FormControl(),
      companyCode: new FormControl(),
      appraisalCompany: new FormControl(),
      userCode: new FormControl(),
      createdBy: new FormControl(),
      deleted: new FormControl(false),
    });
    if (val) form.patchValue(val);
    else if (i == 0) form.patchValue({});
    this.userCompanyFA.insert(i, form);
  }
  removeUserCompany(i: number) {
    this.userCompanyFA.removeAt(i);
    this.removeUserBranch(i);
  }
  //#endregion
  getUserGroup(group) {
    if (this.userFG.get('group').valid)
      this.userService.getuserUserGroupByGroup(group).subscribe((r) => {
        this.userGroup = r;
        if (r?.crmUserGroup?.defaultMenu)
          this.userFG.patchValue({ userMenu: r.crmUserGroup.defaultMenu });
        if (r.crmUserGroupTiers) {
          this.userTiersFA.clear();
          r.crmUserGroupTiers
            .filter((x) => x.tierCategory || x.currCode || x.tierCode)
            .forEach((t) => {
              delete t.id
              this.addUserTiers(null, t);
            });
        }
      });
  }
  patchCompanyList(e) {
    this.userCompanyFA.controls[0].patchValue({ appraisalCompany: e });
  }
  get isShow() {
    return this.pageS.isShow(this.route);
  }

  get isEdit() {
    return this.pageS.isEdit(this.route);
  }

  get isCreate() {
    return this.pageS.isCreate(this.route);
  }

  makeUserCode() {
    if (this.userFG.controls.email.value && this.isCreate) {
      let code = this.userFG.controls.email.value?.split('@')[0];
      this.userFG.patchValue({ userName: code });
    }
  }
  validateEmail(control: AbstractControl) {
    return new Promise((res) => {
      const email = control?.value;
      if (this.isEdit) res(null);
      else if (!email?.trim()) res(null);
      else {
        this.userService2.checkIfClientExistsBy({ email }).subscribe(
          (r) => {
            if (r) {
              res({ notUnique: true });
            } else {
              res(null);
            }
          },
          (err) => {
            res(null);
          }
        );
      }
    });
  }
  validateUsername(control: AbstractControl) {
    return new Promise((res) => {
      const userName = control?.value;
      if (this.isEdit) res(null);
      else if (!userName?.trim()) res(null);
      else {
        this.userService2.checkIfClientExistsBy({ userName }).subscribe(
          (r) => {
            if (r) {
              res({ notUnique: true });
            } else {
              res(null);
            }
          },
          (err) => {
            res(null);
          }
        );
      }
    });
  }

  public formatPayload(data: CreateUser) {
    data.userWorkingTimes = data.userWorkingTimes.filter(
      (x) => x.openTime || x.closeTime || x.id
    );
    data.usersTiers = data.usersTiers.filter(
      (x) => x.id || x.currCode || x.limit || x.tierCategory || x.tierCode
    );
    return data;
  }

  submitPassPortPhoto(userName: string) {
    var document = {
      refCat: 'USR',
      refNo: userName,
      subCategory: 'PP',
      userCode: userName,
    };

    return this.documentService
      .uploadDocument(JSON.stringify(document), this.file)
      .toPromise()
      .then((data: any) =>
        this.documentService
          .viewFile('awsBaseEndpoint')
          .toPromise()
          .then((baseUrl) => {
            if (baseUrl != null) {
              this.userImageUrl.patchValue(
                baseUrl + '/' + data.docKey + '/' + data.name
              );
            }
            return true;
          })
      )
      .catch((e) => {
        console.error(e);
        this.loading = false;
        throw 'Unable to upload passport picture.';
      });
  }

  async createNewUser() {
    this.loading = true;
    try {
      const data = this.formatPayload(this.form.value);
      if (this.file) {
        this.loadingText = 'Uploading passport photo';
        await this.submitPassPortPhoto(data.users.userName);
      }

      data.users.fullName =
        data.users.fullName || data.users.firstName + ' ' + data.users.lastName;

      this.loading = true;
      this.loadingText = 'Saving User details';
      let user: CreateUser;
      if (data?.users?.id) {
        user = await this.userService
          .updateUser(data?.users?.id, data)
          .toPromise();
      } else {
        user = await this.userService.createUser(data).toPromise();
      }
      await this.uS.info(
        user?.users?.password
          ? `User ${user?.users?.userName} with password ${user?.users?.password} created successfully!`
          : `User ${user?.users?.userName} has been saved successfully!`,
        1
      );
      this.router.navigate(['../show'], {
        queryParams: { id: user?.users.id },
        relativeTo: this.route,
      });
    } catch (error) {
      this.uS.info(error, 0);
    }
    this.loading = false;
  }
}
