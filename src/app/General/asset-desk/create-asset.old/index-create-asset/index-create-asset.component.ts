import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';

@Component({
  selector: 'app-index-create-asset',
  templateUrl: './index-create-asset.component.html',
  styleUrls: ['./index-create-asset.component.scss']
})
export class IndexCreateAssetComponent implements OnInit {
  @ViewChild('assetClass') select: ElementRef;

  constructor(private router: Router) { }

  onCreateClick(){
    this.router.navigate(
      [appRoutes.general.asset.start.pub],
      {
        queryParams: {
          assetClass: this.select.nativeElement.value
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
