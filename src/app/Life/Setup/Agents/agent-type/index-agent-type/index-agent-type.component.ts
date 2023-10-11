import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { AgentTypeService } from '../agent-type.service';

@Component({
  selector: 'app-index-agent-type',
  templateUrl: './index-agent-type.component.html',
  styleUrls: ['./index-agent-type.component.scss']
})
export class IndexSetupsAgentTypeComponent implements OnInit {

  constructor(
    public router: Router,public route:ActivatedRoute,
    private agentTypeService: AgentTypeService,
    private utility: UtilityService
  ) { }

  loading = false
  agentTypes: any[] = []
  type: string = "";

  message = {
    error: false
  }

  ngOnInit(): void {
    this.agentTypeService.getAgentSetupType()
      .subscribe((res: any) => {
        this.agentTypes = res
      })
  }

  fetchAgentTypes(action: string) {

    if (this.type.length > 0) {
      this.loading = true
      this.agentTypeService.getAgentSetupByType(this.type)
        .subscribe((data: any) => {
          this.loading = false
          localStorage.setItem(action + "AgentType", JSON.stringify(data))
          this.router.navigate(["../create-agent-type"],{relativeTo:this.route})
        }, (err: any) => {
          this.loading = false
          this.utility.notify("Internal server error.", 0, 5000)
        })
    }
    else this.utility.notify("Field cannot be blank.", 0, 5000)
  }

  clone() {
    this.fetchAgentTypes("clone")
  }

  show() {
    this.fetchAgentTypes("show")
  }

  onNext() {
    this.router.navigate (["../create-agent-type"],{relativeTo:this.route})
    console.log()
  }
}
