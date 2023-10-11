import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { SetupService } from '../extras/setup.service';

@Component({
  selector: 'app-teams-index-crm',
  templateUrl: './teams-index-crm.component.html',
  styleUrls: ['./teams-index-crm.component.scss']
})
export class TeamsIndexCrmComponent implements OnInit {
  form = new FormGroup({
    companyCode: configForms.required(),
    teamCategory: configForms.required(),
    teams: configForms.required(),
  });
  teamsList:any[]
  constructor(
    public setS:SetupService,
    private router: Router,
    public route:ActivatedRoute
  ){}

  ngOnInit(): void {

  }


  getTeams(value): void {
    console.log("Request parameter "+value);
    this.setS.getTeams('TC2').subscribe((res:any)=>{
      console.log("RES"+JSON.stringify(res));
      return this.teamsList = res?.content;
    })
  }

  show() {
    this.router.navigate(['../teams'], {
      queryParams: { redirect: 'show',teamCode: this.form?.value?.teams},relativeTo:this.route
    });
  }

}
