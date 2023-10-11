import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() class: classes = 'vh-80';
  @Input() text = 'Loading...';
  @Input() loading: boolean;
  height: string; 
  @Input('height') set _height(v: number) {
    this.height = v ? v + 'px' : this.height; 
    // console.log('height', v, this.height);
  }
  constructor() {}
  ngOnInit() {}
}

type classes =
  | 'vh-10'
  | 'vh-20'
  | 'vh-30'
  | 'vh-40'
  | 'vh-50'
  | 'vh-60'
  | 'vh-70'
  | 'vh-80'
  | 'vh-90'
  | 'vh-95'
  | 'vh-100';
