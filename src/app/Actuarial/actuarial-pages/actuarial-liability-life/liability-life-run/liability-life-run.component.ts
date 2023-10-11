import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {faPlay} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-liability-life-run',
  templateUrl: './liability-life-run.component.html',
  styleUrls: ['./liability-life-run.component.scss']
})
export class LiabilityLifeRunComponent implements OnInit {
  faPlay = faPlay
form:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  
  private createForm(){
    this.form = this.fb.group({
      company: ['',Validators.required],
      prodClass: ['',Validators.required],
      product: ['',Validators.required],
      valDate: ['',Validators.required],
      valNo: ['',Validators.required],
    });
  }
  check(){
    console.log(this.form.value);
  }
}
