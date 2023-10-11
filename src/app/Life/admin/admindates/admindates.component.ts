import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admindates',
  templateUrl: './admindates.component.html',
  styleUrls: ['./admindates.component.scss']
})
export class AdmindatesComponent implements OnInit {

  operation: string = 'actions'
  firstFormGroup: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder, private _router: Router,public route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      selectedDateCatCtrl: ['', Validators.required],
    });
  }


  onShowingNext() {
    if(this.firstFormGroup.controls['selectedDateCatCtrl'].value.toString() == "directDebit")
    {
      this._router.navigate(['direct-debit'],{relativeTo:this.route})
    }
    else if(this.firstFormGroup.controls['selectedDateCatCtrl'].value.toString() == "system")
    {
      this._router.navigate(['system'],{relativeTo:this.route})
    }
   else
    {

    }
  }
}
