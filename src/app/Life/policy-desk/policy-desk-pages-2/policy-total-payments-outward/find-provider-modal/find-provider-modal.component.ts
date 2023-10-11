import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-find-provider-modal',
  templateUrl: './find-provider-modal.component.html',
  styleUrls: ['./find-provider-modal.component.scss'],
})
export class FindProviderModalComponent implements OnInit {
  findProviderForm: FormGroup;
  isSearching: boolean = false;
  loadingSubCategories: boolean = false;

  providerCategories: any[];
  providerSubCategories: any[];

  constructor(
    private findClientService: FindClientService,
    private dialogRef: MatDialogRef<FindProviderModalComponent>,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.createFindProviderForm();
    this.setProviderCategories();
  }

  createFindProviderForm() {
    this.findProviderForm = new FormGroup({
      providerName: new FormControl(null),
      providerCategory: new FormControl(null),
      providerSubCategory: new FormControl(null),
    });
  }

  setProviderCategories() {
    this.findClientService
      .getProviderCategories()
      .subscribe((res) => (this.providerCategories = res));
  }

  setProviderSubCategories() {
    this.findProviderForm.patchValue({
      providerSubCategory: null,
    });
    this.loadingSubCategories = true;
    this.findClientService
      .getProviderSubCategories(this.findProviderForm.value.providerCategory)
      .subscribe((res) => (this.providerSubCategories = res))
      .add(() => (this.loadingSubCategories = false));
  }

  onSearch() {
    this.isSearching = true;
    this.findClientService
      .searchProvider(this.findProviderForm.value)
      .subscribe(
        (res) => {
          this.dialogRef.close(res);
        },
        (err: HttpErrorResponse) =>
          this.utilityService.info('No Provider Found', 0)
      )
      .add(() => (this.isSearching = false));
  }
}
