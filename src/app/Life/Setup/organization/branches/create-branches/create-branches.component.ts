import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBranchState } from 'src/app/ApiModels/branch.interface';
import { ICompanyState } from 'src/app/ApiModels/company.interface';
import { selectBranchState } from 'src/app/Store/BranchAPIStore/branch.selector';
import { selectCompanyState } from 'src/app/Store/CompanyAPIStore/company.selector';
import {
  ICountryData,
  ILgaState,
  IRegionState,
  IStateState,
  ITownState,
} from 'src/app/ApiModels/location.interface';
import * as LocationSelector from 'src/app/Store/LocationAPIStore/location.selector';
import * as LocationActions from 'src/app/Store/LocationAPIStore/location.actions';
import * as BranchActions from 'src/app/Store/BranchAPIStore/branch.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createBranchResponseState } from 'src/app/Store/BranchAPIStore/branch.selector';
import { apiResponseFailureState } from 'src/app/Store/CoreActions/core.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from 'src/app/Services/location.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { Branch } from '../models/branch';
import { BranchService } from '../services/branch.service';

@Component({
  selector: 'app-create-branches',
  templateUrl: './create-branches.component.html',
  styleUrls: ['./create-branches.component.scss'],
})
export class CreateBranchesOrgComponent implements OnInit {
  @ViewChild('f') form: any;

  companies: any[] = [];
  branches: any[] = [];

  countries: any[] = [];
  states: any[] = [];
  regions: any[] = [];
  lgas: any[] = [];
  towns: any[] = [];
  createdSuccesfully: any[] = [];
  apiErrorResponse: any[] = [];

  createBranch = new Branch();

  branchCodeDisable: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private locationService: LocationService,
    private companyService: CompanyService,
    private branchService: BranchService
  ) { }

  ngOnInit(): void {
    this.getCompany();
    this.getCountry();

    let clone = JSON.parse(localStorage.getItem('cloneBranch'));
    let update = JSON.parse(localStorage.getItem('updateBranch'));

    if (clone != null) {
      this.createBranch = clone;
      delete this.createBranch.id;
      delete this.createBranch.code;

      this.getLocation(clone);

      localStorage.removeItem('cloneBranch');
    }

    if (update != null) {
      this.createBranch = update;

      this.getLocation(update);
      this.branchCodeDisable = true;
      localStorage.removeItem('updateBranch');
    }
  }

  getLocation(obj: Branch) {
    this.getRegion(obj.country);
    this.getStates(obj.region);
    this.getTown(obj.city);
  }

  getCompany(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });
  }

  getCountry(): void {
    this.locationService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  selectCountry(country: string) {
    this.getRegion(country);
  }

  getRegion(country: string): void {
    this.locationService.getRegion(country).subscribe((data: any) => {
      this.regions = data;
    });
  }

  selectRegion(region: string) {
    this.getStates(region);
  }

  getStates(region: string): void {
    this.locationService.getStates(region).subscribe((data: any) => {
      this.states = data;
    });
  }

  selectState(stateCode: string) {
    this.getTown(stateCode);
  }

  getTown(stateCode: string): void {
    this.locationService.getTown(stateCode).subscribe((data: any) => {
      this.towns = data;
    });
  }

  submitCreateBranchForm(): void {
    if (this.form.valid) {
      this.snack.open("Processing.......")
      this.branchService
        .createBranch(this.createBranch)
        .subscribe((data: any) => {
          this.snack.open('Branch created successfully!.', 'Close', {
            duration: 5000,
          });
        }, () => {
          this.snack.open("Internal server error.", "Close", { duration: 5000 })
        });
    } else {
      this.snack.open(
        'Processing failed, check that all entries are supplied!.',
        'Close',
        { duration: 5000 }
      );
    }
  }
}
