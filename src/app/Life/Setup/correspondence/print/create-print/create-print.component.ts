import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/Services/document.service';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { TemplateService } from 'src/app/Services/life/template.service';
import { WorkflowService } from 'src/app/Services/life/workflow.service';
import { TableService } from 'src/app/Services/table.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import {
  CreateCorrespondence,
  Correspondence,
  CorrespondenceJoinTemplateList,
  CorrespondenceOutputFieldList,
  CorrespondenceDocLinkList,
  CorrespondenceFilterList,
} from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';

@Component({
  selector: 'app-create-print',
  templateUrl: './create-print.component.html',
  styleUrls: ['./create-print.component.scss'],
})
export class CreateCorrespondencePrint
  extends PageTemplateComponent
  implements OnInit
{
  @ViewChild('f') form: NgForm;

  loading = false;
  loadingText = '';

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
  );

  categories: any = [];
  sendByCodes: any = [];
  filtersCodes: any = [];
  operatorCodes: any = [];
  connectorCodes: any = [];
  categoryCodes: any = [];
  statusCodes: any = [];
  connectors: any[] = [];
  connectorTypes: any = [];
  tableColumns: any = [];
  fieldTypes: any = [];
  workflowTaskCodes: any = [];
  docCategory: any = '';
  documentCodes: any = [];
  documentCode: any = '';
  tableNames: any = [];
  templateCodes: any = [];
  documentCodeAndDescs: any[] = [];
  numberFormats: any[] = [];
  tableName: string = '';

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false,
  };

  tableGroups: any[] = [];
  tableGroup: string = '';

  constructor(
    private correspondenceService: CorrespondenceService,
    private documentService: DocumentService,
    private tableService: TableService,
    private workflowService: WorkflowService,
    private templateService: TemplateService,
    private util: UtilityService,
    public route: ActivatedRoute
  ) {
    super(route, util);
  }

  ngOnInit(): void {
    this.correspondence.sendBy = 'P';
    this.getNumberFormatsCodes();
    this.getCategory();
    this.getTemplateCodes();
    this.getDocumentCodes();
    this.getCodeByCodeGroup();
    this.getFieldTypeByCodeGroup();
    this.getFilterByCodeGroup();
    this.getOperatorByCodeGroup();
    this.getTableGroups();
    this.getCorrespondenceCodesAndDesc();
    this.getConnectorByCodeGroup();
    this.getCategoryCodeByCodeGroup();
    this.getStatusCodesByCodeGroup();
    this.getConnectorTypeByCodeGroup();
    this.getWorkflowsTaskCode();
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
        if (this.isClone) {
          this.createCorrespondence = r;
          delete this.createCorrespondence.correspondence.code;

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

          r.correspondenceFilterList.map(
            (correspondenceFilterList, index) => {
              correspondenceFilterList.rowId = index;
              correspondenceFilterList.deleted = false;
              this.createCorrespondence.correspondenceFilterList.push(
                correspondenceFilterList
              );
            }
          );

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

          localStorage.removeItem('clone');
        }

        if (this.isEdit || this.isShow) {
          this.createCorrespondence.correspondenceJoinTemplateList = [];
          this.createCorrespondence.correspondenceDocLinkList = [];
          this.createCorrespondence.correspondenceFilterList = [];
          this.createCorrespondence.correspondenceOutputFieldList = [];

          this.createCorrespondence.correspondence = r.correspondence;

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

          r.correspondenceFilterList.map(
            (correspondenceFilterList, index) => {
              correspondenceFilterList.rowId = index;
              correspondenceFilterList.deleted = false;
              this.createCorrespondence.correspondenceFilterList.push(
                correspondenceFilterList
              );
            }
          );

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

          localStorage.removeItem('update');
        }
        return r;
      });
  }
  createCorrespondencePrint() {
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

      this.correspondenceService
        .createNewCorrespondence(this.createCorrespondence)
        .subscribe(
          (data: CreateCorrespondence) => {
            this.connection.creating = false;
            this.util.info(
              `Correspondence Print ${data.correspondence.code} has been saved successfully!.`,
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

  getNumberFormatsCodes() {
    this.correspondenceService
      .getCodesByCodeSubGroup('NUMBER_FORMAT')
      .subscribe((data: any) => {
        this.numberFormats = data;
      });
  }

  getCorrespondenceCodesAndDesc() {
    this.correspondenceService
      .getDocumentCodeAndDesc()
      .subscribe((data: any) => {
        this.documentCodeAndDescs = data;
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

  getDocumentCodes() {
    this.correspondenceService.getDocumentCodes().subscribe((data: any) => {
      this.documentCodes = data;
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

  getCodeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('SEND_BY')
      .subscribe((data: any) => {
        this.sendByCodes = data;
      });
  }

  getTemplateCodes() {
    this.templateService
      .getTemplateCodeAndDescByTemplateCat('C')
      .subscribe((data: any) => {
        this.templateCodes = data;
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
    if (confirm('Do you want to delete this Correspondence Output?')) {
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
}
