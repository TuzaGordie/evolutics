import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { SetupService } from '../extras/setup.service';

@Component({
  selector: 'app-client-data-score-index',
  templateUrl: './client-data-score-index.component.html',
  styleUrls: ['./client-data-score-index.component.scss']
})
export class ClientDataScoreIndexComponent implements OnInit {
  clientDataScoreArray: any[];
  form = new FormGroup({
    clientScoreData: configForms.required(),
  });
  constructor(
    private route: ActivatedRoute,
    public setS: SetupService,
    private fb: FormBuilder,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.setS.getClientDataScore().subscribe((res:any)=>{
        console.log(JSON.stringify(res));
        this.clientDataScoreArray = res?.content;
    })
  }

  show(scoreCode) {
    console.log("Score Code"+this.form.value.clientScoreData);
    this.router.navigate(['../client-data-score'], {
      queryParams: { redirect: 'show',scoreCode: this.form.value.clientScoreData},relativeTo:this.route
    });
  }

}
