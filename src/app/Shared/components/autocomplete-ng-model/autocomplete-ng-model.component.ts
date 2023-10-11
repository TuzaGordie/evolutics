import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AutocompleteService } from '../autocomplete/autocomplete.service';
import { InputNGModelComponent } from '../input-NgModel/input-ngmodel.component';
import { InputBasicComponent, IOption } from '../input/input-basic.component';
import { InputService } from '../input/input.service';

@Component({
  selector: 'app-autocomplete-ng-model',
  templateUrl: './autocomplete-ng-model.component.html',
  styleUrls: ['./autocomplete-ng-model.component.scss']
})
export class AutocompleteNgModelComponent  extends InputNGModelComponent {
  filteredOptions: IOption[];
  @Input() validate = true;
  constructor(public iS: InputService, public autoS: AutocompleteService) {
    super(iS);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // this.control?.addValidators(this.includesOption.bind(this));
    // this.control?.valueChanges.subscribe((r) => { 
    //   // debugger
    //   super.change({ target: { value: r } });
    // });
    // this.options$.subscribe((r) => {
    //   this.control?.patchValue(this.control?.value);
    //   // this.control?.updateValueAndValidity()
    // });
    // merge(
    //   this.control.valueChanges.pipe(startWith('')),
    //   this.options$
    // ).subscribe((r) => {
    //   this.filteredOptions = this.autoS.filterOptions(
    //     this.control.value,
    //     this.options
    //   );
    // });
  }

  change(e: MatAutocompleteSelectedEvent) {
    super.change({ target: { value: e.option.value } });
  }

  displayWith = (val: string) => {
    return this.options.find((x) => x.value == val)?.label;
  };

  includesOption = (control: AbstractControl) => {
    const val = control?.value;
    if (!val) return null; 
    if (this.options.find((x) => x.value == val)) return null;
    else return { notFound: true };
  };

  filterOptions(event){
    const text = event.target?.value || ''
    this.filteredOptions = this.options.filter((item) => (
      item.label.toLowerCase().includes(text.toLowerCase())
      ))
  }
}
