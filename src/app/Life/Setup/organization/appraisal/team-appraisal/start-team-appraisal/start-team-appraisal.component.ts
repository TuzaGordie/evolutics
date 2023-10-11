import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../../../Services/utility.service';


@Component({
  selector: 'app-start-team-appraisal',
  templateUrl: './start-team-appraisal.component.html',
  styleUrls: ['./start-team-appraisal.component.scss']
})
export class StartTeamAppraisalComponent implements OnInit {

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
      this.router.navigate([`../create-team-appraisal/${this.appraisalCode}`], { relativeTo: this.route });
    }
  }

}
