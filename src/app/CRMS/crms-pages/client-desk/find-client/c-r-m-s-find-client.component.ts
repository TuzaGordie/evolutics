import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../service/find-client.service';

declare var $: any;
type CreatedDateStrings = 'TODAY' | 'YESTERDAY' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_3_MONTHS' | 'LAST_6_MONTHS' | 'LAST_YEAR';

@Component({
  selector: 'app-crm-find-client',
  templateUrl: './c-r-m-s-find-client.component.html',
  styleUrls: ['./c-r-m-s-find-client.component.scss'],
})
export class CRMSFindClientComponent implements OnInit {
  client: any; // found client by either clientNo, enroleeNo or providerNo
  findCRMClientForm: FormGroup;
  searchForm: FormGroup;
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
  isSearching: boolean = false;

  createdDate: CreatedDateStrings

  constructor(
    public findClientService: FindClientService,
    public router: Router,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.setUsersList();
    this.findCRMClientForm = new FormGroup({
      clientNo: new FormControl(null),
      enrolee: new FormControl(null),
      providerNo: new FormControl(null),
    });

    this.initializeSearchForm()
  }

  initializeSearchForm(){
    this.searchForm = new FormGroup({
      name: new FormControl(null),
      phoneNo: new FormControl(null),
      email: new FormControl(null),
      externalRef: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
      createdDateTo: new FormControl(null),
    })
  }

  onNext() {
    console.log(this.findCRMClientForm);
    this.router.navigate(['/crms/view-client'], {queryParams: {clientNo: this.client.clientNo}});
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

  setClientList() {
    console.log(this.findCRMClientForm.value.clientNo);
    if (!this.findCRMClientForm.value.clientNo) {
      this.validResult = '';
      console.log('run');
    } else {
      this.findClientService
        .getClient(this.findCRMClientForm.value.clientNo)
        .subscribe(
          (res) => {
            this.client = res
            this.clientNo = res.clientNo;

            if (this.client && this.client?.clientNo != null) {
              this.findClientService.clientInfo = this.client;
              this.validResult = 'true';
              console.log('clientInfo', this.validResult, this.client);
            } else {
              this.validResult = 'false';
              console.log('clientInfo', this.validResult, this.client);
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
        .getClientByEnroleeNo(this.findCRMClientForm.value.enrolee)
        .subscribe(
          (res) => {
            console.log("client was found for enrolee: ", res)
            this.client = res;
            this.clientNo = res.clientNo
            if (this.client && this.client?.clientNo != null) {
              this.findClientService.clientInfo = this.client;
              this.validResult2 = 'true';
              console.log('enrolee list', this.validResult2, this.client);
            } else {
              this.validResult2 = 'false';
              console.log('enrolee client list', this.validResult2, this.client);
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
        .getClientNoByProviderNo(this.findCRMClientForm.value.providerNo)
        .subscribe(
          (res) => {
            this.client = res;
            this.clientNo = res.clientNo;
            if (this.client && this.client?.clientNo != null) {
              this.findClientService.clientInfo = this.client;
              this.validResult3 = 'true';
              console.log('provider list', this.validResult3, this.client);
            } else {
              this.validResult3 = 'false';
              console.log('provider list', this.validResult3, this.client);
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
    this.isSearching = true;
    if (this.searchForm.value.name) {
      this.findClientService
        .getnameList(this.searchForm.value.name)
        .subscribe((res) => {
          this.clientList = res;
          // this.findClientService.searchedData = res;
          // this.router.navigateByUrl('/crms/client-search');
          this.isSearching = false;
        },
        (err: HttpErrorResponse) => {
          this.isSearching = false;
          this.utilityService.info("Error: " + err.message)
        })
    } else if (this.searchForm.value.phoneNo) {
      this.findClientService
        .getphoneList(this.searchForm.value.phoneNo)
        .subscribe((res) => {
          this.clientList = res;
          // this.findClientService.searchedData = res;
          // this.router.navigateByUrl('/crms/client-search');
          this.isSearching = false;
        },
        (err: HttpErrorResponse) => {
          this.isSearching = false;
          this.utilityService.info("Error: " + err.message)
        });
    } else if (this.searchForm.value.email) {
      this.findClientService
        .getemailList(this.searchForm.value.email)
        .subscribe((res) => {
          this.clientList = res;
          // this.findClientService.searchedData = res;
          // this.router.navigateByUrl('/crms/client-search');
          this.isSearching = false;
        },
        (err: HttpErrorResponse) => {
          this.isSearching = false;
          this.utilityService.info("Error: " + err.message)
        });
    } else if (this.searchForm.value.createdBy) {
      this.findClientService
        .getCreatedByList(this.searchForm.value.createdBy)
        .subscribe((res) => {
          this.clientList = res;
          // this.findClientService.searchedData = res;
          // this.router.navigateByUrl('/crms/client-search');
          this.isSearching = false;
        },
        (err: HttpErrorResponse) => {
          this.isSearching = false;
          this.utilityService.info("Error: " + err.message)
        });
    } else if (this.searchForm.value.externalRef) {
      this.findClientService
        .getExternalRefList(this.searchForm.value.externalRef)
        .subscribe((res) => {
          this.clientList = res;
          // this.findClientService.searchedData = res;
          // this.router.navigateByUrl('/crms/client-search');
          this.isSearching = false;
        },
        (err: HttpErrorResponse) => {
          this.isSearching = false;
          this.utilityService.info("Error: " + err.message)
        });
    } else if (this.searchForm.value.createdDateTo) {
      this.findClientService
        .getCreatedToo(this.searchForm.value.createdDateTo)
        .subscribe((res) => {
          this.clientList = res;
          // this.findClientService.searchedData = res;
          // this.router.navigateByUrl('/crms/client-search');
          this.isSearching = false;
        },
        (err: HttpErrorResponse) => {
          this.isSearching = false;
          this.utilityService.info("Error: " + err.message)
        });
    } else if (this.searchForm.value.createdDateFrom) {
      this.findClientService
        .getCreatedFrom(this.searchForm.value.createdDateFrom)
        .subscribe((res) => {
          this.clientList = res;
          // this.findClientService.searchedData = res;
          // this.router.navigateByUrl('/crms/client-search');
          this.isSearching = false;
        },
        (err: HttpErrorResponse) => {
          this.isSearching = false;
          this.utilityService.info("Error: " + err.message)
        });
    } else {
      this.isSearching = false;
      this.attemptedEmptySearch = true;
    }
  }

  setUsersList(){
    this.findClientService.getUsersList()
      .subscribe(
        (res: any[]) => this.usersList = res,
        (err: HttpErrorResponse) => console.log("Error fetching list of users", err)
      )
  }

  setCreatedDate(dayString: CreatedDateStrings){
    this.createdDate = dayString
    this.searchForm.patchValue({
      createdDateFrom: this.getDateFromDayString(dayString)
    })
  }

  getDateFromDayString(dayString: CreatedDateStrings){
    const date = new Date()
    switch(dayString){
      case 'TODAY':
        break;
      case 'YESTERDAY': date.setDate(date.getDate() - 1);
        break;
      case 'LAST_WEEK': date.setDate(date.getDate() - 7);
        break;
      case 'LAST_MONTH': date.setMonth(date.getMonth() - 1);
        break;
      case 'LAST_3_MONTHS': date.setMonth(date.getMonth() - 3);
        break;
      case 'LAST_6_MONTHS': date.setMonth(date.getMonth() - 6);
        break;
      case 'LAST_YEAR': date.setFullYear(date.getFullYear() - 1);
        break;
    }
    return date.toISOString().split('T')[0];
  }

  createdDateName(createdDate: CreatedDateStrings){
    // change from "THIS_FORMAT" to "This Format" for display on the UI
    return createdDate?.split('_').map(word => word[0] + word.toLowerCase().substring(1)).join(' ')
  }

  getName(client){
    const firstName = client.firstName ? client.firstName : '';
    const middleName = client.middleName ? ` ${client.middleName}` : '';
    const surname = client.surname ? ` ${client.surname}` : '';
    return firstName + middleName + surname;
  }

  downloadClientsList(){
    const headers = "Client Number,Title,Name,Gender,Type,Created On\n"
    const data = this.arrayToCsvString(this.clientList);
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([headers, data], {type: "text/plain"}));
    a.download = "Clients List.csv";
    a.click();
  }

  arrayToCsvString(list){
    return list?.map(client => `${client.clientNo},${client.title},${this.getName(client)},${client.gender},${client.type},${client.createdOn}`).join('\n')
  }
}
