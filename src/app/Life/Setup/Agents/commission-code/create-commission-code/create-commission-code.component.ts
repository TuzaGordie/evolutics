import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { CommissionCodeService } from '../commission-code.service';
import { CommissionCode } from '../commissionCode.interface';

@Component({
  selector: 'app-create-commission-code',
  templateUrl: './create-commission-code.component.html',
  styleUrls: ['./create-commission-code.component.scss'],
})
export class CreateSetupsCommissionCodeComponent implements OnInit {
  constructor(public utility: UtilityService, public commCodeService: CommissionCodeService, private activatedRoute: ActivatedRoute) { }
  @ViewChild('commCodeForm') form: NgForm
  showMode = false
  commTypeVersionNo = ""
  public commGroupData: any[];
  public writingCommTables: any;
  public hierachyCommBasiss: any[];
  public hierachyCommTables: any[];
  public commTypeVersions: any = [{
    date: "",
    versionNo: 1,
    rowId: null,
    deleted: false,
    id: null
  }]
  loadingText = ""
  loading = false
  public commCodeData: CommissionCode
  public commissionCode: any = {
    commType: {
      code: "",
      group: "",
      description: "",
      writingCommTable: "",
      hierachyCommBasis: "",
      versionNo: 1,
      hierachyCommTable: "",
      id: null,
    },
    commTypeVersion: this.commTypeVersions
  }

  ngOnInit(): void {
    this.commCodeService.getCodeAndTitleByCodeSubGroup("COMM_GROUP").subscribe((res: any[]) => { this.commGroupData = res; })
    this.commCodeService.getCodeAndTitleByCodeSubGroup("HIERACHY_COMM_BASIS").subscribe((res: any[]) => { this.hierachyCommBasiss = res; })
    this.commCodeService.getGeneralRateCodeAndDescriptionByCategory("C").subscribe((res) => { this.writingCommTables = res; })
    this.commCodeService.getGeneralRateCodeAndDescriptionByCategory("HC").subscribe((res: any[]) => { this.hierachyCommTables = res; })

    this.activatedRoute.queryParams
      .subscribe(
        params => {
          var code = params.code
          var action = params.action

          if (action != null && code != null)
            this.fetchCommType(code, action)
        }
      )

  }

  fetchCommType(code, action) {
    this.loading = true
    this.loadingText = "Fetching Commission Code...."
    this.commCodeService.getCommType(code)
      .subscribe((res: CommissionCode) => {
        this.loading = false

        if (res == null) {
          this.commissionCode = this.commissionCode
          return
        }

        if (action == "show") this.showMode = true

        this.commissionCode.commType = res.commType
        this.commissionCode.commTypeVersion = []

        res.commTypeVersion.map(version => {
          if (action == "clone") delete version.id
          version.rowId = this.commissionCode.commTypeVersion.length + 1
          this.commissionCode.commTypeVersion.push(version)
          this.commTypeVersions.push(version)
        })

        if (action == "clone") delete this.commissionCode.commType.id

      }, () => {
        this.loading = false
        this.utility.notify("Internal server error.", 0);
      }
      )
  }

  getCommTypeByVersionNo() {
    this.loading = true
    this.loadingText = "Fetching Commission Code...."
    this.commCodeService.getCommTypeAndVersionNo(this.commissionCode.commType.code, this.commTypeVersionNo)
      .subscribe((res) => {
        this.loading = false

        if (res == null) {
          this.commissionCode.commType = {
            code: this.commissionCode.commType.code,
            group: this.commissionCode.commType.group,
            description: "",
            writingCommTable: "",
            hierachyCommBasis: "",
            versionNo: 1,
            hierachyCommTable: "",
            id: null,
          }
          return
        }

        this.commissionCode.commType = res

      }, () => {
        this.loading = false
        this.utility.notify("Internal server error.", 0);
      })
  }

  addNewCommTypeVersion() {
    this.showMode = false
    this.addCommTypeVersion()
  }

  deleteCommTypeVersion(i: any) {
    this.commissionCode.commTypeVersion.splice(i, 1)
  }

  addCommTypeVersion() {
    this.commissionCode.commTypeVersion.push({
      date: "",
      versionNo: this.commissionCode.commTypeVersion.length + 1,
      rowId: null,
      deleted: false,
      id: null
    })

    this.commissionCode.commType = {
      code: this.commissionCode.commType.code,
      group: "",
      description: "",
      writingCommTable: "",
      hierachyCommBasis: "",
      versionNo: this.commissionCode.commTypeVersion.length + 1,
      hierachyCommTable: "",
      id: null,
    }
  }

  submitCommCode() {
    if (this.form.form.invalid) {
      this.utility.notify("Kindly fill all required fields!.", 0, 5000);
      return
    }

    this.commissionCode.commType.versionNo = this.commissionCode.commTypeVersion[this.commissionCode.commTypeVersion.length - 1].versionNo

    if (this.commissionCode.commType.id == null && this.commissionCode.commType.versionNo < 1) {
      delete this.commissionCode.commType.code
    }

    this.loading = true
    this.loadingText = "Saving Commission Code..."
    this.commCodeService.createCommissionCode(this.commissionCode)
      .subscribe((res: CommissionCode) => {
        this.loading = false
        this.utility.info("Commission Code has been created successfully!.", 1, res.commType.code);
        this.commissionCode = res
      },
        () => {
          this.loading = false
          this.utility.notify("Error, Please try again later", 0, 3000);
        })
  }
}
