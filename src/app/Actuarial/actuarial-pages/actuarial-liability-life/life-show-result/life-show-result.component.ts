import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-life-show-result',
  templateUrl: './life-show-result.component.html',
  styleUrls: ['./life-show-result.component.scss']
})
export class LifeShowResultComponent implements OnInit {
  statusCond:boolean;
  prodClass:string
  savingsProd:string 
  productClass:any[]=
  [
    {id:1, product:'A210001',status:'---',count:'---',liability:'---'},
    {id:2, product:'A210002',status:'---',count:'---',liability:'---'}
  ]
  constructor(private route:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.prodClass = this.activatedRoute.snapshot.params.body;
    this.savingsProd = this.activatedRoute.snapshot.params.data;
    this.savingsProd ==='' ? this.statusCond = false :  this.statusCond = true;
  }
  check(e){
  if(this.savingsProd === ''){
   this.route.navigate(['/actuarial/liability/life/result/show/policy-product',this.prodClass])
  }
  else{
    this.route.navigate(['/actuarial/liability/life/result/show/product',this.savingsProd])
  }
}

}
