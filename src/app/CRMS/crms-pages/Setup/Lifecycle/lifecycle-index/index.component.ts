import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class LifecycleIndexComponent implements OnInit {
  lifecyclesList: any[] = [];
  loadingLifecycles = false;
  clientLifeCycle: any;

  constructor(public findClientsService: FindClientsService, private router: Router) { }

  ngOnInit(): void {
    this.setLifecyclesList()
  }

  setLifecyclesList(){
    this.loadingLifecycles = true
    this.findClientsService.getLifecyclesList()
      .subscribe(
        (res: any[]) => {
          this.lifecyclesList = res
          this.loadingLifecycles = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching lifecyles list")
          this.loadingLifecycles = false;
        }
      )
  }
  onSubmit(){

  }

  show(){
    if (!this.clientLifeCycle) return;
    const clientLifeCycle = JSON.stringify(this.clientLifeCycle)
    this.router.navigate(["crms/lifecycle/show"], {queryParams: {clientLifeCycle}})
  }
}
