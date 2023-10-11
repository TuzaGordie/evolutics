import { UtilityService } from 'src/app/Services/utility.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { SalesExtrasService } from '../../sales-extras/sales-extras.service';
import { ICreateLead } from '../../sales-extras/sales-lead-create.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientService } from 'src/app/Services/client.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class LeadCreateIndexComponent implements OnInit {
  reportGroupList: any = [];
  reportList: any = [];
  individual = true;
  corporate = false;
  classindividual = 'false';
  classcorporate = 'true';
  private nbofbol: number = 1;
  private nbofpo: number = 1;
  validResult: boolean;
  loading: boolean;
  opportunityList: FormArray;
  opportunityL: string[] = [''];
  form: FormGroup;
  clientType: any;
  companyProducts = [];

  constructor(
    public seS: SalesExtrasService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    public clientS: ClientService
  ) {}

  ngOnInit(): void {
    this.initializeFormFields();
    this.show(this.clientType || 'I');
    this.populateFieldFromFindCLientSelection();
    this.getClientFromQuery();
  }

  getClientFromQuery() {
    this.route.queryParams.subscribe((res) => {
      const { clientNo, clientType } = res;
      if (clientNo) this.setClientList(clientNo);
      if (clientType) this.clientType = clientType;
    });
  }

  initializeFormFields() {
    this.opportunityList = this.fb.array([
      new FormGroup({
        companyCode: configForms.default(''),
        productOpportunities: configForms.default(''),
      }),
    ]);
    this.form = new FormGroup({
      clientLeadDetails: new FormGroup({
        clientNo: configForms.required(''),
        fullName: configForms.required(''),
        surname: configForms.required(''),
        phoneNumber: configForms.required(''),
        contactAddress: configForms.default(''),
        contactAddressRegion: configForms.default(''),
        contactAddressState: configForms.default(''),
        contactAddressTown: configForms.default(''),
        dateOfBirth: configForms.default(''),
        firstname: configForms.required(''),
        alternativePhoneNumber: configForms.default(''),
        ageGroup: configForms.default(''),
        middleName: configForms.required(''),
        gender: configForms.default(''),
        email: configForms.default(''),
        alternativeEmail: configForms.default(''),
        maritalStatus: configForms.default(''),
        employmentStatus: configForms.default(''),
        occupationGroup: configForms.default(''),
        annualIncomeBand: configForms.default(''),
        employer: configForms.default(''),
        employerName: configForms.default(''),
        companyName: configForms.default(''),
        companyPhone: configForms.default(''),
        companyWebsite: configForms.default(''),
        companyEmail: configForms.default(''),
        companyAddress: configForms.default(''),
        sector: configForms.default(''),
        annualTurnOverRange: configForms.default(''),
        annualProfitBeforeTaxRange: configForms.default(''),
        coyRegdNo: configForms.default(''),
      }),
      clientLeadOpportunity: new FormGroup({
        estimatedPremium: configForms.default(''),
        expectedCurrency: configForms.default(''),
        estimatedPremiumRange: configForms.default(''),
        opportunityList: this.opportunityList,
        companyCode: configForms.default(''),
        productOpportunities: configForms.default(''),
      }),
      clientAssignment: new FormGroup({
        agentNo: configForms.default('', null, this.validateAgentNo()),
        agentName: configForms.default(''),
        assignToself: configForms.default(''),
        assignToSpecificSalesPersonnel: configForms.default(''),
        autoAssign: configForms.default(''),
        leadTemperature: configForms.default(''),
        leadQuality: configForms.default(''),
        priorityLevel: configForms.default(''),
        relationshipManager: configForms.default(''),
        relManagerName: configForms.default(''),
        teamCat: configForms.default(''),
        teamCode: configForms.default(''),
      }),

      clientLeadAppointment: new FormGroup({
        dateOfNextVisit: configForms.default(''),
        placeOfNextVisit: configForms.default(''),
        timeOfNextVisit: configForms.default(''),
        visitType: configForms.default(''),
        note: configForms.default(''),
        assignedTo: configForms.default(''),
        clientId: configForms.default(''),
        clientNo: configForms.default(''),
      }),

      clientLeadProspect: new FormGroup({
        eventGeneratingTheprospect: configForms.default(''),
        regionProspected: configForms.default(''),
        countryProspected: configForms.default(''),
        cityProspected: configForms.default(''),
        townProspected: configForms.default(''),
        prospectingDate: configForms.default(''),
        channelGeneratingTheprospect: configForms.default(''),
        referrerName: configForms.default(''),
        referrerNo: configForms.default(''),
        clientNo: configForms.default(''),
        prospectgeneratedBy: configForms.default(''),
      }),
    });
  }
  get clientLeadDetailsForm() {
    return this.form.get('clientLeadDetails');
  }
  get clientLeadOpportunityForm() {
    return this.form.get('clientLeadOpportunity');
  }
  get clientAssignmentForm() {
    return this.form.get('clientAssignment');
  }
  get clientLeadAppointmentForm() {
    return this.form.get('clientLeadAppointment');
  }
  get clientLeadProspectForm() {
    return this.form.get('clientLeadProspect');
  }
  bolInc() {
    this.nbofbol = this.nbofbol + 1;
  }

  bolDec() {
    this.nbofbol = this.nbofbol - 1;
    if (this.nbofbol <= 0) {
      this.nbofbol = 1;
    }
  }

  poCounter() {
    return new Array(this.nbofpo);
  }

  poInc() {
    this.nbofpo = this.nbofpo + 1;
  }

  findClient() {
    this.router.navigate(['find-client'], {
      queryParams: { findType: 'client' },
      relativeTo: this.route,
    });
  }
  findAgent() {
    this.router.navigate(['../../create-lead/find-client'], {
      queryParams: { findType: 'agent' },
      relativeTo: this.route,
    });
  }
  findReferrer() {
    this.router.navigate(['../../create-lead/find-client'], {
      queryParams: { findType: 'referrer' },
      relativeTo: this.route,
    });
  }

  findEmployer() {
    this.router.navigate(['../../create-lead/find-client'], {
      queryParams: { findType: 'employer' },
      relativeTo: this.route,
    });
  }

  findRelationshipManager() {
    this.router.navigate(['../../create-lead/find-client'], {
      queryParams: { findType: 'rm' },
      relativeTo: this.route,
    });
  }

  populateFieldFromFindCLientSelection() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      let clientNo = queryMap.get('clientNo');
      console.log('HEYYP' + clientNo);
    });
  }

  validateAgentNo(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return this.seS.getAgentName(control.value).pipe(
        map((res) => {
          if (res) {
            this.form.get('clientAssignment').patchValue({'agentName': res})
            this.form.get('clientAssignment.agentName').disable()
            control.disable()
            return null
          }
          return { "agentNoNotFound": true }
        })
      );
    };
  }

  setRelationshipManager() {
    this.seS
      .getRelManager(this.form.value?.clientAssignment?.relationshipManager)
      .subscribe((res: any) => {
        console.log(
          'relationshipManagerName' +
            JSON.stringify(res?.searchCriteria?.fullName)
        );
        this.form.patchValue({
          clientAssignment: {
            relManagerName: res?.searchCriteria?.fullName,
          },
        });
      });
  }

  setEmployerList() {
    console.log(this.form.value?.clientLeadDetails.employer);
    let empl = this.form.value?.clientLeadDetails.employer;
    this.seS.getDetailsByClientNo(empl).subscribe((res: any) => {
      console.log(res);
      this.form.patchValue({
        clientLeadDetails: {
          employerName: res,
        },
      });
    });
  }

  setClientList(_clientNo?: string) {
    let clientNo = _clientNo || this.form.value?.clientLeadDetails?.clientNo;
    if (!clientNo) {
      this.validResult = false;
      console.log('run');
    } else {
      try {
      } catch (error) {}
      this.clientS.getClientViewData(clientNo).subscribe((res: any) => {
        console.log('RESULT OUTPUT' + JSON.stringify(res));
        if (res?.clientNo === null) {
          this.utilityService.info(
            'Client not found, Please create a new client'
          );
        } else {
          this.validResult = true;
          this.form.patchValue({
            clientLeadDetails: {
              clientNo: res?.clientNo,
              clientFullName: res?.fullName,
              surname: res?.surname,
              phoneNumber: res?.phoneNumber == null ? '' : res?.phoneNumber,
              firstname: res?.firstName,
              middleName: res?.middleName,
              ageGroup: res?.ageGroup,
              annualIncomeBand: res?.annualIncomeBand,
              alternativeEmail: res?.alternativeEmail,
              mainEmail: res?.email,
              alternativePhoneNumber: res?.alternativePhoneNumber,
              gender: res?.gender,
              dateOfBirth: res?.dateOfBirth,
              contactCountry: res?.country,
              contactAddress: res?.address,
              contactAddressRegion: res?.countryAddressRegion,
              maritalStatus: res?.maritalStatus,
              contactAddressState: res?.state,
              occupationGroup: res?.occupationGroup,
            },
          });
          this.form.controls['clientLeadDetails'].disable();

          console.log('UPDATE' + JSON.stringify(this.form.value));
        }
      }),
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.utilityService.info('Client doesnt Exist, Proceed to create');
          } else {
            this.utilityService.notify('An error occurred' + error.status, 0);
          }
        };
    }
  }

  onSubmit(value: string) {
    this.submit();
  }

  prepareSubmitPayload() {
    let opportunityList = [];
    this.form.value.clientLeadOpportunity?.opportunityList.forEach(
      (element) => {
        opportunityList.push({
          companyCode: element?.companyCode,
          productOpportunities: element?.productOpportunities,
        });
      }
    );

    let data: any = {
      clientAssignment: {
        agentName: this.form.value.clientAssignment?.agentName,
        agentNo: this.form.value.clientAssignment?.agentNo,
        assignToSelf: this.form.value.clientAssignment?.agentNo,
        assignToSpecificSalesPersonnel:
          this.form.value.clientAssignment?.agentNo,
        autoAssign: this.form.value.clientAssignment?.agentNo,
        clientNo: this.form.value.clientLeadDetails?.clientNo,
        leadQuality: this.form.value.clientAssignment?.leadQuality,
        leadTemperature: this.form.value.clientAssignment?.leadTemperature,
        priorityLevel: this.form.value.clientAssignment?.priorityLevel,
        relManagerName: this.form.value.clientAssignment?.relManagerName,
        relationshipManager:
          this.form.value.clientAssignment?.relationshipManager,
        teamCat: this.form.value.clientAssignment?.teamCat,
        teamCode: this.form.value.clientAssignment?.teamCode,
      },
      clientLeadAppointment: {
        assignedTo: this.form.value.clientLeadAppointment?.teamCode,
        clientId:
          this.form.value.clientLeadDetails?.clientId === null
            ? ''
            : this.form.value.clientLeadDetails?.clientId,
        clientNo: this.form.value.clientLeadDetails?.clientNo,
        dateOfNextVisit: this.form.value.clientLeadAppointment?.dateOfNextVisit,
        note: this.form.value.clientLeadAppointment?.note,
        placeOfNextVisit:
          this.form.value.clientLeadAppointment?.placeOfNextVisit,
        timeOfNextVisit: this.form.value.clientLeadAppointment?.timeOfNextVisit,
        visitType: this.form.value.clientLeadAppointment?.visitType,
      },
      clientLeadDetails: {
        ageGroup: this.form.value.clientLeadDetails?.ageGroup,
        alternativeEmail: this.form.value.clientLeadDetails?.alternativeEmail,
        alternativePhoneNo:
          this.form.value.clientLeadDetails?.alternativePhoneNumber,
        alternativePhoneNumber:
          this.form.value.clientLeadDetails?.alternativePhoneNumber,
        annualIncomeBand:
          this.form.value.clientLeadDetails?.annualIncomeBand === null
            ? ''
            : this.form.value.clientLeadDetails?.annualIncomeBand,
        annualProfitBeforeTaxRange:
          this.form.value.clientLeadDetails?.annualProfitBeforeTaxRange === null
            ? ''
            : this.form.value.clientLeadDetails?.annualProfitBeforeTaxRange,
        annualTurnOverRange:
          this.form.value.clientLeadDetails?.annualTurnOverRange === null
            ? ''
            : this.form.value.clientLeadDetails?.annualTurnOverRange,
        clientNo: this.form.value.clientLeadDetails?.clientNo,
        companyEmail:
          this.form.value.clientLeadDetails?.companyEmail === null
            ? ''
            : this.form.value.clientLeadDetails?.companyEmail,
        companyName:
          this.form.value.clientLeadDetails?.companyName === null
            ? ''
            : this.form.value.clientLeadDetails?.companyName,
        companyPhoneNo:
          this.form.value.clientLeadDetails?.companyPhoneNo === null
            ? ''
            : this.form.value.clientLeadDetails?.companyPhoneNo,
        companyWebsite:
          this.form.value.clientLeadDetails?.companyWebsite === null
            ? ''
            : this.form.value.clientLeadDetails?.companyWebsite,
        contactAddress: this.form.value.clientLeadDetails?.contactAddress,
        contactAddressRegion:
          this.form.value.clientLeadDetails?.contactAddressRegion,
        contactAddressState:
          this.form.value.clientLeadDetails?.contactAddressState,
        contactAddressTown:
          this.form.value.clientLeadDetails?.contactAddressTown,
        coyRegNo:
          this.form.value.clientLeadDetails?.coyRegNo === null
            ? ''
            : this.form.value.clientLeadDetails?.coyRegNo,
        dateOfBirth: this.form.value.clientLeadDetails?.dateOfBirth,
        email: this.form.value.clientLeadDetails?.email,
        employer: this.form.value.clientLeadDetails?.employer,
        employerName: this.form.value.clientLeadDetails?.employerName,
        employmentStatus: this.form.value.clientLeadDetails?.employmentStatus,
        firstName: this.form.value.clientLeadDetails?.firstName,
        fullName: this.form.value.clientLeadDetails?.fullName,
        gender: this.form.value.clientLeadDetails?.gender,
        maritalStatus: this.form.value.clientLeadDetails?.maritalStatus,
        middleName: this.form.value.clientLeadDetails?.middleName,
        occupationGroup: this.form.value.clientLeadDetails?.occupationGroup,
        phoneNumber: this.form.value.clientLeadDetails?.phoneNumber,
        sector: this.form.value.clientLeadDetails?.sector,
        surname: this.form.value.clientLeadDetails?.surname,
      },
      clientLeadOpportunity: {
        clientNo: this.form.value.clientLeadOpportunity?.clientNo,
        estimatedPremium:
          this.form.value.clientLeadOpportunity?.estimatedPremium,
        estimatedPremiumRange:
          this.form.value.clientLeadOpportunity?.estimatedPremiumRange,
        expectedCurrency:
          this.form.value.clientLeadOpportunity?.expectedCurrency,
        opportunityList: opportunityList,
      },
      clientLeadProspect: {
        channelGeneratingProspect:
          this.form.value.clientLeadProspect?.channelGeneratingProspect,
        cityProspected: this.form.value.clientLeadProspect?.cityProspected,
        clientNo: this.form.value.clientLeadProspect?.clientNo,
        countryProspected:
          this.form.value.clientLeadProspect?.countryProspected,
        eventGeneratingProspect:
          this.form.value.clientLeadProspect?.eventGeneratingProspect,
        prospectGeneratedBy:
          this.form.value.clientLeadProspect?.prospectGeneratedBy,
        prospectingDate: this.form.value.clientLeadProspect?.prospectingDate,
        referrerName: this.form.value.clientLeadProspect?.referrerName,
        referrerNo: this.form.value.clientLeadProspect?.referrerNo,
        regionProspected: this.form.value.clientLeadProspect?.regionProspected,
        townProspected: this.form.value.clientLeadProspect?.townProspected,
      },
    };
    return data;
  }

  private async submit() {
    this.loading = true;
    let values = this.prepareSubmitPayload();
    let result = null;
    this.seS
      .createLead(values, this.form.value.clientNo)
      .then((res) => {
        result = res;
        // console.log('RESULT FROM' + result + 'Create Lead');
        if (result != null) {
          this.utilityService.info('Success', 1);
        } else {
          this.utilityService.info('Failed', 0);
        }
      })
      .catch((error) => {
        this.utilityService.info('An error occurred', 0);
        console.log(error);
      });
    this.loading = false;
  }

  show(event: any) {
    if (event == 'I') {
      this.individual = true;
      this.corporate = false;
      this.classindividual = 'true';
      this.classcorporate = 'false';
    }
    if (event == 'C') {
      this.individual = false;
      this.corporate = true;
      this.classindividual = 'false';
      this.classcorporate = 'true';
    }
  }

  bolCounter() {
    return new Array(this.nbofbol);
  }

  downloadTemplate() {}

  setCompanyProducts() {
    const code = this.form.get('clientLeadOpportunity').value['companyCode']
      .code as string;
    this.seS.getProductByCompany(code).subscribe((res) => {
      this.companyProducts = res;
    });
  }

  addOpportunityList() {
    const b = new FormGroup({
      companyCode: configForms.default(''),
      productOpportunities: configForms.default(''),
    });

    this.opportunityL.push('');
    this.opportunityList.push(b);
  }

  removeOpportunityList(i: number) {
    this.opportunityList.removeAt(i);
    this.opportunityL.splice(i, 1);
  }
}
