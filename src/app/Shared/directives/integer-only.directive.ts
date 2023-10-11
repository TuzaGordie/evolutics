import { ListKeyManager } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appIntegerOnly]'
})
export class IntegerOnlyDirective {
  @Input() allowNegativeNumbers: boolean = false;

  constructor(
    private elemRef: ElementRef,
  ) { }

  @HostListener('focus') onFocus(){
    // if the content is just a zero (the usual default value from backend), clear it
    if (!Number(this.elemRef.nativeElement.value)) {
      this.elemRef.nativeElement.value = '';
    }
  }

  @HostListener('input') onKeyUp(){
    // optionally allow for negative sign
    let pattern = this.allowNegativeNumbers ? /[^\d-]/g : /[^\d]/g;
    // remove everything except digits
    this.elemRef.nativeElement.value = this.elemRef.nativeElement.value.replace(pattern, '')
  }

}
