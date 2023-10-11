import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { BatchService } from '../createbatch/batch.service';
import { BatchLog, BatchLogDetails, BatchLogReq } from './batchlog';
import { BatchLogService } from './batchlog.service';

@Component({
  selector: 'app-batchlog',
  templateUrl: './batchlog.component.html',
  styleUrls: ['./batchlog.component.scss']
})
export class BatchlogComponent implements OnInit {

  operation: string = 'actions'

  topBarElements: any[] = []

  batchCategories: any[] = []
  batchCodes: any[] = []
  batchNos: any[] = []

  batchParams = {
    batchCategory: "",
    batchCode: "",
    batchNo: "",
    enterDate: ""
  }

  batchLog = new BatchLog()
  batchLogDetails = new BatchLogDetails()
  batchLogReq = new BatchLogReq(
    this.batchLog,
    [this.batchLogDetails]
  )

  constructor(private utility: UtilityService, private router: Router, private route: ActivatedRoute, private codeService: CodeService, private batchLogService: BatchLogService) { }

  ngOnInit(): void {
    this.codeService.getCodesByCodeSubGroup("BATCH_GROUP").subscribe((data: any) => { this.batchCategories = data })

    this.route.paramMap.subscribe(
      params => {
        const oper = params.get('operation')
        this.operation = oper ? oper : 'actions';
      }
    )

    this.route.queryParams
      .subscribe(
        params => {
          const { batchNo, startOn } = params
          if (batchNo != null && startOn != null)
            this.fetchbatchLog(startOn, batchNo)
        }
      )
  }

  fetchbatchLog(enterDate, batchNo) {
    this.batchLogService.getBatchLogDetailsByStartDateAndBatchNo(enterDate, batchNo)
      .subscribe((data: BatchLogReq) => {
        this.batchLogReq = data

        this.topBarElements = [
          { title: 'Batch Code', content: data.batchLog.code }
          , { title: 'Batch Name', content: data.batchLog.description }
          , { title: 'Batch No', content: data.batchLog.batchNo }
          , { title: 'Start Date', content: data.batchLog.startOn.split('T')[0] }
          , { title: 'Start Time', content: data.batchLog.startOn.split('T')[1] }
          , { title: 'End Date', content: data.batchLog.startOn.split('T')[0] }
          , { title: 'End Time', content: data.batchLog.startOn.split('T')[1] }
          , { title: 'Batch Run Time', content: data.batchLog.timeElapsed }
          , { title: 'Schedule Basis', content: data.batchLog.scheduleBasis }
          , { title: 'Next Batch Date', content: data.batchLog.nextBatchDate }
          , { title: 'Next Batch Time', content: data.batchLog.nextBatchTime }
          , { title: 'User Initiated', content: data.batchLog.runBy }
        ]
      })
  }

  getBatchCodes() {
    this.batchLogService.getBatchCodesByCat(this.batchParams.batchCategory).subscribe((data: any) => { this.batchCodes = data })
  }

  getBatchNos() {
    this.batchLogService.getBatchLogsByBatchCode(this.batchParams.batchCode).subscribe((data: any) => { this.batchNos = data })
    // this.batchLogService.getBatchLogsByBatchCode("EOD1").subscribe((data: any) => { this.batchNos = data })
  }

  showBatch() {
    if (this.batchParams.batchNo.length > 0) {
      var batchIndex = this.batchNos.findIndex(nos => nos.batchNo == this.batchParams.batchNo)

      if (batchIndex < 0) return

      var startOn = this.batchNos[batchIndex].startOn      
      this.batchLogService.getBatchLogDetailsByStartDateAndBatchNo(startOn.split('T')[0], this.batchParams.batchNo)
        .subscribe((data) => {
          this.router.navigate(
            ["show"],
            {
              queryParams: {
                batchNo: this.batchParams.batchNo,
                startOn: startOn.split('T')[0]
              },
              relativeTo: this.route
            }
          )
        }, (err) => {
          if (err.error.status == 404) {
            this.utility.notify(err, 0)
            return
          }
          this.utility.notify("Internal server error!.", 0)
        })

    } else {
      this.utility.notify("Select a Batch No and Pick a date to continue.", 2)
    }
  }
}
