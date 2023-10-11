import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { LocationService } from 'src/app/Services/location.service';
import { BatchUploadBaseComponent } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.component';

@Component({
  selector: 'app-corporate-client-batch-upload',
  templateUrl: './corporate-client-batch-upload.component.html',
  styleUrls: ['./corporate-client-batch-upload.component.scss'],
})
export class CorporateClientBatchUploadComponent
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
        { field: 'Company Name', t: 'Company Name', type: 'text' },
        { field: 'ExternalRef', t: 'ExternalRef', type: 'text' },
        { field: 'Main Email', t: 'Main Email', type: 'text' },
        { field: 'Alternate Email', t: 'Alternate Email', type: 'text' },
        { field: 'Website', t: 'Website', type: 'text' },
        { field: 'Coy Redg No', t: 'Coy Redg No', type: 'text' },
        { field: 'Address', t: 'Address', type: 'text' },
        { field: 'Address Country ', t: 'Address Country ', type: 'text' },
        { field: 'Address Region', t: 'Address Region', type: 'text' },
        { field: 'Address State', t: 'Address State', type: 'text' },
        { field: 'Address town', t: 'Address town', type: 'text' },
        { field: 'Address Geolocation ', t: 'Address Geolocation ', type: 'text' },
        { field: 'Main Phone No', t: 'Main Phone No', type: 'text' },
        {
          field: 'Alternate Phone Number',
          t: 'Alternate Phone Number',
          type: 'text',
        },
        { field: 'Sector', t: 'Sector', type: 'text' },
        { field: 'Income band', t: 'Income band', type: 'text' },
        { field: 'Segment', t: 'Segment', type: 'text' },
      ];
    });
  }
}
