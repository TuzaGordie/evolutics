import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { Code } from 'src/app/Shared/models/life/setup/codes/Codes';

@Component({
  selector: 'app-index-parameters',
  templateUrl: './index-parameters.component.html',
  styleUrls: ['./index-parameters.component.scss'],
})
export class IndexCodeParametersComponent implements OnInit {
  allCodes: any[] = [];
  allCodeGroups: any[] = [];
  allCodeSubGroups: any[] = [];
  codeSubgroup: string = '';
  codeGroup: string = '';

  message = {
    success: false,
    warning: false,
    error: false,
  };

  constructor(
    public router: Router,public route:ActivatedRoute,
    private codeService: CodeService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllCodeGroups();
    this.getAllCodeSubGroups()
  }

  getAllCodeSubGroups() {
    this.codeService.getAllCodeSubGroups()
      .subscribe((data: any) => {
        this.allCodeSubGroups = data
      })
  }

  getAllCodeGroups() {
    this.codeService.getCodeGroups()
      .subscribe((data: any) => {
        this.allCodeGroups = data;
      });
  }

  getAllCodeSubGroupsByGroup() {
    this.codeService
      .getAllCodeByGroup(this.codeGroup)
      .subscribe((data: any) => {
        this.allCodeSubGroups = data;
      });
  }

  createSubGroup() { 
    this.router.navigate(['../create-subgroup-parameters'],{relativeTo:this.route});
  }

  createGroup() {
    this.router.navigate(['../create-parameters'],{relativeTo:this.route});
  }

  getAllCodesByCode(code: string): void {
    this.allCodes = this.allCodeSubGroups.filter((allCodeSubGroup) => {
      return allCodeSubGroup.code === code
    })
  }

  show(): void {
    if (this.codeGroup.length > 0) {
      if (this.codeSubgroup.length > 0) {
        this.snack.open("Processing.....")
        this.codeService.getAllCodeByCodeSubGroup(this.codeSubgroup)
          .subscribe((data: any) => {
            localStorage.setItem('codeSubgroup', JSON.stringify(data))
    this.router.navigate(['../create-subgroup-parameters'],{relativeTo:this.route});
            this.snack.dismiss()
          }, () => {
            this.snack.dismiss()
            this.snack.open("Internal server error", "Close", { duration: 5000 })
          })
      } else {
        this.message.error = true;
      }
    } else this.message.error = true;
  }

  onNext() {
    this.router.navigate(['../create-subgroup-parameters'],{relativeTo:this.route});
    console.log();
  }
}