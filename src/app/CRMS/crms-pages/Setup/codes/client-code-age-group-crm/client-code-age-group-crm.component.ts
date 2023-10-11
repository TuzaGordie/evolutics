import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { configForms } from 'src/app/Shared/models/form.class';
import { SetupService } from '../extras/setup.service';

@Component({
  selector: 'app-client-code-age-group-crm',
  templateUrl: './client-code-age-group-crm.component.html',
  styleUrls: ['./client-code-age-group-crm.component.scss']
})
export class ClientCodeAgeGroupCRMComponent implements OnInit {

  form = new FormGroup({
    ageGroup: configForms.required(),
  });
  constructor(
    public setS:SetupService,
    private router: Router,
    public route:ActivatedRoute
  ){}

  ngOnInit(): void {
  }

  show(ageGroup) {
    this.router.navigate(['../age-group-show'], {
      queryParams: { redirect: 'show',ageGroup: ageGroup},relativeTo:this.route
    });
  }

}
