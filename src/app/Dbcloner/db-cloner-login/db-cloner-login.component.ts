import { UtilityService } from './../../Services/utility.service';
import { IGetDatabases } from './../services/dbcloner-extras/dbcloner.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { configForms } from './../../Shared/models/form.class';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DbclonerExtrasService } from '../services/dbcloner-extras/dbcloner-extras.service';


@Component({
  selector: 'app-db-cloner-login',
  templateUrl: './db-cloner-login.component.html',
  styleUrls: ['./db-cloner-login.component.scss']
})
export class DbClonerLoginComponent implements OnInit {
  form:FormGroup;
  loading:boolean;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private utilityService:UtilityService,
    private dbS:DbclonerExtrasService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      server: configForms.required(),
      accountName: configForms.required(),
      userName: configForms.required(),
      password: configForms.default()
    });

    this.getDatabaseUrl();


  }

  getDatabaseUrl(){
   this.dbS.getDatabasUrl().subscribe((res)=>{
    this.form.patchValue({
      server: res
    })
   });

  }

  onSubmit() {
    this.login();
  }

  private async login() {
    console.log("FORM VALUE "+ JSON.stringify(this.form.value));
    try {
      this.loading = true;
      const values = this.form.value as IGetDatabases;
      console.log("VALUES"+ values);
      this.dbS.getDatabases(values).then((res)=>{
        console.log("res"+ res);
        // if(res){
        //   this.loading = false;
        //   this.utilityService.notify('Successfully Submitted', 1);
        // }
      });
    } catch (e) {
      this.utilityService.notify('An error occurred', 0);
      console.log(e);
      this.loading = false;
      this.form.reset();
    }
  }

}
