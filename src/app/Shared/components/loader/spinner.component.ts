import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <mat-spinner *ngIf="loading" [diameter]="diameter">{{ text }} </mat-spinner>
  `,
  styles: [
    `
      .mat-progress-spinner {
        display: inline-block;
        margin: 5px;
        vertical-align: bottom;
      }
    `,
  ],
})
export class SpinnerComponent {
  @Input() text: string;
  @Input() diameter = 20;
  @Input() loading: boolean;
}
