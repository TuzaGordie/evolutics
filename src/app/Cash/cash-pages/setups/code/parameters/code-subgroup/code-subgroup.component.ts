import { Component, OnInit, ViewChild } from '@angular/core';
import { Codes, Code } from 'src/app/Shared/models/life/setup/codes/Codes';
import { CodeService } from 'src/app/Services/code.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-subgroup',
  templateUrl: './code-subgroup.component.html',
  styleUrls: ['./code-subgroup.component.scss']
})
export class CashCodeSubgroupComponent implements OnInit {
  private nbofCreator: number = 1;

  @ViewChild("f") form: any;

  code = new Code()
  codes = new Codes(
    [this.code]
  )

  isDisabled: boolean = false

  recType: string = "";
  codeSubgroup: string = "";
  codeGroup: string = "";

  recTypes: any[] = []
  codeGroups: any[] = []

  editMode: boolean = false

  constructor(
    private codeService: CodeService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCodeGroups()
    this.getRecType()

    let codeSubGroup = JSON.parse(localStorage.getItem("codeSubgroup"))

    if (codeSubGroup != null) {
      this.codes.code = []
      this.editMode = true

      codeSubGroup.map((code: Code) => {
        this.codeSubgroup = code.codeSubgroup
        this.codeGroup = code.codeGroup
        code.editable = code.recType != "S"
        code.rowId = this.codes.code.length + 1
        code.deleted = false
        this.codes.code.push(code)
      })

      localStorage.removeItem("codeSubgroup")
    }
  }

  getCodeGroups() {
    this.codeService.getCodeGroups()
      .subscribe((data: any) => {
        this.codeGroups = data
      })
  }

  getRecType() {
    this.codeService.getCodesByCodeSubGroup("SYSTEM_USER")
      .subscribe((data: any) => {
        this.recTypes = data
      })
  }

  removeCode(i: number) {
    if (this.codes.code[i].id != null || this.codes.code[i].id != undefined) this.codes.code[i].deleted = true
    else
      this.codes.code.splice(i, 1)
  }

  addCode() {
    let codeArr = new Code()
    codeArr.rowId = this.codes.code.length + 1
    this.codes.code.push(codeArr);
  }

  creatorCode() {
    if (this.form.valid) {
      this.snack.open("Processing.....", "Close", { duration: 10000 })

      if (this.codeGroup.length < 1) {
        this.snack.open("Code group not specified!.", "Close", { duration: 5000 })
      } else if (this.codeSubgroup.length < 1) {
        this.snack.open("Code subGroup not specified!.", "Close", { duration: 5000 })
      } else {
        this.codes.code.map(code => {
          code.codeGroup = this.codeGroup
          code.codeSubgroup = this.codeSubgroup
        })

        var codes = this.codes.code.map(function (item) { return item.code });
        var isDuplicate = codes.some(function (item, idx) {
          return codes.indexOf(item) != idx
        });

        if (isDuplicate) {
          this.snack.open("Kindly remove all duplicated code value.", "Close", { duration: 5000 })
          return
        }

        this.codeService.createCodes(this.codes.code)
          .subscribe((data: any) => {
            this.codes.code.map((code: Code) => {
              code.editable = code.recType != "S"
            })
            this.snack.dismiss()
            this.snack.open("successfully create codes", "Close", { duration: 5000 })
          })
      }
    } else {
      this.snack.open("Kindly fill all required fields!.", "Close", { duration: 5000 })
    }

  }

  creatorInc() {
    this.nbofCreator = this.nbofCreator + 1
  }

}
