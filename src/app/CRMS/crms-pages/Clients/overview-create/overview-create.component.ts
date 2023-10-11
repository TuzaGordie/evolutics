import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { configForms } from './../../../../Shared/models/form.class';
import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-overview-create',
  templateUrl: './overview-create.component.html',
  styleUrls: ['./overview-create.component.scss'],
})
export class OverviewCreateComponent implements OnInit {
  segmentId: string;
  clientSegmentForm: FormGroup;
  clientSegmentAttributeForm: FormArray = new FormArray([]);
  conditionsList: any[];
  customerAttributesList: any[];
  segmentCode;
  string;

  constructor(
    private findClientsService: FindClientsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      this.segmentCode = queryMap.get('segment');
      console.log('SEGEMTN CODE' + this.segmentCode);
    });
    this.createClientSegmentForm();
    this.add(0);

    this.setConditionsList();
    this.setCustomerAttributesList();
  }

  createClientSegmentForm() {
    this.clientSegmentForm = this.fb.group({
      id: this.fb.control(""),
      clientSegment: this.fb.control(""),
      description: this.fb.control(""),
    });

    this.clientSegmentForm.controls['clientSegment'].disable();
  }

  add(i: number) {
    this.clientSegmentAttributeForm.insert(
      i,
      this.fb.group({
        id: this.fb.control(0),
        attribute: this.fb.control(""),
        condition1: this.fb.control(""),
        setupClientSegmentId: this.fb.control(""),
        condition2: this.fb.control(""),
        value1: this.fb.control(""),
        value2: this.fb.control(""),
        segmentCode: this.fb.control(""),
        customerAttribute: this.fb.control(""),
      })
    );
  }
  delete(i: number) {
    this.clientSegmentAttributeForm.removeAt(i);
  }

  setConditionsList() {
    this.findClientsService.getConditionsList().subscribe(
      (res: any[]) => (this.conditionsList = res),
      (err: HttpErrorResponse) =>
        console.log('Error fetching conditions list', err)
    );
  }

  setCustomerAttributesList() {
    this.findClientsService.getCustomerAttributesList().subscribe(
      (res: any[]) => (this.customerAttributesList = res),
      (err: HttpErrorResponse) =>
        console.log('Error fetching customer attributes list', err)
    );
  }

  async submitClient() {
    let data = {
      clientSegment: {
        clientSegment: this.clientSegmentForm.controls['clientSegment'].value,
        description: this.clientSegmentForm.controls['description'].value,
      },
      clientSegmentAttribute: this.clientSegmentAttributeForm.value
    };

    this.findClientsService.submitClientSegment(data).then((res) => {
        console.log("RESPONSE BODY FOR SEGMENT"+ JSON.stringify(res));
        if (res.status === 200) {
          this.uS.info(res.status, 1);
        } else {
          this.uS.info(res.status, 0);
        }
      },
      (err) => {
        this.uS.info('An Error Occured'+ JSON.stringify(err), 0);
      }
    );
  }
}
