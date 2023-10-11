import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindWorkflowService } from '../../../service/find-workflow.service';
import { ViewWorkflowService } from '../../view-workflow.service';

@Component({
  selector: 'app-workfow-error-view',
  templateUrl: './workfow-error-view.component.html',
  styleUrls: ['./workfow-error-view.component.scss']
})
export class WorkfowErrorViewComponent implements OnInit {
  error
  queryParams
  tcd
  rct
  rno
  errorForm: FormGroup;
  isSettingError: boolean = false;
  isUnsettingError: boolean = false;
  wfNo: string;
  errorReasonsList: any[];
  errorSeveritiesList: any[];
  constructor(private viewWfService: ViewWorkflowService,
    private utilityService: UtilityService,
    private workflowService: ViewWorkflowService,
    private findWorkflowService: FindWorkflowService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParamMap
    this.wfNo = this.queryParams.get('wfNo')
    this.tcd = this.queryParams.get('tcd')
    this.rct = this.queryParams.get('rct')
    this.rno = this.queryParams.get('rno')

  
    this.createForm()
    this.setErrorReasonsList()
    this.setErrorSeveritiesList()
  }

  createForm(){
    this.errorForm = new FormGroup({
      errorLevel: new FormControl(null, Validators.required),
      errorReason: new FormControl(null, Validators.required),
      narration: new FormControl(null),
      wfNo: new FormControl(this.wfNo, Validators.required),
    })
  }

  onSetError(){
    console.log("errorForm")
    if (this.errorForm.invalid){
      this.errorForm.markAllAsTouched()
      return
    }
    if (!this.wfNo){
      this.utilityService.notify("No workflow number parameter in the URL", 0)
      return
    }
    this.isSettingError = true;
    this.workflowService.setError(this.errorForm.value).subscribe(
      (res) => {
        this.utilityService.notify("Workflow Error is successfully set")
        this.isSettingError = false;
      },
      (err: HttpErrorResponse) => {
        this.utilityService.notify("Couldn't set this error: " + err.statusText, 0)
        console.log("Error occured while setting workflow error", err)
        this.isSettingError = false;
      }
    )
  }

  onUnsetError(){
    this.isUnsettingError = true;

    this.workflowService.unsetError(this.wfNo).subscribe(
      (res: any) => {
        this.utilityService.notify("Error successfully unset")
      },
      (err: HttpErrorResponse) => {
        this.utilityService.notify("Couldn't unset error for wfNo: " + this.wfNo, 0)
        console.log("Couln't unset error", err)
      }
    )
  }

  isInvalid(control){
    return this.errorForm.controls[control].touched && this.errorForm.controls[control].errors
  }

  setErrorReasonsList(){
    this.findWorkflowService.getErrorReasonsList().subscribe(
      (res: any[]) => this.errorReasonsList = res,
      (err: HttpErrorResponse) => console.log("Error fetching error reasons list", err)
    )
  }

  setErrorSeveritiesList(){
    this.findWorkflowService.getErrorSeveritiesList().subscribe(
      (res: any[]) => this.errorSeveritiesList = res,
      (err: HttpErrorResponse) => console.log("Error fetching error severities list", err)
    )
  }
}
