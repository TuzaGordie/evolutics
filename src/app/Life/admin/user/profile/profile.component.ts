import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/Authentication/auth-extras/authentication.service';
import { CodeService } from 'src/app/Services/code.service';
import { DocumentService } from 'src/app/Services/document.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UsersService } from 'src/app/Services/life/users.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Services/utility.service';
import {
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import {
  CreateUser,
  UserBox,
  User,
  UserOutOfOffice,
} from 'src/app/Shared/models/life/user/Users';
import { environment } from 'src/environments/environment';
import { UserAccessModalComponent } from '../adminuser/user-access-modal/user-access-modal.component';
import { UserAccessModalService } from '../adminuser/user-access-modal/user-access-modal.service';
import { UsermenuService } from '../usermenu/usermenu-extras/usermenu.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  companyCodes: ICodeDescription[];
  loading: boolean;
  allLanguages: ICodeTitle[] = [];
  get userProfile() {
    return environment.userProfile;
  }
  get imageUrl() {
    return environment.userProfile?.users?.imageUrl;
  }
  // user: Users;
  get id() {
    return this.user.id;
  }
  get languages() {
    return environment?.userCompanyConfig?.configLanguage 
  }

  file: File;
  fileName: string;
  faPen = faPen;
  userBoxDetails = new UserBox();
  userOutOfOffice = new UserOutOfOffice();
  awsConstant = 'awsBaseEndpoint';
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
      email: new FormControl(null, Validators.email),
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
      subDivCode: new FormControl(),
      subRelManager: new FormControl(false),
      teamCode: new FormControl(),
      tm: new FormControl(false),
      userJobRole: new FormControl(),
      userMenu: new FormControl(),
      userName: new FormControl(null, Validators.required),
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
  get user() {
    return environment.userProfile?.users;
  }
  get userMenu() {
    return environment.userMenu.userMenuConfig;
  }
  constructor(
    private documentService: DocumentService,
    private uS: UtilityService,
    private userService: UsersService,
    private userService2: UserService,
    private storage: StorageService,
    public companyService: CompanyService,
    public codeService: CodeService,
    public authService: AuthenticationService,
    public userAccessService: UserAccessModalService
  ) {}

  ngOnInit(): void {
    this.userFG.patchValue(this.userProfile.users);
    if (this.user.outOfOffice) {
      this.userService
        .getUserOutOfOffice(this.user.userName)
        .subscribe((data: any) => {
          this.userOutOfOffice = data;
        });
    }

    this.userService
      .getUserBoxByUserCode(this.user.userName)
      .subscribe((data: any) => {
        if (data != null) this.userBoxDetails = data;
      });

    this.companyService.getCompanyCodeAndDesc().subscribe((data) => {
      this.companyCodes = data;
    });
    this.codeService.getCodesByCodeSubGroup('LANGUAGE').subscribe((r) => {
      this.allLanguages = r;
    });
  }
  languageOptionFormatter = (item) => {
    const title = this.allLanguages.find((x) => item.language == x.code)?.title;
    return item.language + (title ? ' - ' + title : '');
  };
  // saveUserOutOfOffice() {
  //   this.userOutOfOffice.userCode = this.user.userName;
  //   this.userOutOfOffice.usersId = this.user.id;

  //   this.userService.saveUserOutOfOffice(this.userOutOfOffice).subscribe(
  //     (data: any) => {
  //       this.userOutOfOffice = data;
  //       this.utility.info(
  //         'User Out of office has been updated successfully!.',
  //         1
  //       );
  //       this.updateusers();
  //     },
  //     () => {
  //       this.utility.info('Unable to update user out of office!.', 0);
  //     }
  //   );
  // }

  get userFG() {
    return this.form.get('users') as FormGroup;
  }

  get usersOutOfOfficeFG() {
    return this.form.get('usersOutOfOffice') as FormGroup;
  }

  get userImageUrl() {
    return this.userFG.get('imageUrl');
  }

  saveUserBox() {
    // this.userBoxDetails.usersId = this.user.userName;

    this.userService.saveUserBox(this.userBoxDetails).subscribe(
      (data: any) => {
        this.userBoxDetails = data;
      },
      () => {
        this.uS.info('Unable to save User box!.', 0);
      }
    );
  }

  updateUser() {
    this.loading = true;
    this.userService.updateUserInfo(this.id, this.userFG.value).subscribe(
      (data: any) => {
        this.userService2.getUserByID(this.id).subscribe(async (r) => {
          this.authService.setEnvProfile(r);
          this.authService.saveProfileToLocal();
          await this.uS.info('User details updated successfully!.', 1);
          location.reload();
          this.loading = false;
        });
      },
      () => {
        this.loading = false;
        this.uS.info("Unable to update user's language!.", 0);
      }
    );
  }

  imageUpload() {
    this.uS.startPl();
    var document = {
      refCat: 'USR',
      refNo: this.user.userName,
      subCategory: 'PP',
      userCode: this.user.userName,
    };

    this.documentService
      .uploadDocument(JSON.stringify(document), this.file)
      .subscribe(
        (data) => {
          this.documentService
            .viewFile(this.awsConstant)
            .subscribe((baseUrl) => {
              if (baseUrl != null) {
                this.user.imageUrl =
                  baseUrl + '/' + data.docKey + '/' + data.name;
                this.userFG.patchValue({ imageUrl: this.user.imageUrl });
                this.updateUser();
              }
            });

          // this.uS.info('Uploaded profile picture successfully.', 1);
        },
        () => {
          this.uS.info('Unable to upload profile picture.', 0);
        }
      );
  }

  openAccess() {
    this.userAccessService.openAccess(this.userFG, true);
  }
  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  uploadFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.fileName = this.file.name;

    const reader = new FileReader();
    // reader.onload = (e) => (this.imageUrl = reader.result);

    reader.readAsDataURL(this.file);
    this.imageUpload();
  }
}
