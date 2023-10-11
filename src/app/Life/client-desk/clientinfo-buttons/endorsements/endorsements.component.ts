import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-endorsements',
  templateUrl: './endorsements.component.html',
  styleUrls: ['./endorsements.component.scss'],
})
export class ClientEndorsementsComponent implements OnInit {
  endorseList: any = [];

  constructor(public findClientService: FindClientService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log('param id', id);
    this.setEndorsements(id);
  }
  setEndorsements(id: any) {
    console.log(id);
    this.findClientService.getEndorsements(id).subscribe((res) => {
      this.endorseList = res;
      console.log('endorse Info', res);
    });
  }
}
