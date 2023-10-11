import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { SetupService } from '../extras/setup.service';

@Component({
  selector: 'app-marketing-event-index-crm',
  templateUrl: './marketing-event-index-crm.component.html',
  styleUrls: ['./marketing-event-index-crm.component.scss']
})
export class MarketingEventIndexCRMComponent implements OnInit {

  form = new FormGroup({
    companyCode: configForms.default(),
    marketingEvents: configForms.required()
  });
  constructor(
    public setS:SetupService,
    private router: Router,
    public route:ActivatedRoute
  ){}

  ngOnInit(): void {
  }

  show(mktEventCode) {
    this.router.navigate(['../marketing-events'], {
      queryParams: { redirect: 'show',mktEventCode: this.form.value.marketingEvents},relativeTo:this.route
    });
  }

}
