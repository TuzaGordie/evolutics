import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindRatesService } from '../../service/find-rates.service';

@Component({
  selector: 'app-create-short-term-rates',
  templateUrl: './create-short-term-rates.component.html',
  styleUrls: ['./create-short-term-rates.component.scss'],
})
export class CreateShortTermRateComponent implements OnInit {
  CreateSTRateForm: any = new FormGroup({});

  postSTRate: any;

  constructor(public findRatesService: FindRatesService) {}

  ngOnInit(): void {
    this.CreateSTRateForm = new FormGroup({
      code: new FormControl(null),
      days: new FormControl(null),
      description: new FormControl(null),
      id: new FormControl(0),
      factor: new FormControl(null),
    });
  }

  onKey(event: any) {
    const inputValue = event.target.value;
  }

  onSubmit() {
    this.findRatesService
      .submitSTRate(this.CreateSTRateForm.value)
      .subscribe((res) => {
        this.postSTRate = res;
        console.log('post', res);
      });
  }
}
