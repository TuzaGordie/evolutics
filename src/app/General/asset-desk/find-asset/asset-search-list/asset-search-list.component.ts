import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableCol } from 'src/app/Shared/models/index.model';
import { IAsset } from 'src/app/Shared/models/life/createAsset/create-person';
import {
  ActiveAssetTypes,
  EAssetType,
} from '../../asset-desk-extras/asset.interface';
import { IAssetSearchResponse } from '../../asset-desk-extras/asset.search';
import { AssetService } from '../../asset-desk-extras/asset.service';

@Component({
  selector: 'app-asset-search-list',
  templateUrl: './asset-search-list.component.html',
  styleUrls: ['./asset-search-list.component.scss'],
})
export class AssetSearchListComponent implements OnInit {
  columns: TableCol[] = [
    new TableCol('Asset No', 'assetNo'),
    new TableCol('Owner Client', 'ownerClientNo', null, this.clientFormatter),
    new TableCol('Registration No', 'registrationNo'),
    new TableCol('Type', 'type', this.typeFormatter),
    new TableCol('Category', 'category'),
  ];
  constructor(
    public assS: AssetService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  searchFunc = (queryOBJ: any) => {
    return this.assS
      .searchAssets(queryOBJ)
      .toPromise()
      .then((r) => r?.page?.content);
  };

  clientFormatter(row: any) {
    return row?.ownerClientNo
      ? row?.ownerClientNo + ' - ' + row?.ownerName
      : '';
  }

  typeFormatter(type: EAssetType) {
    return ActiveAssetTypes.find((x) => x.value == type)?.label;
  }

  rowClick(asset: any) {
    this.router.navigate(['../view'], {
      relativeTo: this.route,
      queryParams: { assetNo: asset.assetNo },
    });
  }
}
