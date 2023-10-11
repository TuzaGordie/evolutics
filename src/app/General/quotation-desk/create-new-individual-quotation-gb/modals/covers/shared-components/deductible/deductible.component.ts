import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-deductible',
  templateUrl: './deductible.component.html',
  styleUrls: ['./deductible.component.scss']
})
export class DeductibleComponent implements OnInit {
  @Input() onValidateDeductible: EventEmitter<void>;
  @Input() deductibleMax;
  @Input() deductibleMin;
  @Input() deductibleDisabled;
  @Input() deductibleOptions;
  @Input() deductibleDisplay;
  @Input() deductibleAmount;
  @Input() deductibleType;
  @Output() deductibleAmountChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() deductibleRate;
  @Output() deductibleRateChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private us: UtilityService) { }

  ngOnInit(): void {
  }

  onDeductibleAmountChange(event){
    console.log("onDeductibleAmountChange: ", event)
    this.deductibleAmountChange.emit(event.target.value)
  }
}