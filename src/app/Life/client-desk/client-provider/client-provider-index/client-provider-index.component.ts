import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { ClientService } from 'src/app/Services/client.service';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-client-provider-index',
  templateUrl: './client-provider-index.component.html',
  styleUrls: ['./client-provider-index.component.scss'],
})
export class ClientProviderIndexComponent implements OnInit {
  clientInfoList: any = [];
  providerInfoList: any = [];
  findClientIndexProviderForm: FormGroup;
  validResult: any = '';
  checkMark = false;
  providerNo = '';
  clientName = '';
  clientType: any;
  constructor(
    public findClientService: FindClientService,
    public clientS: ClientService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findClientIndexProviderForm = new FormGroup({
      quotationNo: new FormControl(null),
      clientNo: new FormControl(null, null, this.patchClientInfo.bind(this)),
      agentID: new FormControl(null),
      statusID: new FormControl(null),
      productClass: new FormControl(null),
      productCode: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
      providerNo: new FormControl(null),
    });

    console.log('client search', this.findClientService.searchedData);
    this.clientInfoList = this.findClientService.searchedData;
    /* this.setClientInfo() */
  }
  patchClientInfo(control: AbstractControl) {
    return timer(500)
      .toPromise()
      .then(() => {
        this.clientType = null;
        this.clientName = '';
        if (!control?.value) {
          return null;
        } else {
          this.clientS.getClientNameByNum(control?.value).toPromise().then(
            (r) => {
              this.clientName = r;
              if (!r) {
                return { notFound: true };
              } else {
                return null;
              }
            },
            (e) => {
              return { notFound: true };
            }
          );
        }
      });
  }

  viewInfo(data: any) {
    console.log(data);
    this.findClientService.getClientList(data).subscribe((res) => {
      let data: any = res;
      this.findClientService.clientInfo = data[0];
      console.log('client search data', this.findClientService.clientInfo);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
  showCreateProvider() {
    if (
      this.findClientIndexProviderForm.controls.clientNo.valid
    ) {
      this.router.navigate(['../create-provider'], {
        relativeTo: this.route,
        queryParams: {
          clientNo: this.findClientIndexProviderForm.value?.clientNo,
          clientType: this.clientType,
        },
      });
    }
  }

  setClientList() {
    console.log(this.findClientIndexProviderForm.value.clientNo);
    this.findClientService
      .getClientList(this.findClientIndexProviderForm.value.clientNo)
      .subscribe((res) => {
        this.clientInfoList = res;
        if (this.clientInfoList.length > 0) {
          this.findClientService.clientInfo = this.clientInfoList[0];
          this.validResult = 'true';
        } else {
          this.validResult = 'false';
        }
        console.log('quotationList', res);
      });
  }
  setProviderList() {
    console.log(this.findClientIndexProviderForm.value.providerNo);
    this.findClientService
      .getProviderInfoList(this.findClientIndexProviderForm.value.providerNo)
      .subscribe((res) => {
        this.providerInfoList = res;
        if (this.providerInfoList.length > 0) {
          this.findClientService.providerInfo = this.providerInfoList[0];
          this.validResult = 'true';
        } else {
          this.validResult = 'false';
        }
        console.log('quotationList', res);
      });
  }
}
