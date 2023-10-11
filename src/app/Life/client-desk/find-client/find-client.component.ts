import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from 'src/app/Services/client.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../service/find-client.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ClientSearchComponent } from '../client-search/client-search.component';
import { clone } from 'lodash-es';
import { ISearchFormSchema } from 'src/app/Reusables/reusable-comps/find-item/find-item.model';
import { TableCol } from 'src/app/Shared/models/index.model';
import { PageModal } from 'src/app/Shared/components/page-to-component/page-to-component.component';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { EClientType } from '../client-extras/client.interface';

@Component({
  selector: 'app-find-client',
  templateUrl: './find-client.component.html',
  styleUrls: ['./find-client.component.scss'],
})
export class FindClientComponent
  extends PageModal<IClientViewData>
  implements OnInit
{
  displayedColumns: TableCol[];
  loading: boolean;
  usersList: any[];
  schema: ISearchFormSchema[];
  constructor(
    public findClientService: FindClientService,
    public clientService: ClientService,
    public router: Router,
    public userS: UserService,
    public route: ActivatedRoute,
    public uS: UtilityService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    // debugger
    this.loading = true;
    this.displayedColumns = [
      {
        f: 'clientNo',
        t: 'Client Number',
        routeFormatter: this.isModal
          ? null
          : (client) => {
              return '../view-client?clientNo=' + client.clientNo;
            },
        action: this.isModal ? this.modalOnComplete : null,
      },
      { f: 'fullName', t: 'Name' },
      {
        f: 'type',
        t: 'Type',
        formatter: (val) => {
          if (val == EClientType.individual) return 'Individual';
          else if (val == EClientType.corporate) return 'Corporate';
          else return val;
        },
      },
      { f: 'createdOn', t: 'Created On', formatter: this.uS.fullDateTime },
    ];

    await this.setUsersList();
    this.schema = [
      {
        field: 'clientNo',
        label: 'Client Number',
        type: 'text',
        standalone: true,
        validators: [Validators.required],
        asyncValidators: [this.clientService.validateClientNo],
        action: (form, cell) => {
          this.isModal ? this.modalOnComplete(form) : this.openClient(cell);
        },
      },
      {
        field: 'enrolee',
        label: 'Enrolee',
        type: 'text',
        standalone: true,
        validators: [Validators.required],
      },
      {
        field: 'providerNo',
        label: 'Provider Number',
        type: 'text',
        standalone: true,
        validators: [Validators.required],
        asyncValidators: [this.validateProvider],
        action: (form, cellField) => {
          this.openProvider(form[cellField]);
        },
      },
      { field: 'name', label: 'Name', type: 'text' },
      { field: 'phoneNo', label: 'Phone Number', type: 'text' },
      { field: 'email', label: 'Email', type: 'text' },
      { field: 'externalRef', label: 'External Ref.', type: 'text' },
      {
        field: 'createdBy',
        label: 'Created By',
        type: 'select',
        options: this.usersList,
        labelType: 'uf',
        valueField: 'userName',
      },
      { field: 'createdDateFrom', label: 'Created Date From', type: 'date' },
      { field: 'createdDateTo', label: 'Created Date To', type: 'date' },
    ];
    this.loading = false;
  }
  search = (query) => this.findClientService.search(query);

  openClient(clientNo: string) {
    this.router.navigate(['../view-client/'], {
      relativeTo: this.route,
      queryParams: { clientNo },
    });
  }

  openProvider(providerNo?: string) {
    this.router.navigate(['../view-provider/'], {
      relativeTo: this.route,
      queryParams: { providerNo },
    });
  }

  setEnroleeList() {
    // console.log(this.findClientForm.value.enrolee);
    // if (!this.findClientForm.value.enrolee) {
    //   this.validResult2 = '';
    //   console.log('run');
    // } else {
    //   this.findClientService
    //     .getEnroleeList(this.findClientForm.value.enrolee)
    //     .subscribe(
    //       (res) => {
    //         this.clientList = res;
    //         if (this.clientList && this.clientList?.clientNo != null) {
    //           this.findClientService.clientInfo = this.clientList[0];
    //           this.validResult2 = 'true';
    //           console.log('provider list', this.validResult2, this.clientList);
    //         } else {
    //           this.validResult2 = 'false';
    //           console.log('provider list', this.validResult2, this.clientList);
    //         }
    //       },
    //       (err) => {
    //         console.log('HTTP Error', err);
    //         this.validResult2 = 'false';
    //       }
    //     );
    // }
  }

  validateProvider = (control: FormControl) => {
    const providerNo = control?.value;
    if (!providerNo) {
      return of({ notFound: true });
    }
    return this.findClientService.getClientNoByProviderNo(providerNo).pipe(
      map((clientNo) =>
        !clientNo ? throwError('No clientNo for providerNo') : clientNo
      ), // a clientNo is returned or not
      mergeMap((clientNo) => this.findClientService.getClientList(clientNo)),
      map((client) => (!client ? throwError('No client found') : client)), // the clientNo returns a client object or not
      tap((client: string) => {
        this.findClientService.clientInfo = client;
      }),
      map(() => null), // return null to validate the input
      catchError((err) => {
        console.log('Error validating provider no: ' + providerNo, err);
        return of({ notFound: true }); // return error object to invalidate the input
      })
    );
  };

  setUsersList() {
    return this.userS
      .getAllUserCodeAndFullName()
      .toPromise()
      .then(
        (res) => (this.usersList = res),
        (err) =>
          console.log('error fetching users list for created by endpoint', err)
      );
  }
}
