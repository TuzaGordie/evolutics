import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-overview-index',
  templateUrl: './overview-index.component.html',
  styleUrls: ['./overview-index.component.scss']
})
export class OverviewIndexComponent implements OnInit {
  segmentsList:any = [];
  selectedSegment: number;
  constructor(public findClientsService: FindClientsService, private router: Router) { }

  ngOnInit(): void {
    this.setSegmentsList()
  }

  setSegmentsList(){
    this.findClientsService.getSegmentsList().subscribe((res: any[]) => {
      this.segmentsList = res;
      console.log("REUTRNED LIST ITEM"+JSON.stringify(this.segmentsList));
    },(err: HttpErrorResponse) => console.log("Error fetching segments list", err)
      )
  }

  show(){
    console.log("show page"+this.selectedSegment);
    if (!this.selectedSegment) return;
    this.router.navigate(["crms/overview/show"], {queryParams: {segment: this.selectedSegment}})
  }
}
