import { Component, OnInit } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { LocationService } from 'src/app/Services/location.service';
import { BatchUploadBaseComponent } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.component';

@Component({
  selector: 'app-client-relationships-batch-upload',
  templateUrl: './client-relationships-batch-upload.component.html',
  styleUrls: ['./client-relationships-batch-upload.component.scss'],
})
export class ClientRelationshipsBatchUploadComponent
  extends BatchUploadBaseComponent
  implements OnInit
{
  countries: any[];
  constructor(public codeS: CodeService, public locS: LocationService) {
    super();
  }

  ngOnInit(): void {
    this.init(Promise.all([])).then((rs) => {
      this.schemas = [
        { field: 'ClientNo', t: 'ClientNo', type: 'text' },
        { field: 'Related Client No', t: 'Related Client No', type: 'text' },
        { field: 'Rel Type', t: 'Rel Type', type: 'text' },
        { field: 'Rel Date', t: 'Rel Date', type: 'text' },
      ];
    });
  }
}
