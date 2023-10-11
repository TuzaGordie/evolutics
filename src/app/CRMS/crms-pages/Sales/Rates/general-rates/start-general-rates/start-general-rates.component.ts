import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindRatesService } from '../../service/find-rates.service';

@Component({
  selector: 'app-start-general-rates',
  templateUrl: './start-general-rates.component.html',
  styleUrls: ['./start-general-rates.component.scss']
})
export class StartGeneralRatesComponent implements OnInit {

  CreateGenRateForm:FormGroup=new FormGroup({})

  constructor(public findRatesService : FindRatesService, public router: Router) { }

  ngOnInit(): void {

    this.CreateGenRateForm = new FormGroup({

      code: new FormControl(null)


    })
  }


  onSubmitForm(){

    this.router.navigateByUrl('/life/rates/create-general-rates')

  }

}
