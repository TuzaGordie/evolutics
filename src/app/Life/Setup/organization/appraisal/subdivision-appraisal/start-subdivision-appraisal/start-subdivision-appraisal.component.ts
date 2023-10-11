import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../../../Services/utility.service';


@Component({
  selector: 'app-start-subdivision-appraisal',
  templateUrl: './start-subdivision-appraisal.component.html',
  styleUrls: ['./start-subdivision-appraisal.component.scss']
})
export class StartSubDivisionAppraisalComponent implements OnInit {

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
      this.router.navigate([`../create-subdivision-appraisal/${this.appraisalCode}`], { relativeTo: this.route });
    }
  }

}
