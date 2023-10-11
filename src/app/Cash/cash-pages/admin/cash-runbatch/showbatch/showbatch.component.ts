import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showbatch',
  templateUrl: './showbatch.component.html',
  styleUrls: ['./showbatch.component.scss']
})
export class ShowbatchComponent implements OnInit {

  items:any = [1];
  constructor() { }

  ngOnInit(): void {
  }
  copy() {
    this.items.push(this.items)
 }
 delete(index:any){
  this.items.splice(index,1)
   }
}
