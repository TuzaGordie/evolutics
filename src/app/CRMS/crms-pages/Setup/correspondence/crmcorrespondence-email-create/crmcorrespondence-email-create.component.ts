import {Component, OnInit} from '@angular/core';
import {
  CreateCorrespondence,
  Correspondence,
  CorrespondenceJoinTemplateList,
  CorrespondenceOutputFieldList,
  CorrespondenceDocLinkList,
  CorrespondenceFilterList
} from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';
import {DocumentService} from "src/app/Services/document.service";
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { TableService } from 'src/app/Services/table.service';
import { TemplateService } from 'src/app/Services/life/template.service';

@Component({
  selector: 'app-crmcorrespondence-email-create',
  templateUrl: './crmcorrespondence-email-create.component.html',
  styleUrls: ['./crmcorrespondence-email-create.component.scss']
})
export class CRMCorrespondenceEmailCreateComponent implements OnInit {

  private nbofFilter: number = 1;
  private nbofDocuments: number = 1;
  private nbofTemplates: number = 1;
  private nbofLabel: number = 1;

  correspondence = new Correspondence();
  correspondenceJoinTemplateList = new CorrespondenceJoinTemplateList();
  correspondenceOutputFieldList = new CorrespondenceOutputFieldList();
  correspondenceDocLinkList = new CorrespondenceDocLinkList();
  correspondenceFilterList = new CorrespondenceFilterList();
  createCorrespondence = new CreateCorrespondence(
    this.correspondence,
    [this.correspondenceJoinTemplateList],
    [this.correspondenceDocLinkList],
    [this.correspondenceFilterList],
    [this.correspondenceOutputFieldList]
  )

  categories: any = []
  sendByCodes: any = []
  categoryCodes: any = []
  statusCodes: any = []
  connectorTypes: any = []
  docCategory: any = ""
  documentCodes: any = []
  documentCode: any = ""
  tableNames: any = []
  templateCodes: any = []

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false
  };

  constructor(
    private correspondenceService: CorrespondenceService,
    private documentService: DocumentService,
    private tableService: TableService,
    private templateService: TemplateService
  ) {
  }


  ngOnInit(): void {
    this.createCorrespondence.correspondence.code = localStorage.getItem('correspondence_document_code_email');

    this.getCategory()
    this.getTableNames()
    this.getDocumentCodes()
    this.getTemplateCodes()
    this.getCodeByCodeGroup()
    this.getCategoryCodeByCodeGroup()
    this.getStatusCodesByCodeGroup()
  }

  createCorrespondenceEmail() {
    this.connection.creating = true;

    this.correspondenceService.createNewCorrespondence(this.createCorrespondence)
      .subscribe((data: any) => {
        this.connection.creating = false
        console.log(data);
        alert("Correspondence created successfully!")
      })
  }

  getTableNames() {
    this.tableService.getTableGroupList()
      .subscribe((data: any) => {
        this.tableNames = data
      })
  }

  getDocumentCodes() {
    this.correspondenceService.getDocumentCodes()
      .subscribe((data: any) => {
        this.documentCodes = data
      })
  }

  getTemplateCodes() {
    this.templateService.getTemplateCodeAndDescByTemplateCat("C")
      .subscribe((data: any) => {
        this.templateCodes = data
      })
  }

  getCodeByCodeGroup() {
    this.correspondenceService.getCodesByCodeSubGroup("SEND_BY")
      .subscribe((data: any) => {
        this.sendByCodes = data
      })
  }

  getCategoryCodeByCodeGroup() {
    this.correspondenceService.getCodesByCodeSubGroup("DOCUMENT_CATEGORY")
      .subscribe((data: any) => {
        this.categoryCodes = data
      })
  }

  getStatusCodesByCodeGroup() {
    this.correspondenceService.getCodesByCodeSubGroup("DOC_STATUS")
      .subscribe((data: any) => {
        this.statusCodes = data
      })
  }

  getConnectorTypeByCodeGroup() {
    this.correspondenceService.getCodesByCodeSubGroup("CONNECTOR_TYPE")
      .subscribe((data: any) => {
        this.connectorTypes = data
      })
  }

  addCorrespondenceJoinTemplate() {
    let corr = new CorrespondenceJoinTemplateList();
    corr.id = this.createCorrespondence.correspondenceJoinTemplateList.length + 1
    this.createCorrespondence.correspondenceJoinTemplateList.push(corr);
  }

  addCorrespondenceOutputField() {
    let corr = new CorrespondenceOutputFieldList();
    corr.id = this.createCorrespondence.correspondenceOutputFieldList.length + 1
    this.createCorrespondence.correspondenceOutputFieldList.push(corr);
  }

  removeCorrespondenceOutputField(i: number) {
    this.createCorrespondence.correspondenceOutputFieldList.splice(i, 1);
  }

  removeCorrespondenceJoinTemplate(i: number) {
    this.createCorrespondence.correspondenceJoinTemplateList.splice(i, 1);
  }

  getCategory() {
    this.connection.creating = true;

    this.documentService.getCategory().subscribe((data: any) => {
      this.categories = data;
      this.docCategory = this.categories[0].title;
      this.connection.creating = false;
    })
  }

  filterCounter() {
    return new Array(this.nbofFilter);
  }

  filterInc() {
    this.nbofFilter = this.nbofFilter + 1
  }

  documentsLinkedCounter() {
    return new Array(this.nbofDocuments);
  }

  documentsLinkedInc() {
    this.nbofDocuments = this.nbofDocuments + 1
  }

  templateCounter() {
    return new Array(this.nbofTemplates);
  }

  templateInc() {
    this.nbofTemplates = this.nbofTemplates + 1
  }

  templateDec() {
    this.nbofTemplates = this.nbofTemplates - 1
    if (this.nbofTemplates <= 0) {
      this.nbofTemplates = 1
    }
  }


  labelCounter() {
    return new Array(this.nbofLabel);
  }

  labelInc() {
    this.nbofLabel = this.nbofLabel + 1
  }

  labelDec() {
    this.nbofLabel = this.nbofLabel - 1
    if (this.nbofLabel <= 0) {
      this.nbofLabel = 1
    }
  }
}
