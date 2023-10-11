import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { AgentService } from 'src/app/Services/agent.service';

@Component({
  selector: 'app-agent-finder',
  templateUrl: './agent-finder.component.html',
  styleUrls: ['./agent-finder.component.scss']
})
export class AgentFinderComponent implements OnInit {
  agentName;
  agents: any[] = []
  loading: boolean = false;

  constructor(private quotationService: QuotationService, private dialogRef: MatDialogRef<AgentFinderComponent> ) { }

  ngOnInit(): void {
  }

  findAgent(){
    if (!this.agentName) return

    this.loading = true
    this.quotationService.findAgentByName(this.agentName).subscribe(
      res => this.agents = res
    ).add(() => this.loading = false)
  }

  onSelectAgent(agent){
    this.dialogRef.close({
      agentNo: agent.no,
      agentName: agent.name
    })
  }

}
