import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-excess',
  templateUrl: './excess.component.html',
  styleUrls: ['./excess.component.scss']
})
export class ExcessComponent implements OnInit {
  @Input() excessMax;
  @Input() excessMin;
  @Input() excessDisabled;
  @Input() excessOptions;
  @Input() excessDisplay;
  @Input() excessAmount;
  @Input() excessType;
  @Output() excessAmountChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() excessRate;
  @Output() excessRateChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private us: UtilityService) { }

  ngOnInit(): void {
  }

  // validateExcess(event){
  //   if (this.excess_max || this.excess_min) {
  //     if (this.excessAmount) {
  //       if (!(Number(this.excessAmount) <= Number(this.excess_max) && Number(this.excessAmount) >= Number(this.excess_min))) {
  //         this.us.notify("Your excess value is in the wrong range.", 0)
  //         return false
  //       }
  //     } else if (!this.excessAmount) {
  //       this.us.notify("The excess amount value is required.", 0)
  //       return false
  //     }
  //   } 
  //   return true
  // }

  onExcessAmountChange(event){
    console.log("onExcessAmountChange: ", event)
    this.excessAmountChange.emit(event.target.value)
  }
}
