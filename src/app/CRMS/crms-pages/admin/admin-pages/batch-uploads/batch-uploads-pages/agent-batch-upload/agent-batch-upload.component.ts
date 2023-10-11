import { Component, OnInit } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { LocationService } from 'src/app/Services/location.service';
import { BatchUploadBaseComponent } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.component';

@Component({
  selector: 'app-agent-batch-upload',
  templateUrl: './agent-batch-upload.component.html',
  styleUrls: ['./agent-batch-upload.component.scss'],
})
export class AgentBatchUploadComponent
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
        { field: 'Client No', t: 'Client No', type: 'text' },
        { field: 'Agent Type', t: 'Agent Type', type: 'text' },
        { field: 'Company', t: 'Company', type: 'text' },
        { field: 'Branch', t: 'Branch', type: 'text' },
        {
          field: 'License Certificate No',
          t: 'License Certificate No',
          type: 'text',
        },
        { field: 'License Type', t: 'License Type', type: 'text' },
        { field: 'Licence Authority', t: 'Licence Authority', type: 'text' },
        { field: 'License Issue Date', t: 'License Issue Date', type: 'text' },
        { field: 'License Expiry Date', t: 'License Expiry Date', type: 'text' },
        { field: 'Hierachy Agent No', t: 'Hierachy Agent No', type: 'text' },
      ];
    });
  }
}
