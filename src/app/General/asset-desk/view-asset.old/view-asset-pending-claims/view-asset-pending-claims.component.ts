import {Component, OnInit} from '@angular/core';
import {
  ClientRegisterNewClaimComponent
} from "../../../../Life/client-desk/register-new-claim/register-new-claim.component";
import {AdjustClaimComponent} from "../../../../Life/client-desk/adjust-claim/adjust-claim.component";
import {ChangeStatusComponent} from "../../../../Life/client-desk/change-status/change-status.component";
import {FormControl, FormGroup} from "@angular/forms";
import {configForms} from "../../../../Shared/models/form.class";
import {FindClientService} from "../../../../Life/client-desk/service/find-client.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilityService} from "../../../../Services/utility.service";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ChangeStatusModalComponent
} from "../../../../Shared/components/change-status-modal/change-status-modal.component";

@Component({
  selector: 'app-view-asset-pending-claims',
  templateUrl: './view-asset-pending-claims.component.html',
  styleUrls: ['./view-asset-pending-claims.component.scss']
})
export class ViewAssetPendingClaimsComponent implements OnInit {
  parentModals = [];
  paymentList: any = [];
  pendingClaims: any[] = [];
  modals = {
    registerNewClaim: ClientRegisterNewClaimComponent,
    adjustClaim: AdjustClaimComponent,
    changeStatus: ChangeStatusComponent,
  };

  clientNo: string;
  // register claim modal data
  newClaimForm: FormGroup;
  policiesList = [];
  policyCoversList = [];
  claimTypesList = [];
  perilsList = [];
  countriesList = [];
  regionsList = [];
  statesList = [];
  proximateCausesAllowedList = [];

  loadingPolicyNos = false;
  loadingCovers = false;
  loadingCountries = false;
  loadingRegions = false;
  loadingStates = false;
  loadingClaimTypes = false;
  loadingPerils = false;
  loadingProximateCauses = false;
  claimNo: any;
  claimDocsCount = 0;
  form = new FormGroup({
    test: configForms.default(),
  });

  constructor(public findClientService: FindClientService, private matDialog: MatDialog, public route: ActivatedRoute, public uS: UtilityService, private router: Router) {
  }

  ngOnInit(): void {
    this.claimNo = this.route.snapshot.queryParams.claimNo;
    let id = this.route.snapshot.paramMap.get('id');
    let id2 = this.route.snapshot.paramMap.get('id1');
    this.clientNo = id;

    this.createNewClaimForm();
    this.setPendingPayments(id, id2);
    this.setPolicies();
    this.setCountriesList();
    this.setPendingClaims(this.clientNo);
  }

  setPendingPayments(id1, id2) {
    this.findClientService.getPendingPaymentsApi(id1, id2).subscribe((res) => {
      this.paymentList = res;
      console.log('payment Info', res);
    });
  }

  openModal(modal) {
    this.matDialog
      .open(this.modals[modal])
      .afterClosed()
      .subscribe((res) => {
        console.log(`response from ${this.modals[modal]}:`, res);
      });
  }

  createNewClaimForm() {
    this.newClaimForm = new FormGroup({
      policyNo: new FormControl(null),
      policyCode: new FormControl(null),
      policyNoSuffix: new FormControl(null),
      currency: new FormControl(null),
      coverCode: new FormControl(null),
      claimType: new FormControl(null),
      perilCat: new FormControl(null),
      severityLevel: new FormControl(null),
      reportOn: new FormControl(null),
      eventOn: new FormControl(null),
      locationCountry: new FormControl(null),
      locationRegion: new FormControl(null),
      locationState: new FormControl(null),
      locationAddress: new FormControl(null),
      locationTown: new FormControl(null),
      geolocation: new FormControl(null),
      initialEstimate: new FormControl(null),
      proxCause: new FormControl(null),
      narration: new FormControl(null),
    });
  }

  setPolicies() {
    console.log('setPolicies is called')
    this.loadingPolicyNos = true;
    this.findClientService.getClientPolicies(this.clientNo).subscribe(
      (res) => {
        this.policiesList = res
        this.loadingPolicyNos = false;
      },
      (err: HttpErrorResponse) => {
        console.log(
          'Error fetching policies for Client Number: ',
          +this.clientNo,
          err
        )
        this.loadingPolicyNos = false;
      }
    );
  }

  setPolicyCoversList(policyNo: string) {
    this.loadingCovers = true;
    this.findClientService.getPolicyCovers(policyNo).subscribe(
      (res: any[]) => {
        this.policyCoversList = res
        this.loadingCovers = false;
      },
      (err: HttpErrorResponse) => {
        console.log('Error fetching covers for policy number: ' + policyNo, err)
        this.loadingCovers = false;
      }
    );
  }

  setPolicyCode(policyNo: string) {
    this.findClientService.getPolicyCodeByPolicyNo(policyNo).subscribe(
      (res: any[]) => {
        const value = Array.isArray(res) ? res[0]?.policyCode : null;
        this.newClaimForm.patchValue({policyCode: value});
        this.onPolicyCodeChange();
      },
      (err: HttpErrorResponse) =>
        console.log('Error fetching policyCode for policyNo: ' + policyNo, err)
    );
  }

  setPolicySuffix(policyNo: string, policyCode: string) {
    this.findClientService.getPolicyNoSuffix(policyNo, policyCode).subscribe(
      (res: any[]) => {
        const value = Array.isArray(res) ? res[0]?.policyNoSuffix : null;
        this.newClaimForm.patchValue({policyNoSuffix: value});
      },
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching policy no suffix for policyNo: ' + policyNo,
          err
        )
    );
  }

  setPolicyCurrency(policyNo: string, policyCode: string) {
    this.findClientService.getPolicyCurrency(policyNo, policyCode).subscribe(
      (res: any) => this.newClaimForm.patchValue({currency: res?.currency}),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching currency for policyNo: ' +
          policyNo +
          'and policyCode: ' +
          policyCode,
          err
        )
    );
  }

  setCountriesList() {
    this.loadingCountries = true;
    this.findClientService.getCountriesList().subscribe(
      (res: any[]) => {
        this.countriesList = res
        this.loadingCountries = false;
      },
      (err: HttpErrorResponse) => {
        console.log('Error fetching list of countries', err)
        this.loadingCountries = false;
      }
    );
  }

  setRegionsList() {
    this.loadingRegions = true;
    const countryCode = this.newClaimForm.value.locationCountry;
    this.findClientService.getRegionsList(countryCode).subscribe(
      (res: any[]) => {
        this.regionsList = res
        this.loadingRegions = false;
      },
      (err: HttpErrorResponse) => {
        console.log(
          'Error fetching list of regions for countryCode: ' + countryCode,
          err
        )
        this.loadingRegions = false;
      }
    );
  }

  setStatesList() {
    this.loadingStates = true;
    const regionCode = this.newClaimForm.value.locationRegion;
    this.findClientService.getStatesList(regionCode)
      .subscribe(
        (res: any[]) => {
          this.statesList = res
          this.loadingStates = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching list of states for regionCode: " + regionCode, err)
          this.loadingStates = false;
        }
      )
  }

  setClaimTypes(coverCode: string) {
    this.loadingClaimTypes = true;
    this.findClientService.getClaimTypes(coverCode)
      .subscribe(
        (res: any[]) => {
          this.claimTypesList = res;
          this.loadingClaimTypes = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching claimTypes List for coverCode: " + coverCode, err)
          this.loadingClaimTypes = false;
        }
      )
  }

  setPerilsList(coverCode: string, claimType: string) {
    this.loadingPerils = true;
    this.findClientService.getPerils(coverCode, claimType)
      .subscribe(
        (res: any[]) => {
          this.perilsList = res;
          this.loadingPerils = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching perils list for coverCode " + coverCode + "and claimType " + claimType, err)
          this.loadingPerils = false;
        }
      )
  }

  setProximateCausesList(coverCode: string, claimType: string, perilCode: string) {
    this.loadingProximateCauses = true;
    this.findClientService.getProximateCause(coverCode, claimType, perilCode)
      .subscribe(
        (res: any[]) => {
          this.proximateCausesAllowedList = res
          this.loadingProximateCauses = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching proximate causes allowed list. Using coverCode" + coverCode + "and claimType: " + claimType + "perilCode" + perilCode, err)
          this.loadingProximateCauses = false;
        }
      )
  }

  setPendingClaims(clientNo) {
    this.findClientService.getPendingClaims(clientNo).subscribe(res => {
      this.pendingClaims = res
    })
  }

  onPolicyNoChange() {
    const {policyNo} = this.newClaimForm.value;
    this.setPolicyCode(policyNo)
    this.setPolicyCoversList(policyNo)
  }

  onPolicyCodeChange() {
    const {policyNo, policyCode} = this.newClaimForm.value;
    this.setPolicySuffix(policyNo, policyCode)
    this.setPolicyCurrency(policyNo, policyCode);
  }

  onCoverChange() {
    this.setClaimTypes(this.newClaimForm.value.coverCode)
  }

  onClaimTypeChange() {
    const {coverCode, claimType} = this.newClaimForm.value;
    this.setPerilsList(coverCode, claimType)
  }

  onPerilChange() {
    const {coverCode, claimType, perilCode} = this.newClaimForm.value;
    this.setProximateCausesList(coverCode, claimType, perilCode)
  }

  onSaveNewClaim() {
    console.log("About to save new claim:", JSON.stringify(this.newClaimForm.value))
    this.findClientService.postNewClaim(this.newClaimForm.value).subscribe(
      (res: any) => console.log('saved new claim', res),
      (err: HttpErrorResponse) => {
        console.log('Error saving new claim', err);
        // this.utilityService.notify('Error saving new claim.' + err.message, 0);
      }
    );
  }

  claimDocsArray() {
    return new Array(this.claimDocsCount)
  }

  incClaimDocsCount() {
    this.claimDocsCount++
  }


  openStatusDialog = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: {options: []},
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
      }
    );
  };

  client_view() {
    return;
    this.router.navigate(['../view-client'], {relativeTo: this.route});
  }

  openAdjust() {
  }

  openHistory() {
  }
}
