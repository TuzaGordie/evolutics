import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  OnChanges,
  Output,
} from '@angular/core';
import { Config } from 'src/app/configs/index.config';
import { UtilityService } from 'src/app/Services/utility.service';
import { TranslatorDirective } from './translator.directive';
import { ImageType } from '../models/index.model';
import { CommafyNumberDirective } from './commafy-number.directive';
import { IntegerOnlyDirective } from './integer-only.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { NegativeNumberOnlyDirective } from './negative-number-only.directive';
import PerfectScrollbar from 'perfect-scrollbar';
import { Platform } from '@angular/cdk/platform';

@Directive({
  selector: '[imageUpload]',
})
export class ImageUpload {
  @Output() extractedImg = new EventEmitter<File>();
  @HostListener('click') onClick() {
    this.openFile();
  }
  fileEl: HTMLInputElement;

  constructor(
    public el: ElementRef<HTMLImageElement>,
    public uS: UtilityService
  ) {
    this.fileEl = document.createElement('input');
    this.fileEl.type = 'file';
  }
  ngAfterViewInit(): void {
    this.el.nativeElement.style.cursor = 'pointer';

    this.fileEl.onchange = () => {
      this.preview(this.fileEl.files);
    };
  }
  openFile() {
    this.fileEl.click();
  }

  preview(files: FileList) {
    if (files.length === 0) return;
    const f = files[0];
    const mimeType = f.type;
    if (files.length == 1 && f.size > 10000000) {
      this.uS.notify('Image has to be less then 10mb in size', 0);
      return;
    }
    if (mimeType.match(/image\/*/) == null) {
      this.uS.notify('Only images are supported.', 0);
      return;
    }
    this.extractedImg.emit(f);
  }
}
@Directive({
  selector: '[imageLoader]',
})
export class ImageLoaderDirective {
  src: string;
  @Input() set imageLoader(v: string) {
    this.src = v;
    this.loadImage(v);
  }
  @Input() imageType: ImageType;
  constructor(public el: ElementRef<HTMLImageElement>) {}
  loadImage(src: string = this.src, type: ImageType = this.imageType) {
    this.el.nativeElement.src = this.getImageByType(type)?.min;
    const imgEl = document.createElement('img');
    imgEl.src = src || this.getImageByType(type)?.src;
    imgEl.onload = (e) => {
      this.el.nativeElement.src = imgEl.src;
    };
  }
  getImageByType(type: ImageType) {
    return Config.Images[type] ? Config.Images[type] : Config.Images.other;
  }
}

@Directive({
  selector: 'button',
})
export class OnClickDirective {
  @HostListener('click', ['$event']) onClick($event: MouseEvent) {
    const location = $event.view.location;
    const pathName = decodeURI(location.pathname);
    const innterHtml: string = this.el.nativeElement.innerHTML;
    console.log(location, pathName);
    // send pathName and innterHtml to server.
    //    :
  }

  constructor(private el: ElementRef) {}
}

@Directive({
  selector: '[mrouterLink]',
})
export class MrouterLinkirective {
  mrouterLink: string;
  @Input('mrouterLink') set _mrouterLink(v: string) {
    this.mrouterLink = v;
    this.setRouter();
  }
  @Input() mrouterLinkActivatedRoute: ActivatedRoute;
  @Input() mqueryParams: any;
  constructor(
    public el: ElementRef<HTMLAnchorElement>,
    public route: ActivatedRoute,
    public router: Router,
    public uS: UtilityService
  ) {}
  ngAfterViewInit(): void {
    this.setRouter();
  }
  setRouter() {
    if (this.mrouterLink && this.el.nativeElement) {
      this.el.nativeElement.classList.remove('notLink');
      // debugger;
      const queryParams: { [x: string]: string } = this.mqueryParams||{},
        routeLevels = this.mrouterLink.split('../').length - 1,
        currentLocationParts = location.pathname.split('/');
      let route = '',
        urlParts = this.mrouterLink.split('?');

      route = urlParts[0];
      if (urlParts.length > 1) {
        const kvps = urlParts[1].split('&');
        for (const kvp of kvps) {
          const kvpSplit = kvp.split('=');
          queryParams[kvpSplit[0]] = kvpSplit[1];
        }
      }

      currentLocationParts.splice(routeLevels * -1);

      this.el.nativeElement.href =
        currentLocationParts.join('/') +
        '/' +
        route
          .split('../')
          .filter((x) => x)
          .join('/') +
        '?' +
        this.stringifyQueryParams(queryParams);
      this.el.nativeElement.onclick = (e: MouseEvent) => {
        e.preventDefault();
        // debugger;
        this.router.navigate([route], {
          relativeTo: this.uS.environment.activatedRoute || this.route,
          queryParams,
        });
      };
    } else {
      this.el.nativeElement.classList.add('notLink');
    }
  }
  stringifyQueryParams(q: { [x: string]: string }): string {
    return Object.keys(q)
      .map((key) => `${key}=${q[key]}`)
      .join('&');
  }
}

@Directive({
  selector: '[PSBox]',
})
export class PSDirective implements OnChanges, AfterViewInit {
  @Input('PSBox') selector: string; 
  @Input('PSBoxNoHorizontal') noHorizontal: boolean;
  @Input('PSBoxNoVertical') noVertical: boolean;
  constructor(public el: ElementRef,public uS: UtilityService,) {}
  ngOnChanges(): void {}
  ngAfterViewInit() {
    this.init();
  }
  init() {
    if (  !this.uS.isMobile) {
      setTimeout(() => {
        const psNotif = new PerfectScrollbar(
          this.selector || this.el.nativeElement,
          {
            wheelSpeed: 0.5,
            swipeEasing: false,
            suppressScrollX: this.noHorizontal || false,
            suppressScrollY: this.noVertical || false,
            wheelPropagation: true,
            minScrollbarLength: 40,
          }
        );
        psNotif.update();
      }, 0);
    }
  }
}

const comps = [
  CommafyNumberDirective,
  ImageLoaderDirective,
  ImageUpload,
  IntegerOnlyDirective,
  MrouterLinkirective,
  NegativeNumberOnlyDirective,
  OnClickDirective,
  PSDirective,
  TranslatorDirective,
];
@NgModule({
  declarations: comps,
  imports: [CommonModule],
  exports: comps,
})
export class DirectivesModule {}
