import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ViewWorkflowService } from '../../view-workflow.service';

@Component({
  selector: 'app-workfow-escalate-view',
  templateUrl: './workfow-escalate-view.component.html',
  styleUrls: ['./workfow-escalate-view.component.scss']
})
export class WorkfowEscalateViewComponent implements OnInit {
  queryParams: any;
  params: any
  escalForm: FormGroup
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private wfService: ViewWorkflowService) { }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParamMap
    this.params = {
      wfNo: this.queryParams.get('wfNo'),
      tcd: this.queryParams.get('tcd'),
      refNo: this.queryParams.get('rno'),
      refCat: this.queryParams.get('rct'),
      userCode: environment.user?.code
    }
    this.escalForm = this.fb.group({
      comment: new FormControl(null, Validators.required),
    })
  }



  async submit() {
    console.log(this.escalForm.value)
    const submitData = {
      escalationLevel: "E1",
      narration: this.escalForm.value.comment,
      userCode: environment.user?.code,
      wfNo: this.params.wfNo
    }
    await this.wfService.escalateWorkFlow(submitData).toPromise()
      .then(res=>console.log(res))
      .catch(err => console.error(err))
  }
}
