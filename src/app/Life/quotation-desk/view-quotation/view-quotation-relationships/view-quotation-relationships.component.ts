import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import { AppService } from 'src/app/Services/app.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { BeneficiaryComponent } from '../../create-new-individual-quotation/sections/beneficiary/beneficiary.component';

@Component({
  selector: 'app-view-quotation-relationships',
  templateUrl: './view-quotation-relationships.component.html',
  styleUrls: ['./view-quotation-relationships.component.scss']
})
export class ViewQuotationRelationshipsComponent implements OnInit {
  @ViewChild('beneficiarySection', { static: true })
  beneficiarySection: BeneficiaryComponent;
  isCreatingClientsQuotation: boolean;
  queryParams: any;
  productInfo: { policyNo: any; quoteNo: any; policyCode: any; clientNo: any; productCode: any; policyID: any; owner: any; };

  constructor(private appS: AppService, private uS: UtilityService, private route: ActivatedRoute, private qS: QuotationService) { }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParamMap
    this.productInfo = {
      policyNo: this.queryParams.get('policyNo'),
      quoteNo: this.queryParams.get('quoteNo'),
      policyCode: this.queryParams.get('policyCode'),
      clientNo: this.queryParams.get('clientNo'),
      productCode: this.queryParams.get('pcd'),
      policyID: this.queryParams.get('policyID'),
      owner: this.queryParams.get('owner')
    }

    console.log(this.productInfo)
  }

  async submitBeneficiaryInfo() {
    this.isCreatingClientsQuotation = true;
    let relClients = [];
    let mydate = new Date(Date.now());
    const todate = formatDate(mydate, 'YYYY-MM-dd', 'en');
    relClients.push({
      busLine: this.appS.getCurrentSystemMetadata.busline,
      codeTitle: null,
      enroleeNo: null,
      enroleeNoSuffix: null,
      groupNo: null,
      id: null,
      policyCode: this.productInfo.policyCode,
      policyGroupId: null,
      policyId: this.productInfo.policyID,
      policyNo: this.productInfo.policyNo,
      policyNoSuffix: null,
      quoteNo: this.productInfo.quoteNo,
      relClient: this.productInfo.owner,
      relDate: todate,
      type: 'S',
    });
    this.beneficiarySection.formValue.beneficiaries.forEach(
      (beneficiary, index) => {
        if (
          beneficiary.clientNo !=
          this.productInfo.owner
        ) {
          relClients.push({
            busLine: this.appS.getCurrentSystemMetadata.busline,
            codeTitle: null,
            enroleeNo: null,
            enroleeNoSuffix: null,
            groupNo: null,
            id: null,
            policyCode: this.productInfo.policyCode,
            policyGroupId: null,
            policyId: this.productInfo.policyID,
            policyNo: this.productInfo.policyNo,
            policyNoSuffix: null,
            quoteNo: this.productInfo.quoteNo,
            relClient: beneficiary.clientNo,
            relDate: todate,
            type: beneficiary.relationship,
          });
        }
      }
    );
    let legGuard = this.beneficiarySection.formValue.legalGuardian;
    if (
      legGuard.clientNo !=
      this.productInfo.owner
    ) {
      relClients.push({
        busLine: this.appS.getCurrentSystemMetadata.busline,
        codeTitle: null,
        enroleeNo: null,
        enroleeNoSuffix: null,
        groupNo: null,
        id: null,
        policyCode: this.productInfo.policyCode,
        policyGroupId: null,
        policyId: this.productInfo.policyID,
        policyNo: this.productInfo.policyNo,
        policyNoSuffix: null,
        quoteNo: this.productInfo.quoteNo,
        relClient: legGuard.clientNo,
        relDate: todate,
        type: legGuard.relationship,
      });
    }
    let nok = this.beneficiarySection.formValue.nextOfKin;
    if (
      nok.clientNo !=
      this.productInfo.owner
    ) {
      relClients.push({
        busLine: this.appS.getCurrentSystemMetadata.busline,
        codeTitle: null,
        enroleeNo: null,
        enroleeNoSuffix: null,
        groupNo: null,
        id: null,
        policyCode: this.productInfo.policyCode,
        policyGroupId: null,
        policyId: this.productInfo.policyID,
        policyNo: this.productInfo.policyNo,
        policyNoSuffix: null,
        quoteNo: this.productInfo.quoteNo,
        relClient: nok.clientNo,
        relDate: todate,
        type: nok.relationship,
      });
    }
    const clientData = this.qS
      .submitIndividualClientsInfo(relClients)
      .toPromise();
    await clientData
      .then(() => {
        this.uS.notify('Submitted Beneficiary Details successfully', 1);
      })
      .catch(() => {
        this.uS.notify('There was an error in clients submission', 0);
      })
      .finally(() => {
        this.isCreatingClientsQuotation = false;
      });
  }
  

}
