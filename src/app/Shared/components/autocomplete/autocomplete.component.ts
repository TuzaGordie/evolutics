import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { InputBasicComponent, IOption } from '../input/input-basic.component';
import { InputService } from '../input/input.service';
import { AutocompleteService } from './autocomplete.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss', '../input/input.component.scss'],
})
export class AutocompleteComponent extends InputBasicComponent {
  filteredOptions: IOption[];
  @Input() validate = true;
  constructor(public iS: InputService, public autoS: AutocompleteService) {
    super(iS);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.control?.addValidators(this.includesOption.bind(this));
    this.control?.valueChanges.subscribe((r) => {
      // debugger
      super.change({ target: { value: r } });
    });
    this.options$.subscribe((r) => {
      if (this.debug) debugger;
      const disabled = this.control.disabled;
      this.control?.patchValue(this.control?.value);
      if (disabled) this.control.disable();
    });
    merge(
      this.control.valueChanges.pipe(startWith('')),
      this.options$
    ).subscribe((r) => {
      this.filteredOptions = this.autoS.filterOptions(
        this.control.value,
        this.options
      );
    });
  }

  displayWith = (val: string) => {
    return this.options.find((x) => x.value == val)?.label;
  };

  includesOption = (control: AbstractControl) => {
    const val = control?.value;
    if (!val) return null;
    // debugger
    if (this.options.find((x) => x.value == val)) return null;
    else return { notFound: true };
  };
}
