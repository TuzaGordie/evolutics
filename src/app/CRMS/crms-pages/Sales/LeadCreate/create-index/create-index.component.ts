import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isObject } from 'lodash-es';
import { timer } from 'rxjs';
import { EClientType } from 'src/app/Life/client-desk/client-extras/client.interface';
import { AgentService } from 'src/app/Services/agent.service';
import { ClientService } from 'src/app/Services/client.service';
import { IndividualAgentService } from '../../../agent-desk/new-individual-agent/services/individual-agent.service';

@Component({
  selector: 'app-create-index',
  templateUrl: './create-index.component.html',
  styleUrls: ['./create-index.component.scss'],
})
export class CreateIndexComponent implements OnInit {
  clientNoForm = new FormGroup({
    clientNo: new FormControl(
      null,
      Validators.required,
      this.validateClientNo.bind(this)
    ),
  });
  clientList: any = [];
  clientApiNo: any;
  clientName: string;
  validatingClientNo: boolean;
  agentNo: string;
  clientType: EClientType;
  message: string;
  path: string;

  constructor(
    public individualService: IndividualAgentService,
    public router: Router,
    public route: ActivatedRoute,
    public clientService: ClientService,
    public agentService: AgentService
  ) {}

  ngOnInit(): void {
    const clientNo = this.route.snapshot.queryParamMap.get('clientNo');
    if (clientNo) {
      this.clientNoForm.patchValue({ clientNo });
      this.clientNoForm.controls.clientNo.markAsDirty();
    }
    this.path = location.pathname;
  }

  async validateClientNo(control: FormControl) {
    return timer(500)
      .toPromise()
      .then(() => {
        this.agentNo = this.clientName = this.message = '';
        if (!control.value) return null;
        this.validatingClientNo = true;
        return new Promise<any>((resolve) => {
          setTimeout(async () => {
            try {
              const res = await this.clientService
                .getClientNameByNum(control.value)
                .toPromise();
              if (res) {
                this.clientName = res;
                this.message = '';
                this.agentNo = await this.agentService
                  .getAgentNoByClientNo(control.value)
                  .toPromise();
                // if (this.agentNo) {
                //   //Client is already an agent
                //   this.message = 'Client is already an Agent';
                //   resolve({ invalid: true });
                // } else {
                this.message = '';
                this.clientType = await this.clientService
                  .getClientType(control.value)
                  .toPromise();
                if (this.clientType) {
                  resolve(null);
                } else {
                  //Client doesn't have a type
                  this.message = "Client doesn't have a type";
                  resolve({ invalid: true });
                }
                //}
              } else {
                //Client not found
                this.message = 'Client number was not found';
                resolve({ invalid: true });
              }
            } catch (error) {
              this.message = 'An error occurred';
              resolve({ invalid: true });
            }
            this.validatingClientNo = false;
          }, 1000);
        });
      });
  }

  onNext() {
    this.router.navigate(['../create'], {
      relativeTo: this.route,
      queryParams: {
        clientNo: this.clientNoForm.value.clientNo,
        clientType: this.clientType,
      },
    });
  }

  changeTab(tab: any) {
    console.log('tab');
    this.individualService.tabChange(tab);
  }
  setClientList() {
    this.validateClientNo(this.clientNoForm.controls.clientNo as any);
  }
}
