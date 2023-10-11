import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddDocumentModalComponent } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.component';
import {
  IDocument,
  IFile_Metadata,
} from 'src/app/Reusables/reusable-pages/document-list/document.interface';
import { UtilityService } from 'src/app/Services/utility.service';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { AssetService } from '../../asset-desk-extras/asset.service';
import { CreateAssetService } from '../create-asset.service';
@Component({
  selector: 'app-asset-upload-form',
  templateUrl: './asset-upload-form.component.html',
  styleUrls: ['./asset-upload-form.component.scss'],
})
export class AssetUploadFormComponent implements OnInit {
  documents: KeyValue<File, IDocMetadata>[] = [];
  certFile: KeyValue<File, IDocMetadata>;
  pictureFiles: KeyValue<File, IDocMetadata>[];
  otherFile: KeyValue<File, IDocMetadata>;
  constructor(public caS: CreateAssetService, public uS: UtilityService) {}

  ngOnInit(): void {}
  upload(file: File) {
    this.certFile = {
      key: file,
      value: {
        boxNo: environment?.userProfile?.users.docBox,
        category: 'Asset',
        sensitivity: 'High',
        subCategory: 'AOC',
        title: 'asset',
      },
    };
    this.groupFiles();
  }
  upload2(files: File[]) {
    this.pictureFiles = files.map((file) => ({
      key: file,
      value: {
        boxNo: environment?.userProfile?.users.docBox,
        category: 'Asset',
        sensitivity: 'medium',
        subCategory: 'AP',
        title: 'asset',
      },
    }));
    this.groupFiles();
  }
  upload3(r: IFile_Metadata) {
    this.otherFile = { key: r.file, value: r.metadata };
    this.groupFiles();
  }
  openUploadOther() {
    this.uS.dialogOpener(
      AddDocumentModalComponent,
      {
        width: '50%',
        maxWidth: '90%',
        maxHeight: '90vh',
        data: {
          document: this.otherFile?.value,
          file: this.otherFile?.key,
        },
      },
      (r: { metadataForm: FormGroup; metadata: IDocMetadata; file: File }) => {
        this.otherFile = { key: r.file, value: r.metadata };
      },
      (n) => {
        this.groupFiles();
      }
    );
  }
  groupFiles() {
    this.caS.documents = this.documents = [
      this.certFile,
      ...(this.pictureFiles || []),
      this.otherFile,
    ].filter((x) => x?.key);
  }
}
