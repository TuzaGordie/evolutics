import { Component, OnInit } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { LocationService } from 'src/app/Services/location.service';
import { BatchUploadBaseComponent } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.component';

@Component({
  selector: 'app-client-bank-batch-upload',
  templateUrl: './client-bank-batch-upload.component.html',
  styleUrls: ['./client-bank-batch-upload.component.scss'],
})
export class ClientBankBatchUploadComponent
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
        { field: 'Account Type', t: 'Account Type', type: 'text' },
        { field: 'Account Name', t: 'Account Name', type: 'text' },
        { field: 'Account No', t: 'Account No', type: 'text' },
        { field: 'Bank Code', t: 'Bank Code', type: 'text' },
        { field: 'Sort Code', t: 'Sort Code', type: 'text' },
      ];
    });
  }
}
