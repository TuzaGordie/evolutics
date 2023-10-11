import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AssetService } from '../../asset-desk-extras/asset.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { CreateAssetService } from '../../create-asset/create-asset.service';
import { ActiveAssetTypes } from '../../asset-desk-extras/asset.interface';

@Component({
  selector: 'app-index-find-asset',
  templateUrl: './index-find-asset.component.html',
  styleUrls: ['./index-find-asset.component.scss'],
})
export class IndexFindAssetComponent implements OnInit {
  assetTypes: any[];
  form = new FormGroup({
    assetNo: new FormControl(
      null,
      Validators.required,
      this.validateItem.bind(this, 'assetNo')
    ),
    registrationNo: new FormControl(
      null,
      Validators.required,
      this.validateItem.bind(this, 'registrationNo')
    ),
  });
  searchForm = new FormGroup({
    assetType: new FormControl(),
    chasisNo: new FormControl(),
    createDateFrom: new FormControl(),
    createDateTo: new FormControl(),
    engineNo: new FormControl(),
    externalRef: new FormControl(),
    groupNo: new FormControl(),
    ownerClientNo: new FormControl(),
    ownerName: new FormControl(),
    policyNo: new FormControl(),
    vehicleBrand: new FormControl(),
    vehicleMake: new FormControl(),
    vehicleModel: new FormControl(),
  });
  formIsEmpty: boolean = true;
  constructor(
    private assS: AssetService,
    private caS: CreateAssetService,
    private router: Router,
    public route: ActivatedRoute,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getAssetType();
    this.form.valueChanges.subscribe((r) => {
      this.formIsEmpty = !Object.keys(r).find((x) => r[x]?.toString()?.trim());
    });
  }

  validateItem(field: string, control: AbstractControl) {
    return this.caS
      .validateUniqueness(field, control)
      .then((r) => (r ? null : { notUnique: true }));
  }

  showAsset(useRegNo = false) {
    this.router.navigate(['../view'], {
      relativeTo: this.route,
      queryParams: {
        regNo: useRegNo ? this.form.get('registrationNo')?.value : null,
        assetNo: useRegNo ? null : this.form.get('assetNo')?.value,
      },
    });
  }

  getAssetType() {
    this.assS.getAssetType().subscribe((data: any) => {
      this.assetTypes = data;
      this.assetTypes.forEach(
        (x) =>
          (x.active = ActiveAssetTypes.find((y) => y.value == x.code)?.isActive)
      );
    });
  }

  search() {
    this.router.navigate(['../search-list'], {
      relativeTo: this.route,
      queryParams: this.searchForm.value,
    });
  }
}
