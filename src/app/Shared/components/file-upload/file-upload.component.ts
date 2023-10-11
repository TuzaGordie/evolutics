import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddDocumentModalComponent } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.component';
import { IFile_Metadata } from 'src/app/Reusables/reusable-pages/document-list/document.interface';
import { UtilityService } from 'src/app/Services/utility.service';
import { IDocMetadata } from '../../models/index.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input() help: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() multiple: boolean;
  @Input() useDocumentModal: boolean;
  accept: string;
  @Input('accept') set _accept(v: string) {
    switch (v) {
      case 'image':
        this.accept = '.png,.jpg,.docx,.pdf';
        break;

      default:
        break;
    }
  }
  @ViewChild('uploadInput') uploadInputRef: ElementRef<HTMLInputElement>;
  @Input() file: File;
  @Output() fileChange = new EventEmitter<File>();
  @Input() files: File[];
  @Output() filesChange = new EventEmitter<File[]>();
  @Input() fileMetadata: IFile_Metadata;
  @Output() fileMetadataChange = new EventEmitter<IFile_Metadata>();
  @Input() fileMetadatas: IFile_Metadata[] = [];
  @Output() fileMetadatasChange = new EventEmitter<IFile_Metadata[]>();
  @Input('fileMetadatas') set _fileMetadatas(v: IFile_Metadata) {
    this.fileMetadatas.push();
  }

  constructor(public uS: UtilityService) {}

  ngOnInit(): void {}
  get isSingle() {
    return !this.multiple;
  }
  private acceptFiles(...files: File[]) {
    this.files = files;
    this.file = files ? files[0] : null;
  }
  private acceptFileMetadata(fm: IFile_Metadata) {
    this.fileMetadatas = this.fileMetadatas || [];
    this.fileMetadata = fm;
    if (this.multiple) this.fileMetadatas.push(fm);
    else this.fileMetadatas = [fm];
  }
  private emitFiles() {
    if (this.multiple) this.filesChange.emit(this.files);
    else this.fileChange.emit(this.file);
  }

  onUpload(event: any) {
    const files = Array.from<File>(event.target.files);
    this.acceptFiles(...files);
    this.emitFiles();
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.file = this.files ? this.files[0] : null;

    this.fileChange.emit(this.file);
    this.filesChange.emit(this.files);
  }
  removeFileMetadata(index: number) {
    this.fileMetadatas.splice(index, 1);
    this.fileMetadata = null;
    this.fileMetadataChange.emit(this.fileMetadata);
    this.fileMetadatasChange.emit(this.fileMetadatas);
  }
  openDialog() {
    if (this.useDocumentModal) {
      this.uS.dialogOpener(
        AddDocumentModalComponent,
        {
          width: '50%',
          maxWidth: '90%',
          maxHeight: '90vh',
          data: {
            document: this.fileMetadata?.metadata,
            file: this.fileMetadata?.file,
          },
        },
        (r: {
          metadataForm: FormGroup;
          metadata: IDocMetadata;
          file: File;
        }) => {
          this.acceptFileMetadata(r);
        }
      );
    } else this.uploadInputRef?.nativeElement?.click();
  }
}
