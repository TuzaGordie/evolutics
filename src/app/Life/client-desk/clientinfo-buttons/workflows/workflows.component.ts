import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindClientService } from '../../service/find-client.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class ClientWorkflowsComponent implements OnInit {
  webflowsList: any = [];
  workflowStatusList: any[] = [];
  slaLevelsList: any[] = [];
  clientName: string;

  // filter fields
  startFrom: string;
  startTo: string;
  slaLevel: string;
  status: string;

  constructor(
    public findClientService: FindClientService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log('param id', id);
    this.setWebflows(id);
    this.setWorkflowStatusList();
    this.setSlaLevelsList();
    this.setClientName(id);
  }
  setWebflows(id: any) {
    this.findClientService.getWebflows(id).subscribe((res) => {
      this.webflowsList = res;
      console.log('webflows Info', res);
    });
  }
  setWorkflowStatusList(){
    this.findClientService.getWorkflowStatusList().subscribe((res) => {
      this.workflowStatusList = res;
    })
  }
  setSlaLevelsList(){
    this.findClientService.getSlaLevelsList().subscribe(res => {
      this.slaLevelsList = res;
    })
  }
  setClientName(clientNo){
    this.findClientService.getClientViewData(clientNo)
      .pipe(map(res => res?.fullName))
      .subscribe((res: string) => this.clientName = res)
  }
  clearFilters(){
    this.startFrom = this.startTo = this.slaLevel = this.status = undefined;
  }
}
