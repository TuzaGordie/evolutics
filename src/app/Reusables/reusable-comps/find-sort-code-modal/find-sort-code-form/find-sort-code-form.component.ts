import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountExtrasService } from 'src/app/Life/Setup/Account/accounts-extras/account-extras.service';
import { SortCodeService } from 'src/app/Services/sort-code.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { ISortCodeSearchResponse } from 'src/app/Shared/models/sort-code.interface';

@Component({
  selector: 'app-find-sort-code-form',
  templateUrl: './find-sort-code-form.component.html',
  styleUrls: ['./find-sort-code-form.component.scss'],
})
export class FindSortCodeFormComponent implements OnInit {
  @Input() isModal: boolean;
  @Input() showShowBtn: boolean = true;
  @Output() selectedItem = new EventEmitter();
  form = new FormGroup({
    // allSortCodes: configForms.required()
    bankName: configForms.default(),
    branch: configForms.default(),
    city: configForms.default(),
    country: configForms.default(),
    region: configForms.default(),
    sortCode: configForms.default(),
    town: configForms.default(),
  });
  loading: boolean;
  result: ISortCodeSearchResponse;
  constructor(public aeS: AccountExtrasService, public scS: SortCodeService) {}

  ngOnInit(): void {}
  search() {
    this.loading = true;
    this.scS.search(this.form.value).subscribe(
      (r) => {
        this.result = r;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  select(index: number) {
    const item = this.result?.page?.content[index];
    this.selectedItem.emit(item); 
  }
}
