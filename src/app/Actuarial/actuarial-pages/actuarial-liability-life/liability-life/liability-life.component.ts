import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-liability-life',
  templateUrl: './liability-life.component.html',
  styleUrls: ['./liability-life.component.scss']
})
export class LiabilityLifeComponent implements OnInit {
  // prodClass = true;
  isNextHidden = true;
  faArrowRight = faArrowRight
  // options:string[] = ['','Savings','Credit Life']
form:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  private createForm() {
    this.form = this.fb.group({
      company:[''],
      prodClass: [''],
      product: [''],
      valMethod: [''],
    })
}
onChangeSelect(e){
  e=== '' ? this.isNextHidden = true : this.isNextHidden=false
}
// onChangeSelect(){
//   if (name === 'prodClass') {
//         return e;
//       }
//   else if(name === 'valMethod'){
//         if (e == '') {
//           this.isNextHidden = true
//         }else{
//           this.isNextHidden = false
//         }
  }
  // }   
  // }


