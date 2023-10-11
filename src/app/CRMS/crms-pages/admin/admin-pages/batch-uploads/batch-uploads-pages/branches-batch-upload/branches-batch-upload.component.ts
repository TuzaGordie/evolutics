import { Component, OnInit } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { LocationService } from 'src/app/Services/location.service';
import { BatchUploadBaseComponent } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.component';

@Component({
  selector: 'app-branches-batch-upload',
  templateUrl: './branches-batch-upload.component.html',
  styleUrls: ['./branches-batch-upload.component.scss'],
})
export class BranchesBatchUploadComponent
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
        { field: 'Branch Code', t: 'Branch Code', type: 'text' },
        { field: 'Description', t: 'Description', type: 'text' },
        { field: 'Company Code', t: 'Company Code', type: 'text' },
        { field: 'Branch Address', t: 'Branch Address', type: 'text' },
        { field: 'Branch Phone', t: 'Branch Phone', type: 'text' },
        { field: 'Spool Folder Path', t: 'Spool Folder Path', type: 'text' },
        { field: 'Country', t: 'Country', type: 'text' },
        { field: 'Region', t: 'Region', type: 'text' },
        { field: 'City', t: 'City', type: 'text' },
        { field: 'Town', t: 'Town', type: 'text' },
      ];
    });
  }
}
