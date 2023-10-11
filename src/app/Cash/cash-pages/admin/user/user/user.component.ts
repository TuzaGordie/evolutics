import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/Services/life/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUser, User, UserBranch, UserBreak, UserCompany, UserPayout, UserTiers, UserWorkingTimes, UserBox, UserOutOfOffice } from 'src/app/Shared/models/life/user/Users';
import { ClientService } from 'src/app/Services/client.service';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  operation: string = ''
  tab: string = 'Basics'
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  userid: string = '';
  usergroup: string = '';
  clientNo: string = '';
  fullName: string = '';
  companyCode: string = '';

  disableNext: boolean = true

  userIds: any[] = []
  userGroups: any[] = []
  companyCodes: any[] = []
  appraisalCodes: any[] = []
  appraisalLinkedCodes: any[] = []
  branchCodes: any[] = []
  currencies: any[] = []
  allUserMenus: any[] = []
  dayOfWeek: any[] = []
  languages: any[] = []
  fakeUserWorkingTimes: UserWorkingTimes[] = []



  templateMenu: {name: string,active: boolean} [] =  [
    {name:'Basics',active: true},
    {name:'Limits',active: false},
    {name:'Office Schedule',active: false}
  ]

  weekday: string[] = ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']

  companyalloweddata: string[] = ['']
  branchesalloweddata: string[] = ['']
  private nbofappr: number=1;
  private nbofbd: number = 1;
  private nbofpl: number = 1;
  private nbofpal: number = 1;
  private nbofqal: number = 1;
  private nbofdva: number = 1;
  private nbofpac: number = 1;

  users = new User()
  userBranch = new UserBranch()
  userCompany = new UserCompany()
  userPayout = new UserPayout()
  userTiers = new UserTiers()
  userWorkignTime = new UserWorkingTimes()
  userBox = new UserBox()
  usersOutOfOffice = new UserOutOfOffice()

  createUser = new CreateUser(
    this.users,
    [this.userBranch],
    [this.userCompany],
    [this.userPayout],
    [this.userTiers],
    [this.userWorkignTime],
    this.usersOutOfOffice
  )

  disableEmail: boolean = false;

  message = {
    error: false,
    success: false,
    warning: false
  }


  constructor(private route: ActivatedRoute,
    private userService: UsersService,
    private snack: MatSnackBar,
    private router: Router,
    private clientService: ClientService,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const oper = params.get('operation')
        this.operation = oper? oper: 'actions';
      }
    )
    this.getusersGroup();
    this.getUserMenu();
  }

  getUserMenu() {
    this.userService.getAllUserMenus()
      .subscribe((data: any) => {
        this.allUserMenus = data
      })
  }

  getusersGroup() {
    this.userService.getusersGroup()
      .subscribe((data: any) => {
        this.userGroups = data
      })
  }

  onSelectGroup(group: string) {
    this.usergroup = group
    this.userService.getAllUserIdByGroup(group)
      .subscribe((data: any) => {
        this.userIds = data
      })
  }

  onSelectUserId(id: string) {
    this.userid = id
    console.log("this.userid", id)
  }

  fetchUser(action: string, path: string) {
    this.snack.open("Processing.......")
    this.userService.getUserByUserId(parseInt(this.userid))
      .subscribe((data: any) => {
        console.log('some data',data)
        this.snack.dismiss()
        localStorage.setItem(action + "UserData", JSON.stringify(data))
        this.router.navigateByUrl(path)
      }, (err: any) => {
        this.snack.dismiss()
        this.snack.open("Internal server error.", "Close", { duration: 5000 })
      })
  }

  show(): void {
    if (this.userid.length > 0)
      this.fetchUser("show", '/cash/cash-user/show')
    else this.message.error = true
  }

  clone(): void {
    if (this.userid.length > 0)
      this.fetchUser("clone", '/cash/cash-user/clone')
    else this.message.error = true
  }

  makeUserCode() {
    if (this.createUser.users.email != undefined && this.createUser.users.email.length > 0) {
      let code = this.createUser.users.email.split("@")[0]

      if (code == undefined) {
        this.snack.open("Enter a valid email address to continue", "Close", { duration: 5000 })
        return
      } else {
        this.createUser.users.userName = code
      }
    }
  }

  getFullNameByClientNo() {
    this.snack.open("Processing......")
    this.clientService.getClientNameByNum(this.clientNo)
      .subscribe((data: any) => {
        this.snack.dismiss()
        this.fullName = data

        this.userService.getUserByClientNo(this.clientNo)
          .subscribe((data: any) => {
            this.snack.dismiss()
            if (data != null) {
              this.snack.open("This Client Number is already linked to a User", "Close", { duration: 5000 })
            } else {
              this.disableNext = false
            }
          }, (err: any) => {
            this.snack.dismiss()
            this.snack.open("Internal server error.", "Close", { duration: 5000 })
          })
      }, (err: any) => {
        this.snack.dismiss()
        this.snack.open("Internal server error.", "Close", { duration: 5000 })
      })
  }

  findUser() {
    this.router.navigateByUrl('life/find-client')
  }

  onNext() {
    if (!this.disableNext) {
      localStorage.setItem("clientNo", this.clientNo)
      localStorage.setItem("fullName", this.fullName)
      this.router.navigateByUrl('/cash/cash-user/create')
    }
    else
      this.snack.open("A valid Client Number is required to continue", "Close", { duration: 3000 })
  }

  createClient() {
    this.router.navigateByUrl('/life/client-desk/create/individual')
  }


  
  activate(name: string) {
    this.templateMenu.forEach(m=>{ m.active = (m.name === name)? true : false})
    this.tab = name
  }

  addcompanydataallowedaccess(){
    this.companyalloweddata.push('')
  }

  addbranchdatallowedaccess(){
    this.branchesalloweddata.push('')
  }

  deletebranchdatallowedaccess(){
    this.branchesalloweddata.pop()
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

}
