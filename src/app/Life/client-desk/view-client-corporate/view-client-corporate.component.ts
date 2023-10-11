import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { FindClientService } from '../service/find-client.service';
import { HelpersService } from '../service/helpers.service';
@Component({
  selector: 'app-view-client-corporate',
  templateUrl: './view-client-corporate.component.html',
  styleUrls: ['./view-client-corporate.component.scss']
})
export class ViewClientCorporateComponent implements OnInit {
   
  clientNo: string; 
  
  constructor( 
    public route: ActivatedRoute, 
  ) { 
  }

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.queryParamMap.get('clientNo'); 
  }
}
