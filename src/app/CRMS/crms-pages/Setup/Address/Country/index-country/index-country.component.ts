import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index-country',
  templateUrl: './index-country.component.html',
  styleUrls: ['./index-country.component.scss']
})
export class IndexCountryComponent implements OnInit {

  constructor(public router: Router,public route:ActivatedRoute,) { }

  ngOnInit(): void {
  }
  onNext(){
    this.router.navigate(['../create-country'],{relativeTo:this.route})
    console.log()
  }
}
