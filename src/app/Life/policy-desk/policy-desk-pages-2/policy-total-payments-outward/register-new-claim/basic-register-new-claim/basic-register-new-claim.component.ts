import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FCInput } from 'src/app/Shared/models/index.model'; 
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/Services/utility.service';
import { AppService } from 'src/app/Services/app.service';
import { environment } from 'src/environments/environment';
import { PolicyService } from 'src/app/Services/cash/policy.service';
import { StripTimePipe } from 'src/app/Life/client-desk/pipes/strip-time.pipe';

@Component({
  selector: 'basic-register-new-claim',
  templateUrl: './basic-register-new-claim.component.html',
  styleUrls: ['./basic-register-new-claim.component.scss'],
})
export class BasicRegisterNewClaimComponent implements OnInit {
  @Input() clientNo: string;
  @Input() policyNo: string;
  @Output() claimNo = new EventEmitter<string>();
  @Output() basicInfo = new EventEmitter<any>();
  newClaimForm: FormGroup;
  policiesList = [];
  policyCodesList = [];
  policyCoversList = [];
  claimTypesList = [];
  perilsList = [];
  countriesList = [];
  regionsList = [];
  statesList = [];
  townsList = [];
  proximateCausesAllowedList = [];
  policyNoSuffixesList = [];
  claimStatus = [];
  // claimRequirements = [];
  providerActions = [];
  paymentList = [];
  // pendingClaims = [];
  
  // for picking out titles of claimType codes for display
  claimTypeCodesAndTitles: any[] = [];
  perilCodesAndTitles: any[] = [];
  proximateCauseCodesAndTitles: any[] = [];

  loadingPolicyNos = false;
  loadingPolicyCodes = false;
  loadingCovers = false;
  loadingCountries = false;
  loadingRegions = false;
  loadingStates = false;
  loadingTowns = false;
  loadingClaimTypes = false;
  loadingPerils = false;
  loadingProximateCauses = false;
  loadingPolicyCurrency = false;
  loadingPolicyNoSuffixes = false;
  loadingPolicyCoverPeriod = false;
  isCreatingClaim: boolean = false;
  user: string = environment.user?.userDetails.username;

  constructor(
    public findClientService: FindClientService,
    public route: ActivatedRoute,
    private utilityService: UtilityService,
    private appService: AppService,
    private policyService: PolicyService,
    private stripTimePipe: StripTimePipe
  ) {}

  ngOnInit(): void {
    const busLine = this.appService.getCurrentSystemMetadata.busline;

    this.createNewClaimForm();
    this.setPolicies();
    this.setCountriesList();
    this.setRegionsList();
    this.setStatesList();
    this.setTownsList();
    this.createNewClaimForm();
    this.setPendingPayments(this.clientNo, busLine);
    this.setCountriesList();
    this.getProviderActions();
    // this.setPendingClaims(this.clientNo);
    // this.getClaimStatus();
    // this.getClaimRequirements();
    this.setClaimTypeCodesAndTitlesList();
    this.setPerilCodesAndTitlesList();
    this.setProximateCauseCodesAndTitlesList();

    // if this component was opened with a pre-determined, fixed policyNo, fetch the dependent lists immediately
    if (this.policyNo){
      this.onPolicyNoChange()
    }
  }

  createNewClaimForm() {
    console.log("this.policyNo passed into basic-register-claim tab: ", this.policyNo)
    this.newClaimForm = new FormGroup({
      policyNo: new FormControl(this.policyNo, Validators.required), // initialize to @Inputted policyNo if available
      policyCode: new FormControl(null, Validators.required),
      policyNoSuffix: new FormControl({value: null, disabled: !this.policyNoSuffixesList.length}),
      currency: new FormControl(null),
      coverCode: new FormControl(null, Validators.required),
      claimType: new FormControl(null, Validators.required),
      perilCat: new FormControl(null),
      severityLevel: new FormControl(null),
      reportOn: new FormControl(null, Validators.required),
      eventOn: new FormControl(null),
      locationCountry: new FormControl('NGA'),
      locationRegion: new FormControl(null),
      locationState: new FormControl(null),
      locationAddress: new FormControl(null),
      locationTown: new FormControl(null),
      locationCity: new FormControl(null),
      geolocation: new FormControl(null),
      initialEstimate: new FormControl(null),
      proxCause: new FormControl(null),
      narration: new FormControl(null),
      createdBy: new FormControl(null),
      perilCode: new FormControl(null),
      // permanently disabled. Not meant for submission or editing, just for displaying info
      issuedOn: new FormControl({value: null, disabled: true}),
      renewalDueOn: new FormControl({value: null, disabled: true}),
    });
  }

  setPolicies() {
    console.log('setPolicies is called');
    this.loadingPolicyNos = true;
    this.findClientService.getClientPolicies(this.clientNo).subscribe(
      (res) => {
        this.policiesList = res;
        this.loadingPolicyNos = false;
      },
      (err: HttpErrorResponse) => {
        console.log(
          'Error fetching policies for Client Number: ',
          +this.clientNo,
          err
        );
        this.loadingPolicyNos = false;
      }
    );
  }

  setPolicyCoversList(policyNo: string) {
    this.loadingCovers = true;
    this.findClientService.getPolicyCovers(policyNo).subscribe(
      (res: any[]) => {
        this.policyCoversList = res;
        this.loadingCovers = false;
      },
      (err: HttpErrorResponse) => {
        console.log(
          'Error fetching covers for policy number: ' + policyNo,
          err
        );
        this.loadingCovers = false;
      }
    );
  }

  setPolicyCode(policyNo: string) {
    this.loadingPolicyCodes = true;
    this.findClientService
      .getPolicyCodesByPolicyNo(policyNo)
      .subscribe(
        (res: any[]) => {
          this.policyCodesList = res;
        },
        (err: HttpErrorResponse) =>
          console.log(
            'Error fetching policyCode for policyNo: ' + policyNo,
            err
          )
      )
      .add(() => (this.loadingPolicyCodes = false));
  }

  setPolicySuffix(policyNo: string, policyCode: string) {
    this.loadingPolicyNoSuffixes = true;
    this.findClientService
      .getPolicyNoSuffix(policyNo, policyCode)
      .subscribe(
        (res: any[]) => {
          this.policyNoSuffixesList = res;
          if (this.policyNoSuffixesList.length){
            this.newClaimForm.controls.policyNoSuffix.enable()
          }else{
            this.newClaimForm.controls.policyNoSuffix.disable()
          }
        },
        (err: HttpErrorResponse) => {
          console.log(
            'Error fetching policy no suffix for policyNo: ' + policyNo,
            err
          )
          this.newClaimForm.controls.policyNoSuffix.disable()
        }
      )
      .add(() => (this.loadingPolicyNoSuffixes = false));
  }

  setPolicyCurrency(policyNo: string, policyCode: string) {
    this.newClaimForm.patchValue({ currency: null }); // clear old value first
    this.loadingPolicyCurrency = true;
    this.findClientService
      .getPolicyCurrency(policyNo, policyCode)
      .subscribe(
        (res: any) => this.newClaimForm.patchValue({ currency: res?.currency }),
        (err: HttpErrorResponse) =>
          console.log(
            'Error fetching currency for policyNo: ' +
              policyNo +
              'and policyCode: ' +
              policyCode,
            err
          )
      )
      .add(() => (this.loadingPolicyCurrency = false));
  }

  setCountriesList() {
    this.loadingCountries = true;
    this.findClientService
      .getCountriesList()
      .subscribe((res: any[]) => (this.countriesList = res))
      .add(() => (this.loadingCountries = false));
  }

  setPolicyCoverPeriod(policyNo: string, policyCode: string){
    this.loadingPolicyCoverPeriod = true;
    this.policyService.getPolicy(policyNo, policyCode).subscribe(
      (res: any) => {
        this.newClaimForm.patchValue({
        issuedOn: this.stripTimePipe.transform(res.issuedOn),
        renewalDueOn: this.stripTimePipe.transform(res.renewalDueOn),
      })
    }
    ).add(() => this.loadingPolicyCoverPeriod = false)
  }

  setRegionsList() {
    if (!this.newClaimForm.get('locationCountry')?.value) return;
    this.loadingRegions = true;
    const countryCode = this.newClaimForm.get('locationCountry')?.value;
    this.findClientService
      .getRegionsList(countryCode)
      .subscribe((res: any[]) => {
        this.regionsList = res;
        const regionFC = this.newClaimForm.get('locationRegion');
        if (!this.regionsList.find((x) => x.code == regionFC?.value)) {
          regionFC.reset();
        }
      })
      .add(() => (this.loadingRegions = false));
  }

  setStatesList() {
    if (!this.newClaimForm.get('locationRegion')?.value) return;
    this.loadingStates = true;
    const regionCode = this.newClaimForm.get('locationRegion')?.value;

    this.findClientService
      .getStatesList(regionCode)
      .subscribe((res: any[]) => {
        this.statesList = res;
        const stateFC = this.newClaimForm.get('locationState');
        if (!this.statesList.find((x) => x.code == stateFC?.value)) {
          stateFC.reset();
        }
      })
      .add(() => (this.loadingStates = false));
  }

  setTownsList() {
    if (!this.newClaimForm.get('locationState')?.value) return;
    this.loadingTowns = true;
    const stateCode = this.newClaimForm.get('locationState')?.value;
    this.findClientService
      .getTownsList(stateCode)
      .subscribe((res: any[]) => {
        this.townsList = res;
        const townFC = this.newClaimForm.get('locationTown');
        if (!this.townsList.find((x) => x.code == townFC?.value)) {
          townFC.reset();
        }
      })
      .add(() => (this.loadingTowns = false));
  }

  setClaimTypes(coverCode: string) {
    this.loadingClaimTypes = true;
    this.findClientService.getClaimTypes(coverCode).subscribe(
      (res: any[]) => {
        this.claimTypesList = res;
        this.loadingClaimTypes = false;
      },
      (err: HttpErrorResponse) => {
        console.log(
          'Error fetching claimTypes List for coverCode: ' + coverCode,
          err
        );
        this.loadingClaimTypes = false;
      }
    );
  }

  setClaimTypeCodesAndTitlesList(){
    this.findClientService.getCodeList('CLAIM_TYPE').subscribe(
      res => this.claimTypeCodesAndTitles = res
    )
  }

  setPerilCodesAndTitlesList(){
    this.findClientService.getCodeList('PERIL').subscribe(
      res => this.perilCodesAndTitles = res
    )
  }

  setProximateCauseCodesAndTitlesList(){
    this.findClientService.getCodeList('PROXIMATE_CAUSE').subscribe(
      res => this.proximateCauseCodesAndTitles = res
    )
  }

  setPerilsList(coverCode: string, claimType: string) {
    this.loadingPerils = true;
    this.findClientService.getPerils(coverCode, claimType).subscribe(
      (res: any[]) => {
        this.perilsList = res;
        this.loadingPerils = false;
      },
      (err: HttpErrorResponse) => {
        console.log(
          'Error fetching perils list for coverCode ' +
            coverCode +
            'and claimType ' +
            claimType,
          err
        );
        this.loadingPerils = false;
      }
    );
  }

  setProximateCausesList(
    coverCode: string,
    claimType: string,
    perilCode: string
  ) {
    this.loadingProximateCauses = true;
    this.findClientService
      .getProximateCause(coverCode, claimType, perilCode)
      .subscribe(
        (res: any[]) => {
          this.proximateCausesAllowedList = res;
          this.loadingProximateCauses = false;
        },
        (err: HttpErrorResponse) => {
          console.log(
            'Error fetching proximate causes allowed list. Using coverCode' +
              coverCode +
              'and claimType: ' +
              claimType +
              'perilCode' +
              perilCode,
            err
          );
          this.loadingProximateCauses = false;
        }
      );
  }

  setPendingPayments(clientNo, busLine) {
    this.findClientService
      .getPendingPaymentsApi(clientNo, busLine)
      .subscribe((res) => {
        this.paymentList = res;
        console.log('payment Info', res);
      });
  }

  // setPendingClaims(clientNo) {
  //   this.findClientService.getPendingClaims(clientNo).subscribe((res) => {
  //     this.pendingClaims = res;
  //   });
  // }

  // getClaimStatus() {
  //   this.findClientService.getClaimStatus().subscribe((res) => {
  //     this.claimStatus = res;
  //   });
  // }

  // getClaimRequirements() {
  //   this.findClientService.getClaimRequirements('15').subscribe((res) => {
  //     this.claimRequirements = res;
  //     console.log('Claim Requirements', res);
  //   });
  // }

  getProviderActions() {
    this.findClientService.getProviderActions().subscribe((res) => {
      this.providerActions = res;
      console.log('provider action', res);
    });
  }

  onPolicyNoChange() {
    const { policyNo } = this.newClaimForm.value;
    // clear dependents
    // clear their form values
    this.newClaimForm.patchValue({
      policyCode: null,
      coverCode: null,
      claimType: null,
      perilCode: null,
      proxCause: null,
      currency: null,
    })
    // clear the existing options
    this.policyCodesList = []
    this.policyCoversList = []
    this.claimTypesList = []
    this.perilsList = []
    this.proximateCausesAllowedList = []

    this.setPolicyCode(policyNo);
    this.setPolicyCoversList(policyNo);
  }

  onPolicyCodeChange() {
    const { policyNo, policyCode } = this.newClaimForm.value;

    // clear dependent fields values
    this.newClaimForm.patchValue({
      policyNoSuffix: null,
      currency: null,
      issuedOn: null,
      renewalDueOn: null,
    })
    // clear dependent fields options
    this.policyNoSuffixesList = []

    this.setPolicyCurrency(policyNo, policyCode);
    this.setPolicySuffix(policyNo, policyCode);
    this.setPolicyCoverPeriod(policyNo, policyCode);
  }

  onCoverChange() {
    // clear dependent fields values
    this.newClaimForm.patchValue({
      claimType: null,
      perilCode: null,
      proxCause: null
    })
    // clear dependent fields options
    this.claimTypesList = [];
    this.perilsList = [];
    this.proximateCausesAllowedList = [];

    this.setClaimTypes(this.newClaimForm.value.coverCode);
  }

  onClaimTypeChange() {
    const { coverCode, claimType } = this.newClaimForm.value;

    // clear dependent fields values
    this.newClaimForm.patchValue({
      perilCode: null,
      proxCause: null
    })
    // clear dependent fields options
    this.perilsList = [];
    this.proximateCausesAllowedList = [];

    this.setPerilsList(coverCode, claimType);
  }

  onPerilChange() {
    const { coverCode, claimType, perilCode } = this.newClaimForm.value;

    // clear dependent fields values
    this.newClaimForm.patchValue({
      proxCause: null
    })
    // clear dependent fields options
    this.proximateCausesAllowedList = [];
    
    this.setProximateCausesList(coverCode, claimType, perilCode);
  }

  onSaveNewClaim() {
    if(this.newClaimForm.invalid){
      this.newClaimForm.markAllAsTouched()
      return
    }
    this.isCreatingClaim = true;
    this.newClaimForm.patchValue({ createdBy: this.user }); // set user

    this.findClientService
      .postNewClaim(this.newClaimForm.value)
      .subscribe(
        (res: any) => {
          this.utilityService.info('Claim created successfully: ' + res.claimNo);
          this.newClaimForm.patchValue(res);
          this.claimNo.emit(res.claimNo);
          this.basicInfo.emit(res);
        },
        (err: HttpErrorResponse) => {
          console.log('Error saving new claim', err);
          this.utilityService.info('Error: ' + err, 0);
        }
      )
      .add(() => (this.isCreatingClaim = false));
  }

  submit() {
    // console.log(this.form.value);
  }

  isInvalidField(form, fieldName){
    return form.controls[fieldName].touched && form.controls[fieldName].invalid
  }

  getClaimTypeTitle(code){
    return this.claimTypeCodesAndTitles.find(item => item.code == code )?.title
  }

  getPerilTitle(code){
    return this.perilCodesAndTitles.find(item => item.code == code)?.title
  }

  getProximateCauseTitle(code){
    return this.proximateCauseCodesAndTitles.find(item => item.code == code)?.title
  }
}
