import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accounts-form',
  templateUrl: './accounts-form.component.html',
  styleUrls: ['./accounts-form.component.scss']
})
export class AccountsFormComponent implements OnInit {

  private tolerance: number = 1;


  constructor(private _formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
  }
  toleranceCounter() {
    return new Array(this.tolerance);
  }
  toleranceInc() {
    this.tolerance = this.tolerance + 1
  }
}
