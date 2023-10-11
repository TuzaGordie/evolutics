import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../../../Services/utility.service';

@Component({
  selector: 'app-start-company-appraisal',
  templateUrl: './start-company-appraisal.component.html',
  styleUrls: ['./start-company-appraisal.component.scss']
})
export class StartCompanyAppraisalComponent implements OnInit {

  appraisalCode: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toaster: UtilityService
  ) { }

  ngOnInit(): void {
  }

  createIndividualAppraisal() {
    if(this.appraisalCode === '') {
      this.toaster.notify('Appraisal Code cannot be blank', 2, 5000, 'Info');
    }else{
      this.router.navigate([`../create-company-appraisal/${this.appraisalCode}`], { relativeTo: this.route });
    }
  }

}
