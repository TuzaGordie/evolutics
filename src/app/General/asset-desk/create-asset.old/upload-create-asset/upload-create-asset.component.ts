import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { AssetService } from '../../asset-desk-extras/asset.service';
import { OtherUploadAssetComponent } from '../other-upload-asset/other-upload-asset.component';

@Component({
  selector: 'app-upload-create-asset',
  templateUrl: './upload-create-asset.component.html',
  styleUrls: ['./upload-create-asset.component.scss'],
})
export class UploadCreateAssetComponent implements OnInit {
  documents: { file: File; metadata: IDocMetadata }[] = [];
  constructor(public service: AssetService, public uS: UtilityService) {}

  ngOnInit(): void {}
  upload(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    /* this.service.filenameOwnership = file */
    this.service.files.push(file)
    this.documents.push({
      file: event.target.files[0],
      metadata: {
        boxNo: '4',
        category: 'Asset',
        sensitivity: 'High',
        subCategory: 'AOC',
        title: 'asset',
      },
    });
  }
  upload2(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    /* this.service.filnamePicture = file */
    this.service.files.push(file)
    this.documents.push({
      file: event.target.files[0],
      metadata: {
        boxNo: '5',
        category: 'Asset',
        sensitivity: 'medium',
        subCategory: 'AP',
        title: 'asset',
      },
    });
  }
  upload3(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    /* this.service.filenameOther = file */
    this.service.files.push(event.target.files[0]);
  }
  getImage1() {
    document.getElementById('fileBtnImg1')?.click();
  }
  getImage2() {
    document.getElementById('fileBtnImg2')?.click();
  }
  getImage3() {
    document.getElementById('fileBtnImg3')?.click();
  }
  openUploadOther() {
    this.uS.dialogOpener(
      OtherUploadAssetComponent,
      { height: 'auto', width: '70%' },
      (r) => {
        this.documents.push(r);
      }
    );
  }
  openID(code:string){
    this.uS.info(``, 1,`Asset ${code} created`,[{value:'Select Effective Date'},{value:'test 2'}])
  }
}
