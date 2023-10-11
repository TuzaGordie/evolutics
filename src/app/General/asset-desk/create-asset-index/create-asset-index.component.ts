import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { UtilityService } from 'src/app/Services/utility.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import {
  ActiveAssetTypes,
  EAssetType,
} from '../asset-desk-extras/asset.interface';
import { AssetService } from '../asset-desk-extras/asset.service';

@Component({
  selector: 'app-create-asset-index',
  templateUrl: './create-asset-index.component.html',
  styleUrls: ['./create-asset-index.component.scss'],
})
export class CreateAssetIndexComponent implements OnInit {
  cls: string;
  options: any[] = [];
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public aS: AssetService,
    public uS: UtilityService
  ) {}

  onCreateClick() {
    this.router.navigate([this.cls], {
      relativeTo: this.route,
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.aS.getAssetType().subscribe(
      (r) => {
        this.options = r;
        this.options.forEach(
          (x) =>
            (x.active = ActiveAssetTypes.find(
              (y) => y.value == x.code
            )?.isActive)
        );
        this.loading = false;
      },
      async (e) => {
        await this.uS.info(e, 0);
        this.uS.back();
      }
    );
  }
}
