import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appTranslator]',
})
export class TranslatorDirective {
  @Input() appTranslator: string;
  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private tS: TranslationService
  ) {}
  ngAfterContentInit(): void {
    let text = this.element.nativeElement.innerText || this.appTranslator;
    if (!environment.translate) {
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', text); 
    } else {
      this.tS.translateHTMLPromise(text).then((r) => {
        this.renderer.setProperty(this.element.nativeElement, 'innerHTML', r);
      });
    }
  }
}
