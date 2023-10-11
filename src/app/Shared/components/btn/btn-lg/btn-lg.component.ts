import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';
import { BtnComponent } from '../btn.component';
import { BtnService } from '../btn.service';

@Component({
  selector: 'app-btn-lg',
  templateUrl: './btn-lg.component.html',
  styleUrls: ['./btn-lg.component.scss'],
})
export class BtnLgComponent extends BtnComponent {
  @Input() route: string;
  @Input() value: string|number;
  @Input() subText: string;
  @Input() subValue: string|number;
  constructor(public appS: AppService, public btnS: BtnService) {
    super(appS, btnS);
  }

  ngOnInit(): void {}
}
