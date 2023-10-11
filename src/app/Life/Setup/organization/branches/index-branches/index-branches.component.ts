import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBranchState } from 'src/app/ApiModels/branch.interface';
import { ICompanyState } from 'src/app/ApiModels/company.interface';
import { selectBranchState } from 'src/app/Store/BranchAPIStore/branch.selector';
import { selectCompanyState } from 'src/app/Store/CompanyAPIStore/company.selector';
import { BranchService } from '../services/branch.service';

@Component({
  selector: 'app-index-branches',
  templateUrl: './index-branches.component.html',
  styleUrls: ['./index-branches.component.scss'],
})
export class IndexBranchesOrgComponent implements OnInit {
  companies: any[] = []
  branches: any[] = [];

  company: string = '';
  branch: string = '';

  @ViewChild('f') form: any;

  constructor(
    public router: Router,public route:ActivatedRoute,
    private store: Store,
    private _formBuilder: FormBuilder,
    private branchService: BranchService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void { 
    this.getBranchCompanyCodes()
  }

  getBranchCompanyCodes(){
    this.branchService.getCompanies()
    .subscribe((data: any) => {
      this.companies = data
    })
  }

  fetchAction(action: string) {
    this.snack.open('Processing........');
    this.branchService
      .getBranchByCompanyAndBranchCode(this.company, this.branch)
      .subscribe(
        (data: any) => {
          this.snack.dismiss();
          if (data != null) {
            localStorage.setItem(action, JSON.stringify(data));
            this.router.navigate(['../create-branches'],{relativeTo:this.route});
            return;
          }
          this.snack.open(
            'Can not find branch with select Branch and Company!.',
            'Close',
            { duration: 5000 }
          );
          return;
        },
        (err: any) => {
          this.snack.dismiss();
          this.snack.open('Internal server error.', 'Close', {
            duration: 5000,
          });
        }
      );
  }

  getBranchCodeByCompany() {
    this.branchService.getBranchByCompany(this.company)
      .subscribe((data: any) => {
        this.branches = data
      })
  }

  clone(): void {
    if (this.form.valid) {
      this.fetchAction('cloneBranch');
    } else {
      this.snack.open('Select a branch and a company', 'Close', {
        duration: 5000,
      });
    }
  }

  show(): void {
    if (this.form.valid) {
      this.fetchAction('updateBranch');
    } else {
      this.snack.open('Select a branch and a company', 'Close', {
        duration: 5000,
      });
    }
  }
 
}
