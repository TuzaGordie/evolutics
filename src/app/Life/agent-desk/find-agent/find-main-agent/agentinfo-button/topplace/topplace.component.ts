import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topplace',
  templateUrl: './topplace.component.html',
  styleUrls: ['./topplace.component.scss']
})
export class TopplaceComponent implements OnInit {
  agentNo: string;
  agentName: string;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParamMap.get("agentNo")
    this.agentName = this.route.snapshot.queryParamMap.get("agentName")
  }

}
