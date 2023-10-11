import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';
import { ISystem, MenuItem } from 'src/app/Shared/models/index.model';

@Directive({
  selector: '[searchCase]',
})
export class SearchCaseDirective {
  @Input('searchCase') menuItem: MenuItem;
  element: HTMLDivElement;
  system: ISystem;
  constructor(
    public appS: AppService,
    public ref: ElementRef<HTMLDivElement>
  ) {}
  ngOnInit(): void {
    this.element = this.ref.nativeElement;
    this.system = this.appS.systemMetadataMap.get(this.menuItem.system);
  }
  ngAfterViewInit(): void {
    // this.ref.nativeElement.style.borderColor = this.system.colourCode;
  }
  @HostListener('mouseover') onMouseOver() {
    this.element.style.borderColor = this.system.colourCode;
  }
  @HostListener('mouseleave') onMouseOut() {
    this.element.style.borderColor = "#d3d3d3";
  }
}
