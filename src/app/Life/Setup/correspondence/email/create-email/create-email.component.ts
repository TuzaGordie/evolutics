import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../../../../Services/document.service';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import {
  CreateCorrespondence,
  Correspondence,
  CorrespondenceJoinTemplateList,
  CorrespondenceOutputFieldList,
  CorrespondenceDocLinkList,
  CorrespondenceFilterList,
  CorrespondenceTemplate,
} from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';
import { TableService } from 'src/app/Services/table.service';
import { WorkflowService } from 'src/app/Services/life/workflow.service';
import { TemplateService } from 'src/app/Services/life/template.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/Services/utility.service';
import { TextAreaModalService } from 'src/app/Reusables/reusable-comps/text-area-modal/text-area-modal.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CodeService } from 'src/app/Services/code.service';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss'],
})
export class CreateCorrespondenceEmail
  extends PageTemplateComponent
  implements OnInit
{
  @ViewChild('f') form: NgForm;

  loading = false;
  loadingText = '';
 
  correspondenceJoinTemplateList = new CorrespondenceJoinTemplateList();
  correspondenceOutputFieldList = new CorrespondenceOutputFieldList();
  correspondenceDocLinkList = new CorrespondenceDocLinkList();
  correspondenceFilterList = new CorrespondenceFilterList();
  createCorrespondence = new CreateCorrespondence(
    
  );

  categories: any = [];
  categoryCodes: any = [];
  connectorCodes: any = [];
  connectors: any[] = [];
  connectorTypes: any = []; 
  disableSubject = false;
  docCategory: any = '';
  documentCode: any = '';
  documentCodeAndDescs: any[] = [];
  documentCodes: any = [];
  emailGateways: any[] = [];
  emailTemplateBodyCodes: any[] = [];
  errorMessage = false;
  fieldTypes: any = [];
  filtersCodes: any = [];
  idsAndEmails: any[] = [];
  numberFormats: any[] = [];
  operatorCodes: any = [];
  sendByCodes: any = [];
  statusCodes: any = [];
  successMessage = false;
  tableColumns: any = [];
  tableGroup: string = '';
  tableGroups: any[] = [];
  tableName: string = '';
  tableNames: any[] = [];
  templateCodes: any = [];
  warningMessage = false;
  workflowTaskCodes: any = [];

  connection = {
    creating: false,
    error: false,
  };

  constructor(
    public correspondenceService: CorrespondenceService,
    public codeService: CodeService,
    private documentService: DocumentService,
    private tableService: TableService,
    private workflowService: WorkflowService,
    public templateService: TemplateService,
    private companyService: CompanyService,
    private util: UtilityService,
    private textareaMS: TextAreaModalService,
    public route: ActivatedRoute
  ) {
    super(route, util);
  }

  ngOnInit(): void {
    this.createCorrespondence.correspondence.sendBy = 'E';
    this.getCategory();
    this.getTemplateCodes();
    this.getTableGroups();
    this.getDocumentCodes();
    this.getCodeByCodeGroup();
    this.getFilterByCodeGroup();
    this.getOperatorByCodeGroup();
    this.getConnectorByCodeGroup();
    this.getCategoryCodeByCodeGroup();
    this.getNumberFormatsCodes();
    this.getStatusCodesByCodeGroup();
    this.getConnectorTypeByCodeGroup();
    this.getWorkflowsTaskCode();
    this.getEmailTemplateBody();
    this.getFieldTypeByCodeGroup();
    this.getCorrespondenceCodesAndDesc();
    this.getGatewayEmailIdAndSenderEmail();
  }
  ngAfterViewInit() {
    super.init(async () => {
      return this.code
        ? this.fetchCor().then((r) => {
            if (this.isShow) this.form.form.disable();
            setTimeout(() => {
              if (this.isShow) this.form.form.disable();
            }, 1000);
          })
        : null;
    });
  }
  fetchCor() {
    return this.correspondenceService
      .getCorrespondenceByDocumentCode(this.code)
      .toPromise()
      .then((r) => {
        this.createCorrespondence.correspondenceTemplates=r.correspondenceTemplates
        if (this.isClone) {
          this.createCorrespondence = r;
          delete this.createCorrespondence.correspondence.code;
          delete this.createCorrespondence.correspondence.id;

          this.createCorrespondence.correspondenceJoinTemplateList.map(
            (correspondenceJoinTemplateList, index) => {
              correspondenceJoinTemplateList.rowId = index;
              correspondenceJoinTemplateList.deleted = false;
              this.createCorrespondence.correspondenceJoinTemplateList.push(
                correspondenceJoinTemplateList
              );
            }
          );

          this.createCorrespondence.correspondenceDocLinkList.map(
            (correspondenceDocLinkList, index) => {
              correspondenceDocLinkList.rowId = index;
              correspondenceDocLinkList.deleted = false;
              this.createCorrespondence.correspondenceDocLinkList.push(
                correspondenceDocLinkList
              );
            }
          );

          this.createCorrespondence.correspondenceFilterList.map(
            (correspondenceFilterList, index) => {
              correspondenceFilterList.rowId = index;
              correspondenceFilterList.deleted = false;
              this.createCorrespondence.correspondenceFilterList.push(
                correspondenceFilterList
              );
            }
          );

          this.createCorrespondence.correspondenceOutputFieldList.map(
            (correspondenceOutputFieldList, index) => {
              correspondenceOutputFieldList.rowId = index;
              correspondenceOutputFieldList.deleted = false;
              this.createCorrespondence.correspondenceOutputFieldList.push(
                correspondenceOutputFieldList
              );
            }
          );

          this.getPrimaryTable();
          this.onSelectTable(
            this.createCorrespondence.correspondence.tableName,
            this.createCorrespondence.correspondence.tableGroup
          );
        }

        if (this.isEdit || this.isShow) {
          this.createCorrespondence.correspondenceJoinTemplateList = [];
          this.createCorrespondence.correspondenceDocLinkList = [];
          this.createCorrespondence.correspondenceFilterList = [];
          this.createCorrespondence.correspondenceOutputFieldList = [];

          this.createCorrespondence.correspondence = r?.correspondence;

          r.correspondenceJoinTemplateList.map(
            (correspondenceJoinTemplateList, index) => {
              correspondenceJoinTemplateList.rowId = index;
              correspondenceJoinTemplateList.deleted = false;
              this.createCorrespondence.correspondenceJoinTemplateList.push(
                correspondenceJoinTemplateList
              );
            }
          );

          r.correspondenceDocLinkList.map(
            (correspondenceDocLinkList, index) => {
              correspondenceDocLinkList.rowId = index;
              correspondenceDocLinkList.deleted = false;
              this.createCorrespondence.correspondenceDocLinkList.push(
                correspondenceDocLinkList
              );
            }
          );

          r.correspondenceFilterList.map((correspondenceFilterList, index) => {
            correspondenceFilterList.rowId = index;
            correspondenceFilterList.deleted = false;
            this.createCorrespondence.correspondenceFilterList.push(
              correspondenceFilterList
            );
          });

          r.correspondenceOutputFieldList.map(
            (correspondenceOutputFieldList, index) => {
              correspondenceOutputFieldList.rowId = index;
              correspondenceOutputFieldList.deleted = false;
              this.createCorrespondence.correspondenceOutputFieldList.push(
                correspondenceOutputFieldList
              );
            }
          );

          this.getPrimaryTable();
          this.onSelectTable(
            this.createCorrespondence.correspondence.tableName,
            this.createCorrespondence.correspondence.tableGroup
          );
        }
        return r;
      });
  }
  openTextArea() {
    if (!this.createCorrespondence.correspondence.emailBodyTemplate)
      this.textareaMS
        .openTextAreaModal(
          'Email Body',
          this.createCorrespondence.correspondence.emailBody
        )
        .afterClosed()
        .subscribe((r) => {
          this.createCorrespondence.correspondence.emailBody = r?.value;
        });
  }

  createCorrespondenceEmail() {
    if (this.form.valid) {
      this.connection.creating = true;

      if (
        this.createCorrespondence.correspondence.code == undefined ||
        this.createCorrespondence.correspondence.code == null ||
        this.createCorrespondence.correspondence.code == ''
      ) {
        this.createCorrespondence.correspondenceDocLinkList.map(
          (corr: CorrespondenceDocLinkList, index: number) => {
            delete corr.id;
          }
        );

        this.createCorrespondence.correspondenceFilterList.map(
          (corr: CorrespondenceFilterList, index: number) => {
            delete corr.id;
          }
        );

        this.createCorrespondence.correspondenceJoinTemplateList.map(
          (corr: CorrespondenceJoinTemplateList, index: number) => {
            delete corr.id;
          }
        );

        this.createCorrespondence.correspondenceOutputFieldList.map(
          (corr: CorrespondenceOutputFieldList, index: number) => {
            delete corr.id;
          }
        );
      }

      this.loadingText = 'Processing........';
      this.loading = true;

      this.correspondenceService
        .createNewCorrespondence(this.createCorrespondence)
        .subscribe(
          (data: CreateCorrespondence) => {
            this.loading = false;
            this.util.info(
              `Correspondence Email ${data.correspondence.code} has been saved successfully!.`,
              1
            );

            this.createCorrespondence.correspondenceJoinTemplateList = [];
            this.createCorrespondence.correspondenceDocLinkList = [];
            this.createCorrespondence.correspondenceFilterList = [];
            this.createCorrespondence.correspondenceOutputFieldList = [];

            this.createCorrespondence.correspondence = data.correspondence;

            data.correspondenceJoinTemplateList.map(
              (correspondenceJoinTemplateList, index) => {
                correspondenceJoinTemplateList.rowId = index;
                correspondenceJoinTemplateList.deleted = false;
                this.createCorrespondence.correspondenceJoinTemplateList.push(
                  correspondenceJoinTemplateList
                );
              }
            );

            data.correspondenceDocLinkList.map(
              (correspondenceDocLinkList, index) => {
                correspondenceDocLinkList.rowId = index;
                correspondenceDocLinkList.deleted = false;
                this.createCorrespondence.correspondenceDocLinkList.push(
                  correspondenceDocLinkList
                );
              }
            );

            data.correspondenceFilterList.map(
              (correspondenceFilterList, index) => {
                correspondenceFilterList.rowId = index;
                correspondenceFilterList.deleted = false;
                this.createCorrespondence.correspondenceFilterList.push(
                  correspondenceFilterList
                );
              }
            );

            data.correspondenceOutputFieldList.map(
              (correspondenceOutputFieldList, index) => {
                correspondenceOutputFieldList.rowId = index;
                correspondenceOutputFieldList.deleted = false;
                this.createCorrespondence.correspondenceOutputFieldList.push(
                  correspondenceOutputFieldList
                );
              }
            );

            this.getPrimaryTable();
            this.onSelectTable(
              this.createCorrespondence.correspondence.tableName,
              this.createCorrespondence.correspondence.tableGroup
            );
          },
          () => {
            this.loading = false;
            this.util.info('Internal server error', 0);
          }
        );
    } else {
      this.util.notify(
        'Failure creating Correspondence, check all required entries!.',
        0
      );
    }
  }
  getPrimaryTable() {
    return this.tableService
      .getPrimaryTableList(this.createCorrespondence.correspondence.tableGroup)
      .pipe(
        tap((data: any) => {
          this.tableNames = data;
        })
      )
      .toPromise();
  }

  getCorrespondenceCodesAndDesc() {
    this.correspondenceService
      .getDocumentCodeAndDesc()
      .subscribe((data: any) => {
        this.documentCodeAndDescs = data;
      });
  }

  getGatewayEmailIdAndSenderEmail() {
    this.correspondenceService
      .getGatewayEmailIdAndSenderEmail('OUT')
      .subscribe((data: any) => {
        this.emailGateways = data;
      });
  }

  getEmailTemplateBody() {
    this.templateService
      .getTemplateCodeAndDescByTemplateCat('C')
      .subscribe((data: any) => {
        this.emailTemplateBodyCodes = data;
      });
  }

  getTemplateCodes() {
    this.templateService
      .getTemplateCodeAndDescByTemplateCat('C')
      .subscribe((data: any) => {
        this.templateCodes = data;
      });
  }

  getTableGroups() {
    this.tableService.getTableGroupList().subscribe((data: any) => {
      this.tableGroups = data;
    });
  }

  getDocumentCodes() {
    this.correspondenceService.getDocumentCodes().subscribe((data: any) => {
      this.documentCodes = data;
    });
  }

  addCorrespondenceDocLink(i: number) {
    let corr = new CorrespondenceDocLinkList();
    corr.rowId = this.createCorrespondence.correspondenceDocLinkList.length + 1;
    corr.deleted = false;
    this.createCorrespondence.correspondenceDocLinkList.splice(i, 0, corr);
  }

  removeCorrespondenceDocLink(i: number) {
    if (confirm('Do you want to delete this Correspondence Document?')) {
      if (this.createCorrespondence.correspondenceDocLinkList[i].id != null) {
        this.correspondenceService
          .deleteDocLink(
            this.createCorrespondence.correspondenceDocLinkList[i].id
          )
          .subscribe(
            (data: any) => {
              this.createCorrespondence.correspondenceDocLinkList.splice(i, 1);
              4;
              this.util.notify(
                'Correspondence Document deleted suceesfully.',
                1
              );
            },
            () => {
              this.util.notify('Unable to delete.', 0);
            }
          );
        return;
      }
      this.createCorrespondence.correspondenceDocLinkList.splice(i, 1);
      4;
    }
  }

  addCorrespondenceFilter() {
    let corr = new CorrespondenceFilterList();
    corr.rowId = this.createCorrespondence.correspondenceFilterList.length + 1;
    corr.deleted = false;
    this.createCorrespondence.correspondenceFilterList.push(corr);
  }

  removeCorrespondenceFilter(i: number) {
    if (confirm('Do you want to delete this Correspondence Filter?')) {
      if (this.createCorrespondence.correspondenceFilterList[i].id != null) {
        this.correspondenceService
          .deleteFilter(
            this.createCorrespondence.correspondenceFilterList[i].id
          )
          .subscribe(
            (data: any) => {
              this.createCorrespondence.correspondenceFilterList.splice(i, 1);
              4;
              this.util.notify(
                'Correspondence Document deleted suceesfully.',
                1
              );
            },
            () => {
              this.util.notify('Unable to delete.', 0);
            }
          );
        return;
      }
      this.createCorrespondence.correspondenceFilterList.splice(i, 1);
      4;
    }
  }

  getCodeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('SEND_BY')
      .subscribe((data: any) => {
        this.sendByCodes = data;
      });
  }

  getFilterByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('CORRESPONDENCE_FILTER')
      .subscribe((data: any) => {
        this.filtersCodes = data;
      });
  }

  getOperatorByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('OPERATOR')
      .subscribe((data: any) => {
        this.operatorCodes = data;
      });
  }

  getConnectorByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('SEL_AND_OR')
      .subscribe((data: any) => {
        this.connectorCodes = data;
      });
  }

  getCategoryCodeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('DOCUMENT_CATEGORY')
      .subscribe((data: any) => {
        this.categoryCodes = data;
      });
  }

  getNumberFormatsCodes() {
    this.correspondenceService
      .getCodesByCodeSubGroup('NUMBER_FORMAT')
      .subscribe((data: any) => {
        this.numberFormats = data;
      });
  }

  getStatusCodesByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('DOC_STATUS')
      .subscribe((data: any) => {
        this.statusCodes = data;
      });
  }

  getConnectorTypeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('CONNECTOR_TYPE')
      .subscribe((data: any) => {
        this.connectorTypes = data;
      });
  }

  getTableColumns(tableName: string) {
    this.tableService.getTableColumn(tableName).subscribe((data: any) => {
      this.tableColumns = data;
    });
  }

  getFieldTypeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('FIELD_TYPE')
      .subscribe((data: any) => {
        this.fieldTypes = data;
      });
  }

  getWorkflowsTaskCode() {
    this.workflowService.getWorkflowTaskCode().subscribe((data: any) => {
      this.workflowTaskCodes = data;
    });
  }

  getIdAndEmails() {
    this.companyService.getCompanyidAndSenderEmail().subscribe((data: any) => {
      this.idsAndEmails = data;
    });
  }

  addCorrespondenceJoinTemplate() {
    let corr = new CorrespondenceJoinTemplateList();
    corr.rowId =
      this.createCorrespondence.correspondenceJoinTemplateList.length + 1;
    corr.deleted = false;
    this.createCorrespondence.correspondenceJoinTemplateList.push(corr);
  }

  addCorrespondenceOutputField() {
    let corr = new CorrespondenceOutputFieldList();
    corr.rowId =
      this.createCorrespondence.correspondenceOutputFieldList.length + 1;
    corr.deleted = false;
    this.createCorrespondence.correspondenceOutputFieldList.push(corr);
  }

  removeCorrespondenceOutputField(i: number) {
    if (confirm('Do you want to delete this Correspondence Output field?')) {
      if (
        this.createCorrespondence.correspondenceOutputFieldList[i].id != null
      ) {
        this.correspondenceService
          .deleteOutputField(
            this.createCorrespondence.correspondenceOutputFieldList[i].id
          )
          .subscribe(
            (data: any) => {
              this.createCorrespondence.correspondenceOutputFieldList.splice(
                i,
                1
              );
              4;
              this.util.notify(
                'Correspondence Document deleted suceesfully.',
                1
              );
            },
            () => {
              this.util.notify('Unable to delete.', 0);
            }
          );
        return;
      }
      this.createCorrespondence.correspondenceOutputFieldList.splice(i, 1);
      4;
    }
  }

  removeCorrespondenceJoinTemplate(i: number) {
    if (confirm('Do you want to delete this Correspondence Join Template?')) {
      if (
        this.createCorrespondence.correspondenceJoinTemplateList[i].id != null
      ) {
        this.correspondenceService
          .deleteJoinTemplate(
            this.createCorrespondence.correspondenceJoinTemplateList[i].id
          )
          .subscribe(
            (data: any) => {
              this.createCorrespondence.correspondenceJoinTemplateList.splice(
                i,
                1
              );
              4;
              this.util.notify(
                'Correspondence Document deleted suceesfully.',
                1
              );
            },
            () => {
              this.util.notify('Unable to delete.', 0);
            }
          );
        return;
      }
      this.createCorrespondence.correspondenceJoinTemplateList.splice(i, 1);
      4;
    }
  }

  getCategory() {
    this.connection.creating = true;

    this.documentService.getCategory().subscribe((data: any) => {
      this.categories = data;
      this.docCategory = this.categories[0].title;
      this.connection.creating = false;
    });
  }

  onSelectPrimaryTable() {
    this.onSelectTable(
      this.createCorrespondence.correspondence.tableName,
      this.createCorrespondence.correspondence.tableGroup
    );
  }

  onSelectTable(table1: any, table2: any) {
    this.getTableColumns(table1);
    this.correspondenceService
      .getCommonFields(table1, table2)
      .subscribe((data: any) => {
        this.connectors = data;
      });
  }

  cleanBodyTemplate() {
    if (
      !(
        this.createCorrespondence.correspondence.emailBody == null ||
        this.createCorrespondence.correspondence.emailBody == ''
      )
    ) {
      this.createCorrespondence.correspondence.emailBodyTemplate = '';
    }
  }

  subjectChange() {
    if (this.createCorrespondence.correspondence.emailSubject.length > 0) {
      this.disableSubject = true;
    } else this.disableSubject = false;
  }
 
}
