import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {faPlus, faSave} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-parameters-formula',
  templateUrl: './life-parameters-formula.component.html',
  styleUrls: ['./life-parameters-formula.component.scss']
})
export class LifeParametersFormulaComponent implements OnInit {
  faPlus = faPlus
  faSave = faSave
  private nbofpl: number = 1;

  constructor(private fb: FormBuilder) {
  }

  form = this.fb.group({
    versionNo: [''],
    versionDate: [''],
    GYFR: [''],
    GYFT: [''],
    GYMR: [''],
    MRT: [''],
    PMR: [''],
    IEA: [''],
    PMRT: [''],
    REFA: [''],
    REAT: [''],
    UWEFA: [''],
    UWET: [''],
    inflationRate: [''],
    IRT: [''],
    OMT: [''],
    OMR: [''],
    CER: [''],
    CET: [''],
    HCER: [''],
    HCET: [''],
    LFR: [''],
    LRT: [''],
    regulatory1: [''],
    regulatory1Rate: [''],
    regulatory2: [''],
    regulatory2Rate: [''],

  })

  ngOnInit(): void {
  }

  plCounter() {
    return new Array(this.nbofpl);
  }

  plInc() {
    this.nbofpl = this.nbofpl + 1
  }

}
