import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import {
  CreateStatusCode,
  StatusCode,
  StatusCodeDestination,
} from '../../statuscode';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-life-process-design-status-claim-create',
  templateUrl: './life-process-design-status-claim-create.component.html',
  styleUrls: ['./life-process-design-status-claim-create.component.scss'],
})
export class LifeProcessDesignStatusClaimCreateComponent
  extends PageTemplateComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('f') form: NgForm;

  companies: any[] = [];
  processGroups: any[] = [];
  processNodes: any[] = [];
  statusCodes: any[] = [];

  statusCode = new StatusCode();
  statusCodeDestination = new StatusCodeDestination();
  createStatusCode = new CreateStatusCode(this.statusCode, [
    this.statusCodeDestination,
  ]);

  loadingText = '';

  constructor(
    private companyService: CompanyService,
    public util: UtilityService,
    private codeService: CodeService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    super(route, util);
  }

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });
    this.codeService.getStatusCodeByCat('C').subscribe((data: any) => {
      this.statusCodes = data;
    });
    this.codeService
      .getCodesByCodeSubGroup('PROCESS_GROUP')
      .subscribe((data: any) => {
        this.processGroups = data;
      });
  }

  ngAfterViewInit(): void {
    super.init(async () => {
      return this.code
        ? this.fetchStatusCode(this.code).then((r) => {
            if (this.isShow) this.form.form.disable();
            setTimeout(() => {
              if (this.isShow) this.form.form.disable();
            }, 1000);
          })
        : null;
    });
  }

  getProcessNodes() {
    this.codeService
      .getCodesByCodeSubGroupAndCat(
        'PROCESS_NODE',
        this.createStatusCode.statusCode.processGroup
      )
      .subscribe((data: any) => {
        this.processNodes = data;
      });
  }

  fetchStatusCode(code: string) {
    this.loading = true;
    this.loadingText = 'Fetching Status....';
    return this.codeService
      .getStatusCodeByCode(code)
      .toPromise()
      .then((data: CreateStatusCode) => {
        this.createStatusCode.statusCode = data.statusCode;
        if (this.isClone) {
          delete this.createStatusCode.statusCode.id;
          delete this.createStatusCode.statusCode.code;
        }

        this.createStatusCode.statusCodeDestination = [];

        data.statusCodeDestination.map((dest) => {
          if (this.isClone) delete dest.id;
          dest.rowId = this.createStatusCode.statusCodeDestination.length + 1;
          this.createStatusCode.statusCodeDestination.push(dest);
        });

        if (this.createStatusCode.statusCodeDestination.length < 1)
          this.addStatusDestination();

        this.getProcessNodes();
      })
      .then(() => (this.loading = false));
  }

  addStatusDestination() {
    var dest = new StatusCodeDestination();
    dest.rowId = this.createStatusCode.statusCodeDestination.length + 1;
    this.createStatusCode.statusCodeDestination.push(dest);
  }

  removeStatusDestination(i: number) {
    if (this.createStatusCode.statusCodeDestination[i].id != null) {
      if (this.util.confirm('Do you want to delete this status code?')) {
        this.codeService
          .deleteStatusDestinationById(
            this.createStatusCode.statusCodeDestination[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Deleted successfully!.');
              this.createStatusCode.statusCodeDestination.splice(i, 1);
            },
            () => {
              this.util.notify('Unable to delete statud destination!.', 0);
            }
          );
      }
    } else this.createStatusCode.statusCodeDestination.splice(i, 1);
  }

  saveStatusCode() {
    this.loading = true;
    this.loadingText = 'Saving Status Code......';
    this.codeService.CreateStatusCode(this.createStatusCode, 'C').subscribe(
      (data: CreateStatusCode) => {
        this.loading = false;
        this.util.info(
          `Status Code ${data.statusCode?.code} was saved successfully`,
          1
        );

        this.createStatusCode.statusCode = data.statusCode;

        this.createStatusCode.statusCodeDestination = [];

        data.statusCodeDestination.map((dest) => {
          dest.rowId = this.createStatusCode.statusCodeDestination.length + 1;
          this.createStatusCode.statusCodeDestination.push(dest);
        });

        if (this.createStatusCode.statusCodeDestination.length < 1)
          this.addStatusDestination();
      },
      () => {
        this.loading = false;
        this.util.info('Error in Saving Status Code, Please try again', 0);
      }
    );
  }
}
