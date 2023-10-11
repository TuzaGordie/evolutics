import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.scss'],
})
export class InfoIconComponent implements OnInit {
  @Input() text: string;
  @Input() coloured = true;
  @Input() left =false;
  @Input() right = true;
  constructor() {}

  ngOnInit(): void {}
}
