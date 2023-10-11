import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { TariffService } from './tariff.service';

@Component({
  selector: 'app-index-tariffs',
  templateUrl: './index-tariffs.component.html',
  styleUrls: ['./index-tariffs.component.scss'],
})
export class IndexSetupsTariffsComponent implements OnInit {
  constructor(public router: Router, public route: ActivatedRoute, private codeService: CodeService, private tariffService: TariffService, private util: UtilityService) { }

  groups: any[] = []
  tariffs: any[] = []

  group: string
  code: string

  ngOnInit(): void {
    this.codeService.getCodesByCodeSubGroup("TARIFF_GROUP")
      .subscribe((data: any) => {
        this.groups = data
      })

  }

  selectTariffByGroup() {
    this.tariffService.getTariffCodeAndDescByGroup(this.group)
      .subscribe((data: any) => {
        this.tariffs = data
      })
  }

  show() {
    this.onNext("show")
  }

  clone() {
    this.onNext("clone")
  }

  onNext(action: string) {
    if (this.code.length > 0)
      this.router.navigate(
        ['../create-tariff']
        , {
          queryParams: {
            action: action,
            code: this.code
          },
          relativeTo: this.route
        });
    else this.util.notify("Select a Tariff to continue!.", 0)
  }
}
