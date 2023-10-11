import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { SetupService } from '../extras/setup.service';

@Component({
  selector: 'app-lead-classification-index-crm',
  templateUrl: './lead-classification-index-crm.component.html',
  styleUrls: ['./lead-classification-index-crm.component.scss']
})
export class LeadClassificationIndexCrmComponent implements OnInit {
  form = new FormGroup({
    companyCode: configForms.default(),
    leadClassification: configForms.required()
  });
  constructor(
    public setS:SetupService,
    private router: Router,
    public route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.setS.getLeadClass().subscribe((res)=>{
      console.log("UPDATE "+JSON.stringify(res));
    });
  }

  show(leadStatusCode) {
    this.router.navigate(['../lead-classification'], {
      queryParams: { redirect: 'show',leadStatusCode: leadStatusCode},relativeTo:this.route
    });
  }

}
