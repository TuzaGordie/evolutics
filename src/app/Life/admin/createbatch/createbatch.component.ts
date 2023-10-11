import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';
import { BatchService } from './batch.service';
import { BatchSetup, BatchSetupCompany, BatchSetupProcess, BatchSetupSchedule, CreateBatchModel } from './createBatch';
@Component({
  selector: 'app-createbatch',
  templateUrl: './createbatch.component.html',
  styleUrls: ['./createbatch.component.scss'],
})
export class CreatebatchComponent implements OnInit {
  @ViewChild('createBatchForm') createBatchForm: NgForm;

  public selectBatchCategory: any[] = [];
  public scheduleBasisArray: any[] = [];
  public selectBatch: any[] = [];
  public companyArray: any[] = [];
  public batchLogReportBasisArray: any[] = [];
  public typeArray: any[] = [];
  public processCodeArray: any[] = [];
  public parameterBasisArray: any[] = [];
  public parameterArray: any[] = [[]]

  loadingText = ""
  loading = false

  public batchCat: string
  public selectBat: string

  constructor(public router: Router, private route: ActivatedRoute, private batchService: BatchService, private utility: UtilityService) { }
  operation: string = 'actions'

  batchSetup = new BatchSetup()
  batchSetupCompany = new BatchSetupCompany()
  batchSetupProcess = new BatchSetupProcess()
  batchSetupSchedule = new BatchSetupSchedule()
  createBatchData = new CreateBatchModel(
    this.batchSetup,
    this.batchSetupCompany,
    [this.batchSetupProcess],
    [this.batchSetupSchedule]
  )

  batchSetupCodes: any[] = []
  lineNoCount: number = 1
  public processCode: any
  public selectedParameterBasis: any

  ngOnInit(): void {
    this.batchService.getCodesByCodeSubGroup("BATCH_GROUP").subscribe((res: any[]) => { this.selectBatchCategory = res })
    this.batchService.getCodesByCodeSubGroup("SCHEDULE_BASIS").subscribe((res: any[]) => { this.scheduleBasisArray = res })
    this.batchService.getCompanyCodeAndDescription().subscribe((res: any[]) => { this.companyArray = res })
    this.batchService.getCodesByCodeSubGroup("BATCH_LOG_ACTION").subscribe((res: any[]) => { this.batchLogReportBasisArray = res })
    this.batchService.getCodesByCodeSubGroup("PROCESS_TYPE").subscribe((res: any[]) => { this.typeArray = res })
    this.batchService.getBatchProcessCodeAndDescription().subscribe((res: any[]) => { this.processCodeArray = res })
    this.batchService.getBatchProcessCodeAndDescription().subscribe((res: any[]) => { this.processCodeArray = res })
    this.batchService.getParameterByProcessCode("PARAMETER_BASIS").subscribe((res: any[]) => { this.parameterBasisArray = res })

    this.route.paramMap.subscribe(
      params => {
        const oper = params.get('operation')
        this.operation = oper ? oper : 'actions';
      }
    )

    this.route.queryParams
      .subscribe(
        params => {
          console.log("params", params)
          const code = params.code
          const action = params.action
          if (code != null && action != null) {
            this.fetchBatch(action, code)
          }
        }
      )
  }

  deleteSingleBatch(i: number) {
    this.createBatchData.batchSetupSchedule.splice(i, 1)
  }

  changeProcess(event: any) {
    this.processCode = event.valueAccessor.value
  }

  changeParameterBasis(i: number) {
    if (this.createBatchData.batchSetupProcess[i] && this.createBatchData.batchSetupProcess[i].processCode != null && this.createBatchData.batchSetupProcess[i].parameterBasis != null)
      this.batchService.getAllParameterByProcessCodeAndParameterBasis(
        this.createBatchData.batchSetupProcess[i].processCode, this.createBatchData.batchSetupProcess[i].parameterBasis)
        .subscribe(
          (res: any) => {
            this.parameterArray[i] = res
          }
        )

  }

  getParameter() {
    this.batchService.getAllParameterByProcessCodeAndParameterBasis(
      this.processCode, this.selectedParameterBasis)
      .subscribe(
        (res: any) => {
          this.parameterArray = res
        }
      )
  }

  addBatch() {
    var batchSetupSchedule = new BatchSetupSchedule()
    batchSetupSchedule.rowId = this.createBatchData.batchSetupSchedule.length + 1
    batchSetupSchedule.createdBy = "user"
    this.createBatchData.batchSetupSchedule.push(batchSetupSchedule)
  }

  addTp() {
    var batchSetupProcess = new BatchSetupProcess()
    batchSetupProcess.rowId = this.createBatchData.batchSetupProcess.length + 1
    batchSetupProcess.createdBy = "user"
    batchSetupProcess.select = false
    batchSetupProcess.hoursAfter = 0
    batchSetupProcess.lineNo = this.createBatchData.batchSetupProcess.length + 1
    this.createBatchData.batchSetupProcess.push(batchSetupProcess)
  }

  deleteTp(i: number) {
    this.lineNoCount = this.createBatchData.batchSetupProcess.length - 1
    this.createBatchData.batchSetupProcess.splice(i, 1)

    let arr: number[] = []
    for (let index = 1; index < this.createBatchData.batchSetupProcess.length + 1; index++) {
      arr.push(index)
    }

    for (let index = 0; index < this.createBatchData.batchSetupProcess.length + 0; index++) {
      this.createBatchData.batchSetupProcess[index].lineNo = arr[index]
    }

  }

  fetchBatch(action: string, code: string) {
    this.loading = true
    this.loadingText = "Fetching Batch Setup record....."
    this.batchService.fetchBatchByCode(code)
      .subscribe((data: CreateBatchModel) => {
        this.loading = false
        if (action == "show") {
          this.createBatchData.batchSetupProcess = []
          this.createBatchData.batchSetupSchedule = []

          this.createBatchData.batchSetup = data.batchSetup
          this.createBatchData.batchSetupCompany = data.batchSetupCompany == null ? new BatchSetupCompany() : data.batchSetupCompany

          data.batchSetupProcess.map((batchSetupProcess, i) => {
            batchSetupProcess.lineNo = ++i
            batchSetupProcess.rowId = this.createBatchData.batchSetupProcess.length + 1
            this.createBatchData.batchSetupProcess.push(batchSetupProcess)

            // this.changeParameterBasis(i)

            this.batchService.getAllParameterByProcessCodeAndParameterBasis(batchSetupProcess.processCode, batchSetupProcess.parameterBasis)
              .subscribe(
                (res: any) => {
                  this.parameterArray[i-1] = res
                }
              )
          })
          data.batchSetupSchedule.map(batchSetupSchedule => {
            console.log("batchSetupSchedule", batchSetupSchedule)
            batchSetupSchedule.rowId = this.createBatchData.batchSetupSchedule.length + 1
            this.createBatchData.batchSetupSchedule.push(batchSetupSchedule)
          })

          if (this.createBatchData.batchSetupProcess.length < 1) this.addTp()
          if (this.createBatchData.batchSetupSchedule.length < 1) this.addBatch()
        }

        if (action == "clone") {

          this.createBatchData.batchSetupProcess = []
          this.createBatchData.batchSetupSchedule = []

          this.createBatchData.batchSetup = data.batchSetup
          this.createBatchData.batchSetupCompany = data.batchSetupCompany == null ? new BatchSetupCompany() : data.batchSetupCompany

          delete this.createBatchData.batchSetup.id
          delete this.createBatchData.batchSetup.code
          delete this.createBatchData.batchSetupCompany.id

          data.batchSetupProcess.map((batchSetupProcess, i) => {
            delete batchSetupProcess.id
            batchSetupProcess.lineNo = ++i
            batchSetupProcess.rowId = this.createBatchData.batchSetupProcess.length + 1
            this.createBatchData.batchSetupProcess.push(batchSetupProcess)

            // this.changeParameterBasis(i)

            this.batchService.getAllParameterByProcessCodeAndParameterBasis(batchSetupProcess.processCode, batchSetupProcess.parameterBasis)
              .subscribe(
                (res: any) => {
                  this.parameterArray[i-1] = res
                }
              )
          })
          data.batchSetupSchedule.map(batchSetupSchedule => {
            delete batchSetupSchedule.id
            batchSetupSchedule.rowId = this.createBatchData.batchSetupSchedule.length + 1
            this.createBatchData.batchSetupSchedule.push(batchSetupSchedule)
          })

          if (this.createBatchData.batchSetupProcess.length < 1) this.addTp()
          if (this.createBatchData.batchSetupSchedule.length < 1) this.addBatch()
        }
      }, () => {
        this.loading = false
        this.utility.notify("Internal server error!.", 0, 5000)
      })
  }

  selectCategory() {
    this.batchService.getBatchCodeAndDescByCategory(this.batchCat)
      .subscribe((data: any) => {
        this.batchSetupCodes = data
      }, () => {
        this.utility.notify("Internal server error!.", 0)
      })
  }

  show() {
    if (this.selectBat.length > 0) {
      this.router.navigate(
        ["show"],
        {
          queryParams: {
            action: "show",
            code: this.selectBat
          },
          relativeTo: this.route
        }
      )
    } else {
      this.utility.notify("Select a Batch Code to continue.", 2)
    }
  }

  clone() {
    if (this.selectBat.length > 0) {
      this.router.navigate(
        ["show"],
        {
          queryParams: {
            action: "clone",
            code: this.selectBat
          },
          relativeTo: this.route
        }
      )
    } else {
      this.utility.notify("Select a Batch Code to continue.", 2)
    }
  }

  createBatch() {
    this.loading = true
    this.loadingText = "Saving Batch Setup record....."

    //merge starton with schedule time0-k9
    this.createBatchData.batchSetupSchedule.map(schedule => {      
      schedule.scheduleTime = schedule.startOn.split('T')[1]
    })

    this.batchService.createBatch(this.createBatchData)
      .subscribe((data: any) => {
        this.createBatchData.batchSetup.code = data.batchSetup.code
        this.loading = false
        this.utility.notify("The batch has successfully been created", 1, 3000)
      }, () => {
        this.loading = false
        this.utility.notify("Internal server error!.", 0, 3000);

      })
  }
}
