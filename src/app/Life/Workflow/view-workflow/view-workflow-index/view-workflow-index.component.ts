import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { FindWorkflowService } from '../../service/find-workflow.service';
import { IWorkflow } from '../../service/workflow.interface';
import { shareReplay, switchMap } from 'rxjs/operators';
import { ViewWorkflowService } from '../view-workflow.service';
import { HttpErrorResponse } from "@angular/common/http";
import { HelpersService } from '../../service/helpers.service';
import { AppService } from 'src/app/Services/app.service';


@Component({
  selector: 'app-view-workflow-index',
  templateUrl: './view-workflow-index.component.html',
  styleUrls: ['./view-workflow-index.component.scss'],
})
export class ViewWorkflowIndexComponent implements OnInit {
  statusCodesList: any[];
  workflowStatus;
  getStatusColour;
  getSLAColour;
  queryParams;
  documentLength: number = 0
  status: string = "unknown"
  snoozeDuration
  wfCreated: string
  wfUpdated: string
  wfEnd: string
  wfEndDate: string
  TimeOsDays: number | string
  TimeOsHours: number | string
  TimeOsMins: number | string
  TimeOtDays: number | string
  TimeOtHours: number | string
  TimeOtMins: number | string
 
  noOfDocuments: number;
  loading: boolean;

  constructor(private viewWfService: ViewWorkflowService, private route: ActivatedRoute, private helpersService: HelpersService,public appS:AppService) {
    this.getStatusColour = this.helpersService.getStatusColour;
    this.getSLAColour = this.helpersService.getSLALevelColour;
  }

  wfNo: string;
  wfData: IWorkflow | undefined

  ngOnInit(): void {
    this.loading=true
    this.queryParams = this.route.snapshot.queryParamMap
    this.wfNo = this.queryParams.get('wfNo')
    this.viewWfService.getDocumentsByParameters({refCategory: 'WF', refNo: this.wfNo}).subscribe( data => {
      this.documentLength = data.length
    } )
    this.viewWfService.getSnoozeDuration(this.wfNo).subscribe(data => {
      this.snoozeDuration = data
    })

  this.viewWfService.getWorkflowDetails(this.queryParams.get('wfNo')).subscribe(data => {
    console.log(data)
    this.wfData = data

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let created = new Date(this.wfData.createdOn as unknown as string)
    let updated = new Date(this.wfData.modifiedOn as unknown as string)
    let end = new Date(this.wfData.finishOn as unknown as string)
    
    this.wfCreated = this.wfData.createdOn ? `${created.getDate()}/${months[created.getMonth()]}/${created.getFullYear()} ${created.getHours()}:${created.getMinutes()}` : '--'
    this.wfUpdated = this.wfData.modifiedOn ? `${updated.getDate()}/${months[updated.getMonth()]}/${updated.getFullYear()} ${updated.getHours()}:${updated.getMinutes()}` : '--'
    this.wfEnd = this.wfData.finishOn ? `${end.getDate()}/${months[end.getMonth()]}/${end.getFullYear()} ${end.getHours()}:${end.getMinutes()}` : '--'
    this.wfEndDate = this.wfData.finishOn ? `${end.getDate()}/${months[end.getMonth()]}/${end.getFullYear()}` : '--'


    let myTime = this.wfData.timeOsSla ? this.wfData.timeOsSla : 0
    let myTimes = this.wfData.timeToSla ? this.wfData.timeToSla : 0
    this.TimeOsDays = Math.floor(myTime / 1440)
    this.TimeOsHours = Math.floor((myTime % 1440) / 60)
    this.TimeOsMins = ((myTime % 1440) % 60)

    this.TimeOtDays = Math.abs(Math.floor(myTimes / 1440))
    this.TimeOtHours = Math.abs(Math.floor((myTimes % 1440) / 60))
    this.TimeOtMins = Math.abs((myTimes % 1440) % 60)

    this.TimeOsDays = this.TimeOsDays < 10 ? `0${this.TimeOsDays}` : `${this.TimeOsDays}`
    this.TimeOsMins = this.TimeOsMins < 10 ? `0${this.TimeOsMins}` : `${this.TimeOsMins}`
    this.TimeOsHours = this.TimeOsHours < 10 ? `0${this.TimeOsHours}` : `${this.TimeOsHours}`

    this.TimeOtDays = this.TimeOtDays < 10 ? `0${this.TimeOtDays}` : `${this.TimeOtDays}`
    this.TimeOtMins = this.TimeOtMins < 10 ? `0${this.TimeOtMins}` : `${this.TimeOtMins}`
    this.TimeOtHours = this.TimeOtHours < 10 ? `0${this.TimeOtHours}` : `${this.TimeOtHours}`

    switch (this.wfData.status) {
      case 'A': 
        this.status = "Active"
        break
      case 'T':
        this.status = "Terminated"
        break
      case 'C':
        this.status = "Closed"
        break
      default:
        this.status = "Unknown"
    }
    this.loading=false
  },e=>{
    this.loading=false
    
  })

   this.setWorkflowStatuses();
  }

  setWorkflowStatuses(){
    this.viewWfService.getWorkflowStatuses()
      .subscribe(
        (res: any[]) => this.statusCodesList = res,
        (err: HttpErrorResponse) => console.log("Error fetching workflow statuses", err)
      )
  }

  escalate(){
    console.log('escalating...')
  }

  error(){
    console.log('error...')
  }

  authorize(){
    console.log('authorizing...')}
  setNoOfDocuments(){
    return this.viewWfService.getNoOfDocuments(this.wfNo).subscribe(
      res => this.noOfDocuments = res || 0,
      (err: HttpErrorResponse) => console.log("Error fetching no of documents for workflow no: ", this.wfNo)
    )
  }
  unreset(){

  }
}
