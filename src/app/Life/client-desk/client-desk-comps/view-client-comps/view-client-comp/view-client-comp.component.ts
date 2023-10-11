import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { FindClientService } from '../../../service/find-client.service';

@Component({
  selector: 'app-view-client-comp',
  templateUrl: './view-client-comp.component.html',
  styleUrls: ['./view-client-comp.component.scss'],

})
export class ViewClientCompComponent implements OnInit {
  loading: boolean;
  client: IClientViewData;
  @Input('clientNo') set _clientNo(v: string) {
    this.loading = true;
    this.clientS.getClientViewData(v).subscribe(
      (res) => {
        this.loading = false;
        this.client = res;
        this.fetchedClient.emit(res)
      },
      async (err) => {
        // debugger
        console.log(err);
        await this.uS.info(err, 0);
        this.uS.back();
      }
    );
  }
  @Output() fetchedClient=new EventEmitter<IClientViewData>();
  constructor(public clientS: FindClientService, public uS: UtilityService) {}

  ngOnInit(): void {}
  get clientType(){
    return this.client?.type  
  }
}
