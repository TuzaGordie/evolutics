import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPageToComponent]'
})
export class PageToComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
