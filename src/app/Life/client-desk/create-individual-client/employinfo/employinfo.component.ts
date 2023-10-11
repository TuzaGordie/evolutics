import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { CreateCorporateClientComponent } from '../../create-corporate-client/common/common.component';
import { ICorporateClient } from '../../create-corporate-client/corporate-client-extras/corporate-client.interface';
import { CreateIndividualClientService } from '../create-individual-client.service';

@Component({
  selector: 'app-employinfo',
  templateUrl: './employinfo.component.html',
  styleUrls: ['./employinfo.component.scss'],
})
export class EmployinfoComponent implements OnInit {
  @Input() fc: FormGroup;
  @Output() createCorporateClient = new EventEmitter();
  employmentForm: FormGroup = new FormGroup({});
  sectorList: any[] = [];
  incomeBands: any[] = [];
  employmentStatusList: any[] = [];
  occupationList: any[] = [];
  occupationGroupList: any[] = [];
  constructor(
    public createIndividualClient: CreateIndividualClientService,
    public clientS: ClientService,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.setSectorList();
    this.setEmploymentStatusList();
    this.setOccupationList();
    this.setIncomeBands();
    this.setOccupationGroupList();
    this.fc?.controls.employerClientNo.valueChanges
      .pipe(delay(1000))
      .subscribe((r) => {
        this.clientS
          .getClientViewData(r)
          .toPromise()
          .then((res) => {
            this.fc.patchValue({
              companyName: res.type == 'C' ? res?.fullName : null,
            });
          });
      });
  }
  get validation() {
    return this.fc?.controls;
  }
  get companyName() {
    return this.fc?.get('companyName')?.value;
  }
  onSubmit() {
    console.log(this.employmentForm);
    this.createIndividualClient.employmentInfo(this.employmentForm.value);
  }
  changeTab(tab: any) {
    console.log('tab');
    this.createIndividualClient.tabChange(tab);
  }

  setSectorList() {
    this.createIndividualClient.getSectorList().subscribe((res) => {
      this.sectorList = res;
      console.log('sectorList', res);
    });
  }
  setEmploymentStatusList() {
    this.createIndividualClient.getEmploymentStatusList().subscribe((res) => {
      this.employmentStatusList = res;
      console.log('employmentStatusList', res);
    });
  }
  setOccupationList() {
    let selectedOccupation = this.fc.get('occupationGroup')?.value;
    console.log('selected country', selectedOccupation);
    this.createIndividualClient
      .getOccupationList(selectedOccupation)
      .subscribe((res) => {
        this.occupationList = res;
        console.log('setOccupationList', res);
      });
  }
  setIncomeBands() {
    this.createIndividualClient.getIncomeBands().subscribe((res) => {
      this.incomeBands = res;
    });
  }
  setOccupationGroupList() {
    this.createIndividualClient.getOccupationGroupList().subscribe((res) => {
      this.occupationGroupList = res;
      console.log('setOccupationGroupList', res);
    });
  }
}
