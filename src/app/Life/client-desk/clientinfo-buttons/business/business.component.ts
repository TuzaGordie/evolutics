import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/Services/app.service';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class ClientBusinessComponent implements OnInit {
  businessList: any = [];

  constructor(public findClientService: FindClientService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    let id2 = this.route.snapshot.paramMap.get('id1');
    console.log('param id', id, id2);
    this.setPolicies(id);
  }
  setPolicies(id:any) {
    console.log('param id', id);
    this.findClientService.getBusinessApi(id)
    .subscribe((res) => {
      this.businessList = res;
      console.log('other business list Info', res);
    });
  }
}
