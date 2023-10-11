import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';

@Component({
  selector: 'app-find-client',
  templateUrl: './find-client.component.html',
  styleUrls: ['./find-client.component.scss']
})
export class FindClientComponent implements OnInit {
  findCRMClientForm: any = FormGroup;
  clientList: any = [];
  clientApiNo: any;
  validResult: any = '';
  validResult2: any = '';
  validResult3: any = '';
  checkMark = false;
  faEye = faEye;
  attemptedEmptySearch: boolean;
  clientNo: string;
  usersList = [];
  showEnroleeNoField = false;
  showNameField = false;
  showProviderNoField= false;
  showPhoneNoField = false;
  showEmailField = false;
  showEnternalRef = false;
  showCreatedDateFrom = false;
  showCreatedDateTo = false;

  constructor(
    private findClientService: FindClientService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findCRMClientForm = new FormGroup({
      clientNo: new FormControl(null),
      enrolee: new FormControl(null),
      name: new FormControl(null),
      providerNo: new FormControl(null),
      phoneNo: new FormControl(null),
      email: new FormControl(null),
      externalRef: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
      createdDateTo: new FormControl(null),
    });

    this.setUsersList();
    this.getQueryParams();
  }

  onNext() {
    console.log(this.findCRMClientForm);
    this.router.navigate(['/crms/sales/create-lead'], {queryParams: {clientNo: this.clientNo}});
    // console.log('id', this.findCRMClientForm.value.clientNo);
    // if (this.findCRMClientForm.value.clientNo) {
    //   this.router.navigate([
    //     '/crms/view-client/',
    //     this.findCRMClientForm.value.clientNo,
    //   ]);
    // }
    // if (this.findCRMClientForm.value.enrolee) {
    //   this.router.navigate([
    //     '/crms/view-client/',
    //     this.findCRMClientForm.value.enrolee,
    //   ]);
    // }
    // if (this.findCRMClientForm.value.providerNo) {
    //   this.router.navigate([
    //     '/crms/view-client/',
    //     this.findCRMClientForm.value.providerNo,
    //   ]);
    // }
    /* this.findClientService.clientInfo(this.clientNoForm.value); */
  }

  private getQueryParams(){
    this.route.queryParamMap.subscribe(async(queryMap)=>{
      console.log(queryMap.get('findType'))
      switch(queryMap.get('findType')){
        case 'client':
          this.showEnroleeNoField = true;
          this.showNameField = true;
          this.showEnroleeNoField = true;
          this.showProviderNoField = true;
          this.showPhoneNoField = true;
          this.showEmailField = true;
          this.showEnternalRef= true;
          this.showCreatedDateFrom = true;
          this.showCreatedDateTo = true
        break;
        case 'agent':
          this.showNameField = true;
        break;
        case 'referrer':
          this.showNameField = true;
        break;
        case 'employer':
          this.showNameField = true;
        break;
        case 'rm' :
          this.showNameField = true;
        break;
        default:
          console.log('Unknown Find Type');
      }

    });
  }



  setClientList() {
    console.log(this.findCRMClientForm.value.clientNo);
    if (!this.findCRMClientForm.value.clientNo) {
      this.validResult = '';
      console.log('run');
    } else {
      this.findClientService
        .getClientList(this.findCRMClientForm.value.clientNo)
        .subscribe(
          (res) => {
            this.clientList = res;

            if (this.clientList && this.clientList?.clientNo != null) {
              this.findClientService.clientInfo = this.clientList[0];
              this.validResult = 'true';
              console.log('clientInfo', this.validResult, this.clientList);
            } else {
              this.validResult = 'false';
              console.log('clientInfo', this.validResult, this.clientList);
            }
          },
          (err) => {
            console.log('HTTP Error', err);
            this.validResult = 'false';
          }
        );
    }
  }

  setEnroleeList() {
    console.log(this.findCRMClientForm.value.enrolee);
    if (!this.findCRMClientForm.value.enrolee) {
      this.validResult2 = '';
      console.log('run');
    } else {
      this.findClientService
        .getEnroleeList(this.findCRMClientForm.value.enrolee)
        .subscribe(
          (res) => {
            this.clientList = res;
            if (this.clientList && this.clientList?.clientNo != null) {
              this.findClientService.clientInfo = this.clientList[0];
              this.validResult2 = 'true';
              console.log('provider list', this.validResult2, this.clientList);
            } else {
              this.validResult2 = 'false';
              console.log('provider list', this.validResult2, this.clientList);
            }
          },
          (err) => {
            console.log('HTTP Error', err);
            this.validResult2 = 'false';
          }
        );
    }
  }

  setProviderList() {
    console.log(this.findCRMClientForm.value.providerNo);
    if (!this.findCRMClientForm.value.providerNo) {
      this.validResult3 = '';
      console.log('run');
    } else {
      this.findClientService
        .getProviderList(this.findCRMClientForm.value.providerNo)
        .subscribe(
          (res) => {
            this.clientList = res;
            if (this.clientList && this.clientList?.clientNo != null) {
              this.findClientService.clientInfo = this.clientList[0];
              this.validResult3 = 'true';
              console.log('provider list', this.validResult3, this.clientList);
            } else {
              this.validResult3 = 'false';
              console.log('provider list', this.validResult3, this.clientList);
            }
          },
          (err) => {
            console.log('HTTP Error', err);
            this.validResult3 = 'false';
          }
        );
    }
  }

  onSearch() {
    if (this.findCRMClientForm.value.name) {
      this.findClientService.getnameList(this.findCRMClientForm.value.name)
        .subscribe((res) => {
          this.findClientService.searchedData = res;
          this.router.navigateByUrl('/crms/sales/create-lead/search-client');
        });
    } else if (this.findCRMClientForm.value.phoneNo) {
      this.findClientService
        .getphoneList(this.findCRMClientForm.value.phoneNo)
        .subscribe((res) => {
          this.findClientService.searchedData = res;
          this.router.navigateByUrl('/crms/sales/create-lead/search-client');
        });
    } else if (this.findCRMClientForm.value.email) {
      this.findClientService
        .getemailList(this.findCRMClientForm.value.email)
        .subscribe((res) => {
          this.findClientService.searchedData = res;
          this.router.navigateByUrl('/crms/sales/create-lead/search-client');
        });
    } else if (this.findCRMClientForm.value.createdBy) {
      this.findClientService.getCreatedByList(this.findCRMClientForm.value.createdBy)
        .subscribe((res) => {
          this.findClientService.searchedData = res;
          this.router.navigateByUrl('/crms/sales/create-lead/search-client');
        });
    } else if (this.findCRMClientForm.value.externalRef) {
      this.findClientService
        .getExternalRefList(this.findCRMClientForm.value.externalRef)
        .subscribe((res) => {
          this.findClientService.searchedData = res;
          this.router.navigateByUrl('/crms/sales/create-lead/search-client');
        });
    } else if (this.findCRMClientForm.value.createdDateTo) {
      this.findClientService.getCreatedToo(this.findCRMClientForm.value.createdDateTo).subscribe((res) => {
          this.findClientService.searchedData = res;
          this.router.navigateByUrl('/crms/sales/create-lead/search-client');
        });
    } else if (this.findCRMClientForm.value.createdDateFrom) {
      this.findClientService
        .getCreatedFrom(this.findCRMClientForm.value.createdDateFrom)
        .subscribe((res) => {
          this.findClientService.searchedData = res;
          this.router.navigateByUrl('/crms/sales/create-lead/search-client');
        });
    } else {
      this.attemptedEmptySearch = true;
    }
  }

  setUsersList(){
    // this.findClientService.getUsersList()
    //   .subscribe(
    //     (res: any[]) => this.usersList = res,
    //     (err: HttpErrorResponse) => console.log("Error fetching list of users", err)
    //   )
  }

}
