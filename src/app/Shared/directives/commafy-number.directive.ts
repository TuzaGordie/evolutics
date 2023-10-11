import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common'
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appCommafyNumber]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CommafyNumberDirective,
    multi: true,
  }]
})
export class CommafyNumberDirective implements ControlValueAccessor{
  // tslint:disable-next-line:variable-name
  private _value: string | null;
  @Input('disabled') disableInput;

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private numberPipe: DecimalPipe,
    // private ngControl: NgControl,
  ) {
    this.elementRef.nativeElement.type = 'text'
  }

  ngOnChanges(){
    this.elementRef.nativeElement.disabled = this.disableInput;
  }

  // ngDoCheck(){
  //   this.elementRef.nativeElement.disabled = this.disabled;
  //   console.log("ngDoCheck this.disabled: ", this.disabled)
  //   console.log("ngDoCheck ran in commafyNumberDirective and this.elementRef.nativeElement.disabled is: ", this.elementRef.nativeElement.disabled)
  // }
  // get value(): string | null {
  //   return this._value;
  // }

  // @Input('value')
  // set value(value: string | null) {
  //   this._value = this.unFormatValue(value);
  //   this.elementRef.nativeElement.value = this.formatValue(value);
  // }

  private formatValue(value: string | null = '') {
    return value == null ? '' : this.numberPipe.transform(value)
  }

  private unFormatValue(value: string = '') {
    return value == null ? '' : value.toString().replace(/[^\d.-]/g, '');
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    this._value = this.unFormatValue(value) // unformat to get real number
    this._onChange(this._value); // here to notify Angular Validators
    this.elementRef.nativeElement.value = this.formatValue(this._value) 
  }

  @HostListener('focus')
  onFocus() {
    // clear input if it is just 0
    if (this.elementRef.nativeElement.value == '0'){
      this.elementRef.nativeElement.value = ''
    }
  }

  writeValue(value: string): void {
    this._value = this.unFormatValue(value)
    this.elementRef.nativeElement.value = this.formatValue(this._value)
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  _onChange(value: any): void {}
}
