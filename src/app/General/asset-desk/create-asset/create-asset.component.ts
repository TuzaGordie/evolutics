import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { EPageType } from 'src/app/Shared/models/index.model';
import { EAssetType, IAssetDetail } from '../asset-desk-extras/asset.interface';
import { AssetUploadFormComponent } from './asset-upload-form/asset-upload-form.component';
import { CreateAssetService } from './create-asset.service';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss'],
})
export class CreateAssetComponent implements OnInit {
  assetType: EAssetType;
  eAssetType = EAssetType;
  @ViewChild('fileUploads') fileUploads: AssetUploadFormComponent;
  loading: boolean;
  asset: IAssetDetail;
  assetNo: string;
  pageType: EPageType;
  constructor(
    private route: ActivatedRoute,
    public caS: CreateAssetService,
    public uS: UtilityService
  ) {}

  async ngOnInit() {
    this.assetType = this.route.snapshot.params.assetType;
    this.pageType = this.route.snapshot.data.get('type');
    if (this.pageType != EPageType.createPage) return;
    try {
      this.loading = true;
      this.assetNo = this.route.snapshot.queryParamMap.get('assetNo');
      if (!this.assetNo) throw 'Asset number is required';
      this.asset = await this.caS.getAsset(this.assetNo).toPromise();
      if (!this.asset) throw `Asset with number ${this.assetNo} doesn't exist`;
    } catch (error) {
      await this.uS.info(error, 0);
      this.uS.back();
    }
    this.loading = false
  }
  ngOnDestroy(): void {
    this.caS.reset();
  }
  save() {
    this.loading = true;
    if (this.caS.form.invalid) return;
    const value = this.caS.form?.value;
    let dataStr = JSON.stringify(value);
    const documents = this.caS.documents.filter((x) => x?.key && x?.value);
    let documentsStr = JSON.stringify(documents.map((x) => x.value));

    const fd = new FormData();
    fd.append('createAsset', dataStr);
    if (documents?.length) fd.append('documents', documentsStr);
    documents.forEach((doc) => {
      fd.append('files', doc.key, doc.key.name);
    });

    this.caS.createAsset(fd).subscribe(
      async (data) => {
        this.asset = data;
        this.loading = false;
        await this.uS.info(
          `Asset Number ${data?.asset.assetNo} has been created`,
          1
        );
        this.uS.router.navigate(['../../view'], {
          relativeTo: this.route,
          queryParams: { assetNo: data?.asset.assetNo },
        });
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.uS.info(error?.error?.message, 0);
      }
    );
  }
}
