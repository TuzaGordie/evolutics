import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit, AfterViewInit, OnChanges {
  message: string;
  @Input() heading = 'Image Preview';
  @Input() inImages: IImage[];
  @Input() outImages: string[] = [];
  @Input() single = true;
  @Output() addedImages = new EventEmitter<string[]>();
  @Output() addedImage = new EventEmitter<string>();
  @Output() deletedInImage = new EventEmitter<IImage>();
  @Output() deletedOutImage = new EventEmitter<string>();
  @ViewChild('file') fileEl: ElementRef<HTMLInputElement>;
  constructor(
    private sanitizerS: DomSanitizer,
    // private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {}
  ngOnChanges() {}
  ngAfterViewInit() {
    this.fileEl.nativeElement.multiple = !this.single;
  }
  openFile() {
    this.fileEl.nativeElement.click();
  }

  preview(files: FileList) {
    if (files.length === 0) {
      return;
    }
    const f = files[0];
    const mimeType = f.type;
    if (files.length == 1 && f.size > 10000000) {
      this.message = 'Image has to be less then 10mb in size';
      return;
    }
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (event) => {
      this.compressFile(reader.result as string).then((dataURI) => {
        if (this.outImages) {
          this.outImages.push(dataURI);
        } else {
          this.outImages = [dataURI];
        }
        // console.log(reader.result);
        this.addedImages.emit(this.outImages);
        this.addedImage.emit(dataURI);
      });
    };
    this.fileEl.nativeElement.value = null;
    this.message = null;
  }

  previews(files: FileList) {
    if (files.length === 0) {
      return;
    }
    const ps = [];
    for (let i = 0; i < files.length; i++) {
      const f = files.item(i);
      ps.push(
        new Promise<boolean>((res, err) => {
          const mimeType = f.type;
          // console.log(f);
          if (files.length == 1 && f.size > 500) {
          }
          if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only images are supported.';
            res(true);
          }

          const reader = new FileReader();
          reader.readAsDataURL(f);
          reader.onload = (event) => {
            this.compressFile(reader.result as string).then((dataURI) => {
              if (this.outImages) {
                this.outImages.push(dataURI);
              } else {
                this.outImages = [dataURI];
              }
              // console.log(reader.result);
              this.addedImages.emit(this.outImages);
              this.addedImage.emit(dataURI);
              res(true);
            });
          };
        })
      );
    }
    Promise.all(ps).then(() => {
      this.fileEl.nativeElement.value = null;
      this.addedImages.emit(this.outImages);
    });
  }
  compressFile(image: string) {
    return new Promise<string>((res) => {
    return image
      // if (this.imageCompress.byteCount(image) > 5000000) {
      //   this.imageCompress.compressFile(image, -1, 50, 50).then((r) => res(r));
      // } else {
      //   res(image);
      // }
    });
  }
  reset() {
    this.outImages = [];
  }
  sanitizer(url) {
    return this.sanitizerS.bypassSecurityTrustResourceUrl(url);
  }
  removeFromOut(index: number) {
    this.deletedOutImage.emit(this.outImages.splice(index, 1)[0]);
    this.addedImages.emit(this.outImages);
  }
  removeFromIn(index: number) {
    const img = this.inImages.splice(index, 1)[0];
    console.log(img);
    this.deletedInImage.emit(img);
  }
  dd() {
    alert();
  }
}
interface IImage {
  id?: string;
  src: string;
  alt?: string;
}
