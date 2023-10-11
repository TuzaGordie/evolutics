import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { PageService } from 'src/app/Services/page.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { GatewayEmail, GatewaySms } from './gateways';
import { GateWayService } from './gateways.service';

@Component({
  selector: 'app-life-admin-gateway',
  templateUrl: './life-admin-gateway.component.html',
  styleUrls: ['./life-admin-gateway.component.scss'],
})
export class LifeAdminGatewayComponent implements OnInit {
  private nbofa: number = 1;
  private nbofb: number = 1;

  ports: any[] = [];
  protocols: any[] = [];

  emailGateWays: GatewayEmail[] = [];
  smsGateways: GatewaySms[] = [];

  loading = false;
  loadingText = '';
  constructor(
    private codeService: CodeService,
    private gatewayService: GateWayService,
    private util: UtilityService,
    public pageS: PageService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.codeService.getCodesByCodeSubGroup('PORT').subscribe((data: any) => {
      this.ports = data;
    });
    this.codeService
      .getCodesByCodeSubGroup('PROTOCOL')
      .subscribe((data: any) => {
        this.protocols = data;
      });

    this.fetchEmailGateway();
    this.fetchSmsGateway();
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
  fetchSmsGateway() {
    this.loading = true;
    this.loadingText = 'Fetching gateways';

    this.gatewayService
      .getGatewaySms()
      .subscribe(
        (data: GatewaySms[]) => {
          this.smsGateways = [];

          data.map((sms) => {
            sms.rowId = this.smsGateways.length + 1;
            this.smsGateways.push(sms);
          });

          if (this.smsGateways.length < 1)
            this.smsGateways = [new GatewaySms()];
        },
        () => {
          this.util.notify('internal server error!.', 0);
        }
      )
      .add(() => (this.loading = false));
  }

  fetchEmailGateway() {
    this.loading = true;
    this.loadingText = 'Fetching gateways.....';

    this.gatewayService
      .getGatewayEmails()
      .subscribe(
        (data: GatewayEmail[]) => {
          this.emailGateWays = [];

          data.map((email) => {
            email.rowId = this.emailGateWays.length + 1;
            this.emailGateWays.push(email);
          });

          if (this.emailGateWays.length < 1)
            this.emailGateWays = [new GatewayEmail()]; 
        },
        () => {
          this.util.notify('internal server error!.', 0);
        }
      )
      .add(() => (this.loading = false));
  }

  saveEmailGateway() {
    this.loading = true;
    this.loadingText = 'Saving Gateway Email....';

    this.gatewayService
      .saveEmail(this.emailGateWays)
      .subscribe(
        (data: GatewayEmail[]) => {
          this.emailGateWays = [];

          data.map((email) => {
            email.rowId = this.emailGateWays.length + 1;
            this.emailGateWays.push(email);
          });
          this.util.info(`Email Gateway has been saved successfully`)
        },
        () => {
          this.util.notify('internal server error!.', 0);
        }
      )
      .add(() => (this.loading = false));
  }

  saveSmsGateway() {
    this.loading = true;
    this.loadingText = 'Saving Gateway Sms....';

    this.gatewayService
      .saveSms(this.smsGateways)
      .subscribe(
        (data: GatewaySms[]) => {
          this.smsGateways = [];

          data.map((sms) => {
            sms.rowId = this.smsGateways.length + 1;
            this.smsGateways.push(sms);
          });
          this.util.info(`SMS Gateway has been saved successfully`)
        },
        () => {
          this.util.notify('internal server error!.', 0);
        }
      )
      .add(() => (this.loading = false));
  }

  addEmails(i: number = this.emailGateWays?.length) {
    var email = new GatewayEmail();
    email.rowId = this.emailGateWays.length + 1;
    this.emailGateWays.splice(i, 0, email);
  }

  addSms(i: number = this.smsGateways?.length) {
    var sms = new GatewaySms();
    sms.rowId = this.smsGateways.length + 1;
    this.smsGateways.splice(i, 0, sms);
  }

  async removeSms(i: number) {
    if (this.smsGateways[i].id != null) {
      if (await this.util.confirm('Do you want to delete this sms gateway?')) {
        this.gatewayService.deleteSms(this.smsGateways[i].id).subscribe(
          () => {
            this.smsGateways.splice(i, 1);
            this.util.notify('Deleted successfully!.', 1);
          },
          () => {
            this.util.notify('internal server error!.', 0);
          }
        );
      }
    } else this.smsGateways.splice(i, 1);
  }

  async removeEmail(i: number) {
    if (this.emailGateWays[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this email gateway?')
      ) {
        this.gatewayService.deleteEmail(this.emailGateWays[i].id).subscribe(
          () => {
            this.emailGateWays.splice(i, 1);
            this.util.notify('Deleted successfully!.', 1);
          },
          () => {
            this.util.notify('internal server error!.', 0);
          }
        );
      }
    } else this.emailGateWays.splice(i, 1);
  }

  aCounter() {
    return new Array(this.nbofa);
  }

  aInc() {
    this.nbofa = this.nbofa + 1;
  }

  bCounter() {
    return new Array(this.nbofb);
  }

  bInc() {
    this.nbofb = this.nbofb + 1;
  }
}
