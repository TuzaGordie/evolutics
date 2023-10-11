export interface IIntlTelInput {
  // getValidationError(): string;
  isValidNumber(): boolean;
  getSelectedCountryData:()=> {
    name: string;
    iso2: string;
    dialCode: string;
  };
  getNumberType(): ENumberType;
  getNumber(): string;
  destroy();
  setCountry(alpha2: string);
  setNumber(phoneNumber: string);
}
enum ENumberType {
  'FIXED_LINE' = 0,
  'MOBILE' = 1,
  'FIXED_LINE_OR_MOBILE' = 2,
  'TOLL_FREE' = 3,
  'PREMIUM_RATE' = 4,
  'SHARED_COST' = 5,
  'VOIP' = 6,
  'PERSONAL_NUMBER' = 7,
  'PAGER' = 8,
  'UAN' = 9,
  'VOICEMAIL' = 10,
  'UNKNOWN' = -1,
}
export class IntlTelInputOptions implements IIntlTelInputOptions {
  allowDropdown?: boolean = true;
  autoHideDialCode?: boolean = true;
  autoPlaceholder?: 'aggressive' | 'polite';
  customContainer?: string;
  customPlaceholder?(): string;
  dropdownContainer?: any;
  excludeCountries?: string[];
  formatOnDisplay?: boolean = true;
  geoIpLookup?(): string;
  hiddenInput?: string;
  initialCountry?: string;
  localizedCountries?: { [x: string]: string };
  nationalMode?: boolean = true;
  onlyCountries?: string[];
  placeholderNumberType?: 'MOBILE';
  preferredCountries?: string[];
  separateDialCode?: boolean;
  utilsScript?: string;
  constructor(data?: IIntlTelInputOptions) { 
    if (data)
      for (const key in data) {
        if (
          Object.prototype.hasOwnProperty.call(data, key) &&
          typeof data[key] != undefined
        ) {
          this[key] = data[key];
        }
      }
    this.autoPlaceholder = this.autoPlaceholder || 'polite';
    this.customContainer = this.customContainer || '';
    this.excludeCountries = this.excludeCountries || [];
    this.hiddenInput = this.hiddenInput || '';
    this.initialCountry = this.initialCountry || '';
    this.onlyCountries = this.onlyCountries || [];
    this.placeholderNumberType = this.placeholderNumberType || 'MOBILE';
    this.utilsScript = this.utilsScript || ''; 
  }
}
export interface IIntlTelInputOptions {
  allowDropdown?: boolean;
  autoHideDialCode?: boolean;
  autoPlaceholder?: 'aggressive' | 'polite';
  customContainer?: string;
  customPlaceholder?(): string;
  dropdownContainer?: any;
  excludeCountries?: string[];
  formatOnDisplay?: boolean;
  geoIpLookup?(): string;
  hiddenInput?: string;
  initialCountry?: string;
  localizedCountries?: { [x: string]: string };
  nationalMode?: boolean;
  onlyCountries?: string[];
  placeholderNumberType?: 'MOBILE';
  preferredCountries?: string[];
  separateDialCode?: boolean;
  utilsScript?: string;
}
