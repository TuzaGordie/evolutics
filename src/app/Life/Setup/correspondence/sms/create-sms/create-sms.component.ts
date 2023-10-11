import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../../../../Services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateCorrespondence,
  Correspondence,
  CorrespondenceJoinTemplateList,
  CorrespondenceOutputFieldList,
  CorrespondenceDocLinkList,
  CorrespondenceFilterList,
} from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { TableService } from 'src/app/Services/table.service';
import { WorkflowService } from 'src/app/Services/life/workflow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/Services/utility.service';
import { TextAreaModalService } from 'src/app/Reusables/reusable-comps/text-area-modal/text-area-modal.service';
import { FormGroup, NgForm } from '@angular/forms';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
// import { CorrespondenceDocLinkList, CorrespondenceFilterList } from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';

@Component({
  selector: 'app-create-sms',
  templateUrl: './create-sms.component.html',
  styleUrls: ['./create-sms.component.scss'],
})
export class CreateCorrespondenceSMS
  extends PageTemplateComponent
  implements OnInit
{
  @ViewChild('f') form: NgForm;

  correspondence = new Correspondence();
  createCorrespondence = new CreateCorrespondence(
    this.correspondence,
  );

  categories: any = [];
  sendByCodes: any[] = [];
  filtersCodes: any = [];
  operatorCodes: any = [];
  connectors: any[] = [];
  connectorCodes: any = [];
  categoryCodes: any = [];
  statusCodes: any = [];
  connectorTypes: any = [];
  tableColumns: any = [];
  fieldTypes: any = [];
  workflowTaskCodes: any = [];
  docCategory: any = '';
  documentCodes: any = [];
  numberFormats: any[] = [];
  documentCode: any = '';
  tableNames: any = [];
  templateCodes: any = [];
  smsGateWays: any = [];

  loading = false;
  loadingText = '';

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false,
  };

  clone: any;
  update: any;

  tableGroups: any[] = [];
  tableGroup: string = '';

  constructor(
    public router: Router,
    private correspondenceService: CorrespondenceService,
    private documentService: DocumentService,
    private activatedRoute: ActivatedRoute,
    private tableService: TableService,
    private util: UtilityService,
    private workflowService: WorkflowService,
    private textareaMS: TextAreaModalService
  ) {
    super(activatedRoute, util);
  }

  ngOnInit(): void {
    this.correspondence.sendBy = 'S';
    this.getCategory();
    this.getTableGroups();
    this.getDocumentCodes();
    this.getCodeByCodeGroup();
    this.getFilterByCodeGroup();
    this.getOperatorByCodeGroup();
    this.getFieldTypeByCodeGroup();
    this.getConnectorByCodeGroup();
    this.getCategoryCodeByCodeGroup();
    this.getStatusCodesByCodeGroup();
    this.getConnectorTypeByCodeGroup();
    this.getWorkflowsTaskCode();
    this.getNumberFormatsCodes();
    this.getSmsGateway();

    // this.activatedRoute.queryParams.subscribe((params) => {
    //   var documentCode = params.code;
    //   var action = params.action;

    //   if (action != '' && documentCode != '') {
    //     this.fetchCorrespondence(action, documentCode);
    //   }
    // });
  } 
  ngAfterViewInit(): void {
    super.init(async () => {
      return this.code
        ? this.fetchCorrespondence(this.code).then((r) => {
            if (this.isShow) this.form.form.disable();
          })
        : null;
    });
  }
  fetchCorrespondence(documentCode: string) {
    return this.correspondenceService
      .getCorrespondenceByDocumentCode(documentCode)
      .toPromise()
      .then((data: CreateCorrespondence) => {
        this.createCorrespondence.correspondenceJoinTemplateList = [];
        this.createCorrespondence.correspondenceDocLinkList = [];
        this.createCorrespondence.correspondenceFilterList = [];
        this.createCorrespondence.correspondenceOutputFieldList = [];

        this.createCorrespondence.correspondence = data.correspondence;
        if (this.isClone) delete this.createCorrespondence.correspondence.code;

        data.correspondenceJoinTemplateList.map(
          (correspondenceJoinTemplateList, index) => {
            if (this.isClone) delete correspondenceJoinTemplateList.id;
            correspondenceJoinTemplateList.rowId = index;
            correspondenceJoinTemplateList.deleted = false;
            this.createCorrespondence.correspondenceJoinTemplateList.push(
              correspondenceJoinTemplateList
            );
          }
        );

        data.correspondenceDocLinkList.map(
          (correspondenceDocLinkList, index) => {
            if (this.isClone) delete correspondenceDocLinkList.id;
            correspondenceDocLinkList.rowId = index;
            correspondenceDocLinkList.deleted = false;
            this.createCorrespondence.correspondenceDocLinkList.push(
              correspondenceDocLinkList
            );
          }
        );

        data.correspondenceFilterList.map((correspondenceFilterList, index) => {
          if (this.isClone) delete correspondenceFilterList.id;
          correspondenceFilterList.rowId = index;
          correspondenceFilterList.deleted = false;
          this.createCorrespondence.correspondenceFilterList.push(
            correspondenceFilterList
          );
        });

        data.correspondenceOutputFieldList.map(
          (correspondenceOutputFieldList, index) => {
            if (this.isClone) delete correspondenceOutputFieldList.id;
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
        return data;
      });
  }

  openTextArea() {
    this.textareaMS
      .openTextAreaModal(
        'SMS Body',
        this.createCorrespondence.correspondence.smsBody
      )
      .afterClosed()
      .subscribe((r) => {
        this.createCorrespondence.correspondence.smsBody = r?.value;
      });
  }

  createCorrespondenceSms() {
    if (this.form.valid) {
      this.connection.creating = true;
debugger
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
              `Correspondence SMS ${data.correspondence.code} has been saved successfully!.`,
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
            this.util.info('An error occurred', 0);
          }
        );
    } else {
      this.util.info(
        'Failure creating Correspondence, check all required entries!.',
        0
      );

      return;
    }
  }

  getNumberFormatsCodes() {
    this.correspondenceService
      .getCodesByCodeSubGroup('NUMBER_FORMAT')
      .subscribe((data: any) => {
        this.numberFormats = data;
      });
  }

  getSmsGateway() {
    this.correspondenceService.getAllSmsGateways().subscribe((data: any) => {
      // debugger
      this.smsGateWays = data;
    });
  }

  getDocumentCodes() {
    this.correspondenceService.getDocumentCodes().subscribe((data: any) => {
      this.documentCodes = data;
    });
  }

  getPrimaryTable(): void {
    this.tableService
      .getPrimaryTableList(this.createCorrespondence.correspondence.tableGroup)
      .subscribe((data: any) => {
        this.tableNames = data;
      });
  }

  getTableGroups() {
    this.tableService.getTableGroupList().subscribe((data: any) => {
      this.tableGroups = data;
    });
  }

  getCategory() {
    this.connection.creating = true;

    this.documentService.getCategory().subscribe((data: any) => {
      this.categories = data;
      this.docCategory = this.categories[0].title;
      this.connection.creating = false;
    });
  }

  getCodeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('SEND_BY')
      .subscribe((data) => {
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

  addCorrespondenceDocLink() {
    let corr = new CorrespondenceDocLinkList();
    corr.rowId = this.createCorrespondence.correspondenceDocLinkList.length + 1;
    corr.deleted = false;
    this.createCorrespondence.correspondenceDocLinkList.push(corr);
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
                'Correspondence Document deleted Successfully.',
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

  onSelectPrimaryTable() {
    this.onSelectTable(
      this.createCorrespondence.correspondence.tableName,
      this.createCorrespondence.correspondence.tableGroup
    );
  }
  openaddFilterModal() {
    if (!this.isShow) ($('#addFilterModal') as any).modal('show');
  }
  onSelectTable(table1: any, table2: any) {
    this.getTableColumns(table1);
    this.correspondenceService
      .getCommonFields(table1, table2)
      .subscribe((data: any) => {
        this.connectors = data;
      });
  }
}
