import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FindClientService} from "../../../../client-desk/service/find-client.service";
import { FindMainAgentService } from '../service/find-main-agent.service';

@Component({
  selector: 'app-view-agent-workflows',
  templateUrl: './view-agent-workflows.component.html',
  styleUrls: ['./view-agent-workflows.component.scss']
})
export class ViewAgentWorkflowsComponent implements OnInit {
  agentNo: string;
  agentName: string;
  webflowsList: any = []

  constructor(
    public findAgentService: FindMainAgentService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParamMap.get('agentNo')
    this.setWebflows()
  }

  setWebflows() {
    this.findAgentService.getAgentWorkflows(this.agentNo).subscribe(res => {
      this.webflowsList = res;
      console.log("webflows Info", res)
    })
  }

}
