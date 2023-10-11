import { Component, OnInit } from '@angular/core';
import { ReportEndpointService } from 'src/app/Life/Report/report-extras/find-report.service';
import { CodeService } from 'src/app/Services/code.service';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-generate-docs-modal',
  templateUrl: './generate-docs-modal.component.html',
  styleUrls: ['./generate-docs-modal.component.scss'],
})
export class GenerateDocsModalComponent implements OnInit {
  documentType: string;
  referenceCategory: string;
  referenceNumber: string;

  query: any; // request payload for generating document

  tableGroups: any[];
  documentTypes: any[];
  referenceCategories: any[];

  isLoadingTableGroups: boolean = false;
  isLoadingDocumentTypes: boolean = false;
  isLoadingReferenceCategories: boolean = false;
  isGeneratingDocument: boolean = false;

  constructor(
    private documentsService: DocumentService,
    private codeService: CodeService,
    private utilityService: UtilityService,
    private reportsService: ReportEndpointService,
  ) {}

  ngOnInit(): void {
    this.getTableGroups();
    this.getReferenceCategories();
  }

  getTableGroups() {
    this.isLoadingTableGroups = true;
    this.reportsService
      .getTableGroupList()
      .subscribe((res) => (this.tableGroups = res))
      .add(() => (this.isLoadingTableGroups = false));
  }

  getReferenceCategories() {
    this.isLoadingReferenceCategories = true;
    this.codeService
      .getCodesByCodeSubGroup('REF_CATEGORY')
      .subscribe((res) => (this.referenceCategories = res))
      .add(() => (this.isLoadingReferenceCategories = false));
  }

  onTableGroupChange(event) {
    this.getDocumentTypesByTableGroup(event.target.value);
  }

  getDocumentTypesByTableGroup(tableGroup) {
    this.isLoadingDocumentTypes = true;
    this.documentsService
      .getDocumentTypesByTableGroup(tableGroup)
      .subscribe((res) => (this.documentTypes = res))
      .add(() => (this.isLoadingDocumentTypes = false));
  }

  onRefCatChange(){
    this.query = { documentCode: this.documentType };
    switch (this.referenceCategory) {
      case 'CLI':
        this.query.clientNo = this.referenceNumber;
        break;
      case 'AGT':
        this.query.agentNo = this.referenceNumber;
        break;
      case 'POL':
        this.query.policyNo = this.referenceNumber;
        break;
      case 'PRO':
        this.query.providerNo = this.referenceNumber;
        break;
      case 'ENR':
        this.query.enroleeNo = this.referenceNumber;
        break;
      default:
        this.utilityService.info(
          'This reference Category is not supported. Choose another',
          0
        );
        this.referenceCategory = ''
        return;
    }
  }

  generateDocument() {
    this.isGeneratingDocument = true;
    this.documentsService
      .generateDocument(this.query)
      .subscribe(
        (res) => this.utilityService.info('Document generated successfully!'),
        (err) =>
          this.utilityService.info(
            'Error generating the document: ' + err.error?.message,
            0
          )
      )
      .add(() => (this.isGeneratingDocument = false));
  }
}
