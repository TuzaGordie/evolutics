import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-account-journal',
  templateUrl: './create-account-journal.component.html',
  styleUrls: ['./create-account-journal.component.scss']
})
export class CreateAccountJournalComponent implements OnInit {
form:FormGroup
faPlus = faPlus
faCheck = faCheck
  private nbofAcc: number = 1;


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
}
