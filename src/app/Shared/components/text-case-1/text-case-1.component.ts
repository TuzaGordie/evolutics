import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'text-case-1',
  templateUrl: './text-case-1.component.html',
  styles: [
    `
      i {
        font-weight: 500;
        font-size: small;
      }
      .lbl {
        font-weight: 500;
      }
    `,
  ],
})
export class TextCase1Component implements OnInit {
  @Input() hint: string;
  @Input() icon: string;
  @Input() inverted: boolean;
  @Input() lbl: string;
  @Input() lblClass = 'text-primary';
  @Input() light: boolean = true;
  @Input() mclass: string;
  @Input() route: string;
  @Input() small: boolean;
  @Input() stacked: boolean = true;
  @Input() val: any;
  @Input() xsmall: boolean;
  constructor() {}

  ngOnInit(): void {}
}
