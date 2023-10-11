import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { UwrtReqIndexService } from '../underwriting-requirements-index/uwrt-index.service';
import { UnderwritingReqService } from './underwriting-req.service';
import { UwrtRequirement } from './uwrt-req.interface';

@Component({
  selector: 'app-underwriting-requirements-create',
  templateUrl: './underwriting-requirements-create.component.html',
  styleUrls: ['./underwriting-requirements-create.component.scss']
})
export class UnderwritingRequirementsCreateComponent implements OnInit {

  @ViewChild('requirementForm') form: NgForm
  constructor(
    private uwrtReqIndex: UwrtReqIndexService,
    private route: ActivatedRoute,
    private underwritingReqService: UnderwritingReqService,
    private util: UtilityService,
    private localStorage: StorageService,
    private router: Router,
  ) { }
  public companyArray: any[] = []
  public companyValue: string
  public reqTypeArray: any[] = []

  public reqTypeValue: string
  public reqCodeValue: string
  public descriptionValue: string
  public id: string

  editMode = true;
  showEditButton = false;

  isClone: boolean
  ngOnInit(): void {
    this.underwritingReqService.getCompanyCodeAndDescription()
      .subscribe(
        ((res: []) => {
          this.companyArray = res
        })
      )

    this.underwritingReqService.getCodesByCodeSubGroup("REQ_TYPE")
      .subscribe(
        ((res: []) => {
          this.reqTypeArray = res
        })
      )

    this.route.queryParams
      .subscribe(
        params => {
          const { action, reqTypeValue, companyValue, requirementValue } = params
          if (action != null && reqTypeValue != null && companyValue != null && requirementValue != null) {
            this.editMode = false; // if show or clone disable all fields until edit button is clicked
            this.showEditButton = true;
            this.fetchRequirement(action, reqTypeValue, companyValue, requirementValue)
          }
        }
      )

  }

  fetchRequirement(action: string, reqTypeValue: string, companyValue: string, requirementValue: string) {
    this.uwrtReqIndex.getUwrReqByReqCodeAndCompanyCodeAndReqType(
      requirementValue,
      companyValue,
      reqTypeValue)
      .subscribe((data: any) => {
        this.id = action == "clone" ? null : data.id
        this.reqTypeValue = data.type
        this.companyValue = data.companyCode
        this.reqCodeValue = action == "clone" ? "" : data.code
        this.descriptionValue = data.description
      }, () => {

      })
  }


  submitRequiremnt() {
    let uwrtReq: UwrtRequirement = this.form.value
    if (this.form.invalid) {
      alert("This form is not valid")
      return
    }


    uwrtReq = { ...uwrtReq, id: this.id }



    this.underwritingReqService.createUnderWritingReq(uwrtReq)
      .subscribe((data: any) => {
        this.id = data.id
        this.reqTypeValue = data.type
        this.companyValue = data.companyCode
        this.reqCodeValue = data.code
        this.descriptionValue = data.description
        this.util.info(`Process ${data.code} has been created successfully.`, 1).then(
          () => this.switchToShowMode(data)
        )
      }),
      () => {
        this.util.info("Error, Please try again later!")
      }
  }

  switchToShowMode({ type, companyCode, code }) {
    const queryParams = `?action=show&reqTypeValue=${type}&companyValue=${companyCode}&requirementValue=${code}`
    window.location.search = queryParams;
  }
}
