import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-expense-journal',
  templateUrl: './create-expense-journal.component.html',
  styleUrls: ['./create-expense-journal.component.scss']
})
export class CreateExpenseJournalComponent implements OnInit {
  form:FormGroup
  faPlus = faPlus
  faCheck = faCheck
  private nbofAcc: number = 1;
  isSetPayeeHidden: boolean = true;
  isCreatePaymentOutwardHidden: boolean = true;


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      transType:[''],
      currency:[''],
      effectiveDate:[''],
      reasonCode:[''],
      narration:['']
    })
  }

  accInc(){
    this.nbofAcc = this.nbofAcc + 1
  }

  accCounter() {
    return new Array(this.nbofAcc);
  }

  createPaymentOutward() {
    this.isSetPayeeHidden = true
    this.isCreatePaymentOutwardHidden = false
  }

  setPayee() {
    this.isCreatePaymentOutwardHidden = true
    this.isSetPayeeHidden = false
  }
}
