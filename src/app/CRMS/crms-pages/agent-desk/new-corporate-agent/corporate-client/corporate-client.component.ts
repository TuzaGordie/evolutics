import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { CorporateAgentService } from '../service/corporate-agent.service';

@Component({
  selector: 'app-corporate-client',
  templateUrl: './corporate-client.component.html',
  styleUrls: ['./corporate-client.component.scss'],
})
export class CRMSCorporateClientComponent implements OnInit {
  clientNoForm: FormGroup;
  clientList: any = [];
  clientApiNo: any;
  validResult: any = '';
  checkMark = false;
  validatingClientNo: boolean;
  clientName: string;

  constructor(
    public corporateService: CorporateAgentService,
    public router: Router,
    public route: ActivatedRoute,
    public clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientNoForm = new FormGroup({
      clientNo: new FormControl(null, null, this.setClientList.bind(this)),
    });
  }

  onNext() {
    console.log(this.clientNoForm);
    this.corporateService.clientInfo(this.clientNoForm.value);
  }

  changeTab(tab: any) {
    console.log('tab');
    this.corporateService.tabChange(tab);
    this.router.navigate(['../../create/corporate/create'], {
      relativeTo: this.route,queryParams:{clientNo:this.clientNoForm?.value?.clientNo}
    });
  }

  async setClientList(
    control: AbstractControl = this.clientNoForm.controls.clientNo
  ) {
    this.validatingClientNo = true;
    this.clientName = null
    try {
      this.clientName = await this.clientService
        .getClientNameByNum(control.value)
        .toPromise();
    } catch (error) {}
    this.validatingClientNo = false;
    return this.clientName ? null : { valid: true };
  }
}
