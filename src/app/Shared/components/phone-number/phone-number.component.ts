import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Ng2TelInput } from 'ng2-tel-input';
import { InputBasicComponent } from '../input/input-basic.component';
import { InputService } from '../input/input.service';
import { IIntlTelInput, IntlTelInputOptions } from './phone-number.interface';
import { ICountry, PhoneNumberService } from './phone-number.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss', '../input/input.component.scss'],
})
export class PhoneNumberComponent extends InputBasicComponent {
  country: ICountry;
  private countryAlpha2: string;
  iti: IIntlTelInput;
  @Input('countryCode3') set _countryCode3(v: string) {
    if (v) {
      this.country = this.pnS.getByCode3(v);
      this.countryAlpha2 = this.country?.alpha2?.toString()?.toLowerCase();
    }
    if (this.country?.alpha2 && this.iti) {
      this.iti.setCountry(this.country.alpha2);
      this.config.onlyCountries = [this.country.alpha2];
      (this.iti as any).onlyCountries = [this.country.alpha2];
    }
    this.control.updateValueAndValidity();
  }
  @Input() config = new IntlTelInputOptions({
    // separateDialCode: true,
    allowDropdown: false,
    initialCountry:'ng'
  });
  @ViewChild('pn') pnRef: ElementRef<HTMLInputElement>;
  constructor(public iS:InputService,public pnS: PhoneNumberService) {
    super(iS);
  }

  ngOnInit(): void {
    this.control?.addValidators(this.validate.bind(this));
  }
  ngAfterViewInit(): void {
    // this.pnRef.nativeElement.addEventListener('countrychange', () => {
    //   const selectedCountry = this.iti.getSelectedCountryData();
    //   if (this.country.alpha2 != selectedCountry.iso2) selectedCountry.iso2;
    // });
    if (this.country) {
      this.iti?.setCountry(this.country.alpha2);
      this.config.onlyCountries = [this.country.alpha2];
    }
  }

  onCountryChange(e) {
    // console.log('onCountryChange', e);
  }
  telInputObject(e) {
    this.iti = e;
  }
  getNumber(e) {
    this.control.patchValue(e);
  }
  validate(control: AbstractControl) {
    if (!this.iti?.getNumber()||this.iti?.isValidNumber()) {
      return null;
    } else if (this.countryAlpha2 != this.iti?.getSelectedCountryData()?.iso2) {
      return { countryCode: true };
    } else {
      return { invalid: true };
    }
  }
  isValid(e) {
  }
}
