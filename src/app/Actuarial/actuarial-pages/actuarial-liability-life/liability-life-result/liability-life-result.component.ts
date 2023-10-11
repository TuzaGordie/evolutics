import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-liability-life-result',
  templateUrl: './liability-life-result.component.html',
  styleUrls: ['./liability-life-result.component.scss']
})
export class LiabilityLifeResultComponent implements OnInit {
  change:boolean = true
form:FormGroup
faEye = faEye
  constructor(private fb:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.createForm()
  }
  private createForm(){
    this.form = this.fb.group({
      company:[''],
      prodClass:[''],
      prod:[''],
      valDate:[''],
      runNo:[''],
    })
  }

  check(){
this.route.navigate(['/actuarial/liability/life/result/show/valuation',this.form.value.prodClass,this.form.value.prod])
    console.log(this.form.value);  
  }
  changeDisplay(e){
   e =='' ? this.change = true : this.change = false;
  }

}
