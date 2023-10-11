import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class LifecycleShowComponent implements OnInit {
  clientLifeCycleForm: FormGroup;
  clientLifeCycle: any;
  constructor(public findClientsService : FindClientsService, public fb:FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientLifeCycle = JSON.parse(this.route.snapshot.queryParamMap.get("clientLifeCycle"));
    this.createLifeCycleForm()
    this.setLifeCycleForm()
  }

  createLifeCycleForm(){
    this.clientLifeCycleForm = new FormGroup({
      clientLifeCycle: new FormControl(null),
      description: new FormControl(null),
      clientDuration: new FormControl(null),
      maintainActivePolicy: new FormControl(null),
    })
  }

  setLifeCycleForm(){
    this.findClientsService.getClientLifeCycle(this.clientLifeCycle?.id)
      .subscribe(
        (res: any) => {
          this.clientLifeCycleForm.patchValue({
            clientLifeCycle: res?.clientLifeCycle,
            description: res?.description,
            clientDuration: res?.clientDuration,
            maintainActivePolicy: res?.maintainActivePolicy,
          })
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching clientLifeCycle", err)
        }
      )
  }
}
