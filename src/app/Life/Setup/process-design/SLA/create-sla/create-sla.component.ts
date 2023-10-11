import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { SLAService } from '../sla.service';

@Component({
  selector: 'app-create-sla',
  templateUrl: './create-sla.component.html',
  styleUrls: ['./create-sla.component.scss'],
})
export class CreateSLAComponent
  extends PageTemplateComponent
  implements OnInit
{
  @ViewChild('f') form: NgForm;

  constructor(
    public route: ActivatedRoute,
    public util: UtilityService,
    private slaService: SLAService,
    private companyService: CompanyService,
    private codeService: CodeService
  ) {
    super(route, util);
  }

  ngOnInit(): void {
  }
}
