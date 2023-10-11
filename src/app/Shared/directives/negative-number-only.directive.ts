import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNegativeNumberOnly]'
})
export class NegativeNumberOnlyDirective {

  constructor(
    private el: ElementRef<HTMLInputElement>,
  ) { }

  @HostListener('input', ['$event.target.value'])
  onChange(value){
    if (!value.startsWith('-')){
      this.el.nativeElement.value = `-${value}`
    }
  }
}
