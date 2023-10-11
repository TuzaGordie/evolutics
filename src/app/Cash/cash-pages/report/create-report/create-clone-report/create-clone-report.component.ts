import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-clone-report',
  templateUrl: './create-clone-report.component.html',
  styleUrls: ['./create-clone-report.component.scss']
})
export class CreateCloneReportComponent implements OnInit {

  items:any = [1];
  items1:any = [1];
  items2:any = [1];
  items3:any = [1];
  items4:any = [1];
  constructor() { }

  ngOnInit(): void {
  }
  copy() {
    this.items.push(this.items)
 }
 copy1() {
  this.items1.push(this.items1)
}
copy2() {
  this.items2.push(this.items2)
}
copy3() {
  this.items3.push(this.items3)
}
copy4() {
  this.items4.push(this.items4)
}
delete(index:any){
  this.items.splice(index,1)
   }
 delete1(index:any){
this.items1.splice(index,1)
 }
 delete2(index:any){
  this.items2.splice(index,1)
   }
   delete3(index:any){
    this.items3.splice(index,1)
     }
     delete4(index:any){
      this.items4.splice(index,1)
       }
}
