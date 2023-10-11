import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../../Services/utility.service";
import {ClientHelpersService} from "../../../CRMS/crms-pages/client-desk/service/client-helpers.service";
import {DocumentService} from "../../../Services/document.service";
import {HttpErrorResponse} from "@angular/common/http";
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { FindClientService } from 'src/app/CRMS/crms-pages/client-desk/service/find-client.service';
import { ClientStatusComponent } from '../edit-modals/client-status/client-status.component';
import { EditClientComponent } from '../edit-modals/edit-client/edit-client.component';
declare var $: any;
@Component({
  selector: 'app-view-client-new',
  templateUrl: './view-client-new.component.html',
  styleUrls: ['./view-client-new.component.scss']
})
export class ViewClientNewComponent  implements OnInit {
  faPhoneSquareAlt = faPhoneSquareAlt;
  viewClientForm: FormGroup;
  readonlyValue: any;
  relationshipLength: any;
  pendingPaymentsList: any[];
  TITLES;
  RELATIONSHIP_TYPES;
  documentsBaseURL: string;
  private nbofId: number = 1;
  isEditableClientID : boolean = false;
  clientNo: string;
  clientPassport: string = "";
  clientEmploymentForm: FormArray;
  clientDatesForm: FormGroup;
  clientIdentificationForm: FormArray;
  clientContactPersonsForm: FormArray;
  clientRelationshipsForm: FormArray;
  newRelationsList: FormGroup[] = [];
  agentDetails: any = {};
  providerInfo: any = {};
  generalInfo: any = {};
  idTypesList = [];
  showNewRelationship: boolean = false;
  clientWebLoginsList = [];
  clientDocumentsList = [];
  policiesList = [];
  policyCoversList = [];
  // cards to be linked
  pendingClaimsCount: number;
  pendingPaymentsCount: number;
  opportunities = 'xx';
  newQuotation = 'xx';
  calendar = 'xx';
  totalPaymentsReceived = 'xx';
  pendingWorkflows = 'xx';
  pendingQuotesList: any[];
  communication = 'xx';
  underwritingInformation = 'xx';
  newClaimForm: FormGroup;
  countriesList: any[];
  regionsList: any[];
  statesList: any[];
  clientSignature: any;
  clientPicture: any;
  showNewIdRow = false;
  clientNewIdForm: FormGroup;
  clientNationality: string;
  newEmploymentForm: FormGroup;
  // addDocumentModal lists
  branchList: any[];
  categoryList: any[];
  sensitivityList: any[];
  addDocumentForm: FormGroup;
  showAddEmploymentForm = false;
  isDocSaving = false;
  fileToBeUploaded: string;
  newDocumentFile: File;
  claimDocsCount = 0;
  claimTypesList: any[];
  perilsList: any[];
  proximateCausesAllowedList: any[];

  // loading indicators
  loadingPolicyNos = false;
  loadingCovers = false;
  loadingClaimTypes = false;
  loadingPerils = false;
  loadingCountries = false;
  loadingRegions = false;
  loadingStates = false;
  loadingProximateCauses = false;
  isEditableEMP: boolean = false;
  nbofID: number = 0;
   nbofEMP: number = 0;
  isEditRelationShip: boolean = false;
  clientStatusesList: any[];
  clientDetailsForm: FormGroup;

  isUpdatingClient: any = {} //

  constructor(
    public findClientService: FindClientService,
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private viewClientHelpersService: ClientHelpersService,
    private documentsService: DocumentService
  ) {
    this.TITLES = viewClientHelpersService.TITLES;
    this.RELATIONSHIP_TYPES = viewClientHelpersService.RELATIONSHIP_TYPES;
  }

  ngOnInit(): void {
    this.createViewClientForm();
    this.createClientEmploymentForm();
    this.createClientDatesForm();
    this.createClientIdentificationForm();
    this.createClientContactPersonsForm();
    this.createClientRelationshipsForm();
    this.createNewClaimForm();
    this.createNewIdForm();
    this.createNewEmploymentForm();
    this.createNewDocumentForm();
    this.createClientDetailsForm();

    this.setViewClient();
    this.setGeneralInfo();
    this.setClientDetailsForm();
    this.setPolicies();
    this.setRelationship();
    this.setPendingQuotes();
    this.setPendingPayments();
    this.setClientEmployment();
    this.setClientDates();
    this.setClientIdentification();
    this.setClientContactPersons();
    this.setClientSpouseDateOfBirth();
    this.setAgentDetails();
    this.setProviderInfo();
    this.setProviderBalance();
    this.setClientPassport();
    this.setIdTypesList();
    this.setClientRelationships();
    this.setWebLoginsList();
    this.setDocumentsList();
    this.setPendingClaimsCount();
    this.setCountriesList();
    this.setClientSignature();
    this.setClientPicture();
    this.setDocumentsBaseUrl();
    this.setBranches();
    this.setCategories();
    this.setSensitivities();
    this.setClientStatusesList();
  }

  createViewClientForm() {
    this.viewClientForm = new FormGroup({
      clientNo: new FormControl(null),
      countryAddressRegion: new FormControl(null),
      annualIncomeBand: new FormControl(null),
      salutation: new FormControl(null),
      redgNo: new FormControl(null),
      noOfEmployee: new FormControl(null),
      noOfGroups: new FormControl(null),
      financialSizeCategory: new FormControl(null),
      sector: new FormControl(null),
      state: new FormControl(null),
      mailAddRegion: new FormControl(null),
      createdBy: new FormControl(null),
      fullName: new FormControl(null),
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      surname: new FormControl(null),
      gender: new FormControl(null),
      phoneNumber: new FormControl(null),
      alternativePhoneNumber: new FormControl(null),
      email: new FormControl(null),
      alternativeEmail: new FormControl(null),
      address: new FormControl(null),
      dateOfBirth: new FormControl(null),
      category: new FormControl(null),
      kyc: new FormControl(null),
      idNumber: new FormControl(null),
      language: new FormControl(null),
      employer: new FormControl(null),
      crmId: new FormControl(null),
      bankNo: new FormControl(null),
      dateCreated: new FormControl(null),
      communication: new FormControl(null),
      maritalStatus: new FormControl(null),
      band: new FormControl(null),
      groupNo: new FormControl(null),
      clv: new FormControl(null),
      socialMedia: new FormControl(null),
      providerCode: new FormControl(null),
      enroleeNo: new FormControl(null),
      title: new FormControl(null),
      type: new FormControl(null),
      occupationGroup: new FormControl(null),
      website: new FormControl(null),
      statusCd: new FormControl(null),
      ageGroup: new FormControl(null),
      enroleeSuffix: new FormControl(null),
      town: new FormControl(null),
      country: new FormControl(null),
    })
  }

  createClientDetailsForm(){
    this.clientDetailsForm = this.getClientDetailsFormGroup({})
  }

  getClientDetailsFormGroup(data){
    return new FormGroup({
      countryOfRegistration: new FormControl(data?.countryOfRegistration),
      segment: new FormControl(data?.segment),
      placeOfBirth: new FormControl(data?.placeOfBirth), 
      powerOfAttorney: new FormControl(data?.powerOfAttorney),
      clientBandBasis: new FormControl(data?.clientBandBasis),
      clvCalcBasis: new FormControl(data?.clvCalcBasis),
      voiceRecog: new FormControl(data?.voiceRecog),
      clv: new FormControl(data?.clv),
      band: new FormControl(data?.band),
      ownerClientNo: new FormControl(data?.ownerClientNo),
      coverCode: new FormControl(data?.coverCode),
      asar: new FormControl(data?.asar),
      isar: new FormControl(data?.isar),
      arsar: new FormControl(data?.arsar),
      effDate: new FormControl(data?.effDate),
      ageGroup: new FormControl(data?.ageGroup),
      engageScore: new FormControl(data?.engageScore),
    })
  }

  createClientEmploymentForm() {
    this.clientEmploymentForm = new FormArray([])
  }

  createClientDatesForm() {
    this.clientDatesForm = new FormGroup({
      weddingAnniversaryDate: new FormControl(null),
      createdOn: new FormControl(null),
      dateOfBirth: new FormControl(null),
      spouseDateOfBirth: new FormControl(null),
    });
  }

  createClientIdentificationForm(){
    this.clientIdentificationForm = new FormArray([])
  }

  createNewIdForm(){
    this.clientNewIdForm = new FormGroup({
      idExpiryDate: new FormControl(null),
      idIssueAuth: new FormControl(null),
      idIssueDate: new FormControl(null),
      idNumber: new FormControl(null),
      idType: new FormControl(null),
      nationality: new FormControl(null),
      pensionCommissionNumber: new FormControl(null),
      nationalInsuranceNumber: new FormControl(null),
      bvn: new FormControl(null),
    });
  }

  createNewEmploymentForm(){
    this.newEmploymentForm = new FormGroup({
      employer: new FormControl(null),
      employmentStatus: new FormControl(null),
      employmentDate: new FormControl(null),
      occupation: new FormControl(null),
      occupationGroup: new FormControl(null),
      incomeBand: new FormControl(null),
      staffNo: new FormControl(null),
      cadre: new FormControl(null),
      jobTitle: new FormControl(null),
      active: new FormControl(null),
      employmentEndDate: new FormControl(null),
    })
  }

  createClientContactPersonsForm(){
    this.clientContactPersonsForm = new FormArray([])
    console.log(
      'clientContactPersonsForm Abstract control',
      this.clientContactPersonsForm
    );
  }

  createClientRelationshipsForm() {
    this.clientRelationshipsForm = new FormArray([]);
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

  addNewRelationForm() {
    this.newRelationsList.push(
      new FormGroup({
        clientNo: new FormControl(this.clientNo),
        fullName: new FormControl(null),
        relationship: new FormControl(null),
        email: new FormControl(null),
        relClientNo: new FormControl(null),
        clientStatus: new FormControl(null),
        relDt: new FormControl(null),
      })
    );
  }

  createNewDocumentForm(){
    this.addDocumentForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      sensitivity: new FormControl(null),
      branch: new FormControl(null),
      boxNo: new FormControl(null),
      category: new FormControl(null)
    })
  }

  setViewClient(){
    this.clientNo = this.activatedRoute.snapshot.queryParamMap.get('clientNo');
    this.findClientService.getAllClientData(this.clientNo).subscribe(
      (res: any) => {
        this.setFormData(res);
        console.log('fetched client info:', res);
      },
      (err: HttpErrorResponse) => {
        this.utilityService.notify(
          "Couldn't find client with Client Number:" + this.clientNo,
          0
        );
        console.log('error while fetching client info:', err);
      }
    );
  }

  setClientDetailsForm(){
    this.findClientService.getClientDetails(this.clientNo).subscribe(
      (res: any) => {
        this.clientDetailsForm.patchValue(res)
      },
      (err: HttpErrorResponse) => {
        console.log("error fetching client details: ", err)
      }
    )
  }

  setPolicies() {
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

  setRelationship() {
    this.findClientService.getRelationship().subscribe((res) => {
      const relationList: any = res;
      this.relationshipLength = relationList.length;
      console.log('relationship Info', this.relationshipLength);
    });
  }

  setPendingQuotes() {
    this.findClientService.getPendingQuotesByClientNo(this.clientNo).subscribe((res) => {
      this.pendingQuotesList = res;
      console.log('quotes Info', res);
    });
  }

  setPendingPayments() {
    // confirm busLine for CRMS. That is the second argument to this API.
    this.findClientService.getPendingPaymentsApi(this.clientNo, 'L').subscribe((res) => {
      this.pendingPaymentsList = res;
      this.pendingPaymentsCount = this.pendingPaymentsList.length;
      console.log('payment Info', res);
    });
  }

  setClientEmployment() {
    this.findClientService.getClientEmployment(this.clientNo)
      .subscribe(
        (res: any) => {
          if (!Array.isArray(res)) res = [res];
          res.forEach(emp => this.clientEmploymentForm.push(new FormGroup(
            {
              employer: new FormControl(emp?.companyName),
              employmentStatus: new FormControl(emp?.employStatus?.toUpperCase()),
              employmentDate: new FormControl(emp?.employmentDate),
              occupation: new FormControl(emp?.occupation),
              occupationGroup: new FormControl(emp?.occupationGroup),
              incomeBand: new FormControl(emp?.incomeBand),
              // educationLevel: new FormControl(emp?.educationLevel),
              // employerClientNo: new FormControl(emp?.employerClientNo),
              // employerSector: new FormControl(emp?.employerSector),
              // the following four properties don't exist in the API yet. I put them here in anticipation
              staffNo: new FormControl(emp?.staffNo),
              cadre: new FormControl(emp?.cadre),
              jobTitle: new FormControl(emp?.jobTitle),
              active: new FormControl(emp?.active),
              employmentEndDate: new FormControl(emp?.employmentEndDate),
            }
          )))
        },
        (err: HttpErrorResponse) => console.log("error fetching employment details for clientNo:" + this.clientNo, err)
      )
  }

  setClientDates() {
    this.findClientService.getClientDates(this.clientNo).subscribe(
      (res: any) => {
        if (res) {
          this.clientDatesForm.patchValue({
            weddingAnniversaryDate: this.viewClientHelpersService.stripTime(
              res?.wedAnnivDt
            ),
            createdOn: this.viewClientHelpersService.stripTime(res?.createdOn),
            dateOfBirth: this.viewClientHelpersService.stripTime(
              res?.dateOfBirth
            ),
            // ageConfirmed: res?.ageConfirmed,
            // companyRedgDate: res?.companyRedgDate,
            // lastBdayGreetCall: res?.lastBdayGreetCall,
            // createdBy: res?.createdBy,
            // updatedOn: res?.updatedOn,
          });
        }
      },
      (err: HttpErrorResponse) =>
        console.log('error fetching dates for clientNo:' + this.clientNo, err)
    );
  }

  setClientSpouseDateOfBirth() {
    this.findClientService.getClientSpouseDateOfBirth(this.clientNo)
      .subscribe(
        (res: string) => {
          this.clientDatesForm.patchValue({
            spouseDateOfBirth: res,
          })
        },
        (err: HttpErrorResponse) => console.log("error fetching client spouse date of birth for clientNo:" + this.clientNo, err)
      )
  }

  setClientIdentification() {
    this.findClientService.getClientIdentification(this.clientNo)
      .subscribe(
        (res: any) => {
          console.log("logging client identification response", res)
          if (!Array.isArray(res)) res = [res];
          console.info("logging supposed array response in setClientIdentification", res)
          res.forEach(id => {
            // nationality is gotten from the id endpoint
            if (!this.clientNationality) this.clientNationality = id.nationality;
            // TODO when posting id form, remember to pick up nationality from the this.clientNationality

            this.clientIdentificationForm.push(new FormGroup({
              idExpiryDate: new FormControl(id?.idExpiryDate),
              idIssueAuth: new FormControl(id?.idIssueAuth),
              idIssueDate: new FormControl(id?.idIssueDate),
              idNumber: new FormControl(id?.idNumber),
              idType: new FormControl(this.viewClientHelpersService.getIdType(id?.idType)),
              nationality: new FormControl(id?.nationality),
              bvn: new FormControl(id?.bvn),
              nationalInsuranceNumber: new FormControl(id?.nationalInsuranceNumber),
              pensionCommissionNumber: new FormControl(id?.pensionCommissionNumber),
              // idIssuePlace: new FormControl(id?.idIssuePlace),
              // secondNationality: new FormControl(id?.secondNationality),
              // socialSecurityNo: new FormControl(id?.socialSecurityNo),
            }))
          })
          console.info("this.clientIdentificationForm after pushing into it", this.clientIdentificationForm)
        },
        (err: HttpErrorResponse) => console.log("error fetching identification details for clientNo:" + this.clientNo, err)
      )
  }

  setClientContactPersons() {
    this.findClientService.getClientContactPersons(this.clientNo).subscribe(
      (res: any[]) => {
        console.log('response from getClientContactPersons:', res);
        if (Array.isArray(res)) {
          res.forEach((contactPerson) => {
            this.clientContactPersonsForm.push(
              new FormGroup({
                title: new FormControl(contactPerson?.relClientTitle), // doesn't exist in the API for now sha
                fullName: new FormControl(contactPerson?.relClientName),
                phoneNo: new FormControl(contactPerson?.relPhoneNo1),
                email: new FormControl(contactPerson?.relEmail1),
                relationship: new FormControl(contactPerson?.relationship),
                // relClientNo: new FormControl(contactPerson?.relClientNo),
                // relPhoneNo2: new FormControl(contactPerson?.relPhoneNo2),
                // relEmail2: new FormControl(contactPerson?.relEmail2),
              })
            );
          });
        }
      },
      (err: HttpErrorResponse) =>
        console.log(
          'error fetching contact person details for clientNo:' + this.clientNo,
          err
        )
    );
  }

  setClientRelationships() {
    this.findClientService.getClientRelationships(this.clientNo).subscribe(
      (res: any[]) => {
        console.log('response gotten from getClientRelationships service', res);
        if (Array.isArray(res)) {
          res.forEach((relation) => {
            this.clientRelationshipsForm.push(
              new FormGroup({
                clientNo: new FormControl(relation?.clientNo),
                relationship: new FormControl(relation?.relationship),
                category: new FormControl(relation?.category),
                fullName: new FormControl(relation?.fullName),
                email: new FormControl(relation?.email),
                phoneNumber: new FormControl(relation?.phoneNumber),
                id: new FormControl(relation?.id),
                clientStatus: new FormControl(relation?.clientStatus),
                policyNo: new FormControl(relation?.policyNo),
                codeTitle: new FormControl(relation?.codeTitle),
                policyCode: new FormControl(relation?.policyCode),
                relClientNo: new FormControl(relation?.relClientNo),
                relDt: new FormControl(relation?.reDt),
              })
            );
          });
        }
      },
      (err: HttpErrorResponse) =>
        console.log(
          'error fetching relations for clientNo:' + this.clientNo,
          err
        )
    );
  }

  setAgentDetails() {
    this.findClientService.getAgentDetails(this.clientNo).subscribe(
      (res: any) => (this.agentDetails = res),
      (err: HttpErrorResponse) =>
        console.log(
          'error fetching agent details for clientNo:' + this.clientNo,
          err
        )
    );
  }

  setProviderInfo() {
    this.findClientService.getProviderInfo(this.clientNo).subscribe(
      // Using Object.assign instead of just assigning the value in order not to overwrite balance property which is populated by a seperate endpoint
      (res: any) => {
        this.providerInfo = Object.assign(this.providerInfo, res)
        console.log("providerInfo after assigning fetched response", this.providerInfo)
      },
      (err: HttpErrorResponse) =>
        console.log(
          'error fetching provider info for clientNo:' + this.clientNo,
          err
        )
    );
  }

  setProviderBalance(){
    this.findClientService.getProviderBalance(this.clientNo).subscribe(
      (res: string) => {
        this.providerInfo.providerBalance = res
      },
      (err: HttpErrorResponse) =>
        console.log(
          "error fetching provider balance for clientNo:" + this.clientNo,
          err
        )
    )
  }

  setClientPassport() {
    this.documentsService.retrieveClientPassport(this.clientNo).subscribe(
      (res: string) => (this.clientPassport = res),
      (err: HttpErrorResponse) => {
        this.utilityService.notify(
          "Couldn't fetch passport image for client with client number:" +
          this.clientNo,
          0
        );
        console.error(
          'error fetching passport for clientNo:' + this.clientNo,
          err
        );
      }
    );
  }

  setClientStatusesList(){
    this.findClientService.getClientStatusesList().subscribe(
      (res: any) => this.clientStatusesList = res,
      (err: HttpErrorResponse) => console.error("error fetching client statuses list")
    )
  }

  getDocumentsBaseURL() {
    return this.findClientService.getDocumentsBaseURL();
  }

  setGeneralInfo() {
    this.findClientService.getGeneralInfo(this.clientNo).subscribe(
      (res: any) => (this.generalInfo = res),
      (err: HttpErrorResponse) => {
        console.log(
          'error fetching general info for client number:' + this.clientNo,
          err
        );
      }
    );
  }

  setIdTypesList() {
    this.findClientService.getIdTypesList().subscribe(
      (res: any[]) => (this.idTypesList = res),
      (err: HttpErrorResponse) => console.log('Error fetching id types', err)
    );
  }

  setWebLoginsList() {
    this.findClientService.getWebLogin(this.clientNo).subscribe(
      (res: any[]) => (this.clientWebLoginsList = res),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching weblogins for client number: ' + this.clientNo,
          err
        )
    );
  }

  setDocumentsList() {
    this.findClientService.getDocument(this.clientNo).subscribe(
      (res: any[]) => (this.clientDocumentsList = res),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching documents for client number: ' + this.clientNo,
          err
        )
    );
  }

  setPendingClaimsCount() {
    this.findClientService.getPendingClaimsCount(this.clientNo).subscribe(
      (res: number) => (this.pendingClaimsCount = res),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching pending claims count for client number: ' +
          this.clientNo,
          err
        )
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
        this.newClaimForm.patchValue({ policyCode: value });
        this.onPolicyCodeChange();
      },
      (err: HttpErrorResponse) =>
        console.log('Error fetching policyCode for policyNo: ' + policyNo, err)
    );
  }

  setPolicySuffix(policyNo: string) {
    this.findClientService.getPolicyNoSuffix(policyNo).subscribe(
      (res: any[]) => {
        const value = Array.isArray(res) ? res[0]?.policyNoSuffix : null;
        this.newClaimForm.patchValue({ policyNoSuffix: value });
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
      (res: any) => this.newClaimForm.patchValue({ currency: res?.currency }),
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

  setClientSignature(){
    this.findClientService.getClientSignature(this.clientNo)
      .subscribe(
        (doc: any) => this.clientSignature = doc,
        (err: HttpErrorResponse) => console.log("Error fetching signature document for clientNo: " + this.clientNo, err)
      )
  }

  setClientPicture(){
    this.findClientService.getClientPicture(this.clientNo)
      .subscribe(
        (doc: any) => this.clientPicture = doc,
        (err: HttpErrorResponse) => console.log("Error fetching picture document for clientNo: " + this.clientNo, err)
      )
  }

  setDocumentsBaseUrl(){
    this.findClientService.getDocumentsBaseURL()
      .subscribe(
        (res: string) => this.documentsBaseURL = res,
        (err: HttpErrorResponse) => console.error("Error fetching base url for documents storage service", err)
      )
  }

  setBranches(){
    this.documentsService.getBranch()
      .subscribe(
        (data) => this.branchList = data,
        (err: HttpErrorResponse) => console.error("Error fetching branches list", err)
      )
  }

  setCategories() {
    this.documentsService.getCategory()
      .subscribe(
        (data) => this.categoryList = data,
        (err: HttpErrorResponse) => console.error("Error fetching categories list", err)
      )
  }

  setSensitivities() {
    this.documentsService.getSensitivity()
      .subscribe(
        (data) => this.sensitivityList = data,
        (err: HttpErrorResponse) => console.error("Error fetching sensitivities list", err)
      )
  }

  onSubmit() {
    console.log('formdata', this.viewClientForm.value);
    /*    this.findClientService.ownerInfo(this.viewClientForm.value); */
    this.setEditFormData(this.viewClientForm.value);
  }

  onNext() {
    console.log('formdata', this.viewClientForm.value);
    /*  this.findClientService.ownerInfo(this.viewClientForm.value); */
  }

  onEdit(value: any) {
    this.readonlyValue = value;
    console.log('formdata', this.viewClientForm.value);
  }

  checkReadonly(value: any) {
    if (value == this.readonlyValue) {
      return false;
    } else {
      return true;
    }
  }

  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }

  setFormData(data: any) {
    this.viewClientForm.patchValue(data);
  }

  setEditFormData(data: any) {
    this.viewClientForm.patchValue(data);
  }

  editbankNo() {
    $('#editbank').modal('show');
  }

  idCounter() {
    return new Array(this.nbofId);
  }

  idInc() {
    this.nbofId = this.nbofId + 1;
  }
  idDec() {
    this.nbofId = this.nbofId - 1;
    if (this.nbofId <= 0) {
      this.nbofId = 1;
    }
  }

  onSaveNewRelation(relationForm: FormGroup) {
    console.log('about to add this new relation', relationForm);
    // TODO send update the db first
    this.clientRelationshipsForm.push(relationForm);
  }

  onSaveNewClaim() {
    console.log("About to save new claim:", JSON.stringify(this.newClaimForm.value))
    this.findClientService.postNewClaim(this.newClaimForm.value).subscribe(
      (res: any) => console.log('saved new claim', res),
      (err: HttpErrorResponse) => {
        console.log('Error saving new claim', err);
        this.utilityService.notify('Error saving new claim.' + err.message, 0);
      }
    );
  }

  changePP(file?: File) {
    this.uploadDocument(file, 'PP')
  }

  uploadDocument(file: File, subCategory, options?, done?) {
    if (options && (options != null && typeof options === 'object')){
      // delete options with no value
      options = Object.entries(options)
        ?.filter(([key, value]) => !!value)
        .reduce((obj, [key, value]) => {obj[key] = value; return obj}, {})
    }
    // add default options
    options = Object.assign(options || {}, {
      refNo: this.clientNo,
      refCat: 'CLI',
      subCategory: subCategory,
      title: file.name,
    })

    this.documentsService
      .upload(file, options)
      .subscribe(
        (res) => {
          this.utilityService.notify("Document uploaded successfully")
          console.log("uploaded document successfully", res)
          done && done();
        },
        (err: HttpErrorResponse) =>{
          this.utilityService.notify("Error uploading new document", 0)
          console.error("Error uploading new document", err)
        }
      );
  }

  downloadDocument(event: Event, document){
    event.preventDefault()
    const {docKey, fileName} = document;
    const url = `${this.documentsBaseURL}/${docKey}/${fileName}`;
    // this.findClientService.downloadDocument(url).subscribe(
    //   (res) =>
    //     console.log('file successfully downloaded with some response:', res),
    //   (err: HttpErrorResponse) => {
    //     this.utilityService.notify(
    //       'Error occurred while trying to download this document. Try again later',
    //       0
    //     );
    //     console.error('Error downloading file', err);
    //   }
    // );
    window.open(url);
  }

  downloadSignature(event: Event) {
    event.preventDefault();
    const { docKey, fileName } = this.clientSignature;
    const url = `${this.documentsBaseURL}/${docKey}/${fileName}`;
    this.findClientService.downloadDocument(url).subscribe(
      (res) =>
        console.log('file successfully downloaded with some response:', res),
      (err: HttpErrorResponse) => {
        this.utilityService.notify(
          'Error occurred while trying to download this document. Try again later',
          0
        );
        console.error('Error downloading file', err);
      }
    );
  }

  onDocumentSave(){
    // validate
    if (this.addDocumentForm.invalid || !this.newDocumentFile) {
      this.addDocumentForm.markAllAsTouched()
      return;
    }
    this.isDocSaving = true;

    // post
    let options = this.addDocumentForm.value;
    console.log("options just before posting", options);
    console.log("file just before posting", this.newDocumentFile);
    this.uploadDocument(
      this.newDocumentFile,
      options.subCategory,
      options,
      ()=> {
        this.isDocSaving = false;
        this.setDocumentsList();
        $('#addDocumentModal').modal('hide');
        $('#documentModal').modal('show');
      }
    )
  }

  setNewDocumentImage(file){
    this.fileToBeUploaded = file.name;
    this.newDocumentFile = file;
  }

  setClaimTypes(coverCode: string){
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

  setPerilsList(coverCode: string, claimType: string){
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

  setProximateCausesList(coverCode: string, claimType: string, perilCode: string){
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

  onPolicyNoChange(){
    const {policyNo} = this.newClaimForm.value;
    this.setPolicyCode(policyNo)
    this.setPolicySuffix(policyNo)
    this.setPolicyCoversList(policyNo)
  }

  onPolicyCodeChange(){
    const {policyNo, policyCode} = this.newClaimForm.value;
    this.setPolicyCurrency(policyNo, policyCode);
  }

  onCoverChange(){
    this.setClaimTypes(this.newClaimForm.value.coverCode)
  }

  onClaimTypeChange(){
    const {coverCode, claimType} = this.newClaimForm.value;
    this.setPerilsList(coverCode, claimType)
  }

  onPerilChange(){
    const { coverCode, claimType, perilCode } = this.newClaimForm.value;
    this.setProximateCausesList(coverCode, claimType, perilCode)
  }

  claimDocsArray(){
    return new Array(this.claimDocsCount)
  }

  incClaimDocsCount(){
    this.claimDocsCount++
  }

  editable(input:HTMLInputElement,currentElement:HTMLElement,save:HTMLElement) {

    input.readOnly = false;
    input.className = "editableField edit"

    currentElement.hidden = true;

    save.className = "text-red showElement"

  }

  editableID() {
    this.isEditableClientID = !this.isEditableClientID


  }

  editableEMP() {
    this.isEditableEMP = !this.isEditableEMP
  }

  IDCounter() {
    return new Array(this.nbofID);
  }


  addID() {
    this.nbofID = this.nbofID + 1
  }

  EMPCounter() {
    return new Array(this.nbofEMP);
  }


  addEMP() {
    this.nbofEMP = this.nbofEMP + 1
  }

  get fullNameWithTitle(){
    let {firstName, middleName, surname, title} = this.viewClientForm.value;
    title = title ? title : '';
    firstName = firstName ? ` ${firstName}` : '';
    middleName = middleName ? ` ${middleName}` : '';
    surname = surname ? ` ${surname}` : '';

    return title + firstName + middleName + surname;
  }

  openStatusModal(){
    const status = this.viewClientForm.value.statusCd;
    const statusesList = this.clientStatusesList;

    this.utilityService.dialogOpener(
      ClientStatusComponent,
      {data: {status, statusesList}},
      (data) => this.viewClientForm.patchValue({ statusCd: data.status }),
      () => console.log("edit status modal cancelled")
    )
  }

  openClientModal(){
    this.utilityService.dialogOpener(
      EditClientComponent,
      {
        data: {
          viewClientForm: this.viewClientForm,
          clientDetailsForm: this.clientDetailsForm,
          TITLES: this.TITLES,
        }
      },
      (data) => {},
      () => console.log("edit client modal cancelled")
    )
  }

  updateClient(){
    return this.findClientService.updateClientInfo(this.viewClientForm.value.clientNo, this.viewClientForm.value)
      .subscribe(
        (res) => this.viewClientForm.patchValue(res),
        (err: HttpErrorResponse) => this.utilityService.info("Error updating Client info", 0)
      )
  }

  onUpdateClientInfo(fieldName){
    this.isUpdatingClient[fieldName] = true
    this.updateClient().add(() => this.isUpdatingClient[fieldName] = false)
  }
}
