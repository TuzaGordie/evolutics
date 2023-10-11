import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindMainAgentService } from '../service/find-main-agent.service';

@Component({
  selector: 'app-agent-search',
  templateUrl: './agent-search.component.html',
  styleUrls: ['./agent-search.component.scss'],
})
export class AgentSearchComponent implements OnInit {
  agentsList: any = [];
  agentNo;
  searchParams: any;

  constructor(
    public findAgentService: FindMainAgentService,
    public router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    console.log('agent search', this.findAgentService.searchedData);
    this.search(this.route.snapshot.queryParams);
  }

  viewInfo(agentNo: string) {
    this.findAgentService.getAgentList2(agentNo).subscribe(
      (res) => {
      this.findAgentService.agentInfo = res
      console.log('agent search data', this.findAgentService.agentInfo);
      this.router.navigate(['../view-agent'], {relativeTo: this.route, queryParams: {   agentNo }});
      },
      (err) => {
        this.utilityService.notify("Error navigating to view agent page: " + err, 0)
      }
    );
  }

  navigateback() {
    // this.router.navigateByUrl("life/agent-desk/view-agent");
  }

  search(data){
    if (data) {
      this.findAgentService
        .getsearch(data)
        .subscribe((res) => {
          this.agentsList = res;
        });
    }
  }
}
