import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../../../Services/utility.service';

@Component({
  selector: 'app-start-individual-appraisal',
  templateUrl: './start-individual-appraisal.component.html',
  styleUrls: ['./start-individual-appraisal.component.scss']
})
export class StartIndividualAppraisalComponent implements OnInit {

  appraisalCode: any = '';
  isAppraisalCode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toaster: UtilityService
  ) { }

  ngOnInit(): void {
  }


  createIndividualAppraisal() {
    if(this.appraisalCode ===  '') {
      this.toaster.notify('Appraisal Code cannot be blank', 2, 5000, 'Info');
    }else{
      this.router.navigate([`../create-individual-appraisal/${this.appraisalCode}`], { relativeTo: this.route });
    }
  }

}