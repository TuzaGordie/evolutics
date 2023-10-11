import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';
import {
  Btn,
  EPageType,
  FCInput,
  IBtn,
  ICodeTitle,
  InputType,
} from 'src/app/Shared/models/index.model';
import {
  IReportForm,
  IFieldNameKVP,
  EReportFormat,
  IReportOutput,
} from '../../report-extras/report.model';
import { ReportEndpointService } from '../../report-extras/find-report.service';
import { ReportSaveTypeComponent } from './report-save-type/report-save-type.component';
import { ReportService } from '../../report-extras/report.service';
import { ActivatedRoute } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { PageService } from 'src/app/Services/page.service';
import { InputBasicComponent } from 'src/app/Shared/components/input/input-basic.component';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { UtilityService } from 'src/app/Services/utility.service';
import { clone } from 'lodash-es';

@Component({
  selector: 'app-life-report-create',
  templateUrl: './life-report-create.component.html',
  styleUrls: ['./life-report-create.component.scss'],
})
export class LifeReportCreateComponent
  extends PageTemplateComponent
  implements OnInit
{
  nbofCriteria: number = 1;
  nbofSort: number = 1;
  nbofOutput: number = 1;
  nbofTable: number = 1;
  nbofCreator: number = 1;

  reportFormData: IReportForm;
  filterOperators = [];
  filterConnectors: ICodeTitle[];
  sortBys: ICodeTitle[];

  form: FormGroup;
  loading: boolean;
  fieldTypes: ICodeTitle[];
  code: any;
  summary: any;
  outputFieldFormats: ICodeTitle[];
  userGroups = [];
  fieldNames: IFieldNameKVP[];
  constructor(
    public frS: ReportEndpointService,
    public route: ActivatedRoute,
    public uS: UtilityService
  ) {
    super(route, uS);
  }

  async ngOnInit() {
    this.createForm();
    this.frS.getCodes('FIELD_TYPE').subscribe((r) => {
      this.fieldTypes = r;
    });
    this.code = this.code || this.route.snapshot.queryParams.code;
    this.summary = this.route.snapshot.queryParams.summary;
    const format = this.route.snapshot.queryParams.format;
    if (this.code) {
      this.loading = true;
      await this.frS
        .getReport(this.code)
        .toPromise()
        .then((r) => {
          console.log('REPORT', r);
          if (r) {
            this.reportFormData = r;
            console.log('REPORT FORM DATA ' + this.reportFormData);
            // debugger
            if (this.isShow) {
              this.form.disable();
              this.outputs.disable();
              this.filters.disable();
            } else if (this.isClone) {
              delete r.code;
              delete r.id;
              delete r.generateReport;
              r.filters.forEach((x) => {
                delete x.id;
              });
              r.joiningTables.forEach((x) => {
                delete x.id;
              });
              r.outputs.forEach((x) => {
                delete x.id;
              });
              r.sorts.forEach((x) => {
                delete x.id;
              });
            }
            r.outputs?.forEach((x) => {
              this.addNewOutputsRow(x);
            });
            r.filters?.forEach((x) => {
              this.addNewFilterRow(x);
            });
            r.joiningTables?.forEach((x) => {
              this.addNewJoiningTableRow(x);
            });
            r.sorts?.forEach((x) => {
              this.addNewSortsRow(x);
            });
            r.userGroup?.forEach((x) => {
              this.addNewUserGroupRow(x);
            });
            r.webuserGroup?.forEach((x) => {
              this.addNewWebuserGroupRow(x);
            });
            if (this.isEdit || this.isClone) {
              this.initializeRows();
            }
            this.form.patchValue(r);
            if (this.isShow) this.form.disable();
            this.loading = false;
          } else {
            this.uS.go(appRoutes.life.report.index.pub);
          }
          return r;
        });
    } else {
      this.initializeRows();
    }
    this.getFilterConnectors();
    this.getFilterOperators();
    this.getSortBys();
    this.getOutputFieldFormats();
    this.frS.getUserGroupList().subscribe((r) => (this.userGroups = r));
  }

  private createForm() {
    this.form = new FormGroup({
      code: configForms.default(),
      createdBy: configForms.default(),
      description: configForms.default(),
      // description: configForms.required(),
      filters: new FormArray([]),
      id: configForms.default(),
      joiningTables: new FormArray([]),
      outputs: new FormArray([]),
      primaryTable: configForms.required(),
      // repeatMultipleFieldNames: configForms.default(),
      reportGroup: configForms.required(),
      reportHeader: configForms.default(),
      sorts: new FormArray([]),
      tableGroup: configForms.required(),
      userGroup: new FormArray([]),
      webuserGroup: new FormArray([]),
      writerid: configForms.default(),
    });
    // if (!this.report) {
    this.form.controls.primaryTable.valueChanges.subscribe((r) => {
      this.frS
        .getFieldNames(r)
        .subscribe((fields) => (this.fieldNames = fields));
    });
    if (this.isCreate || this.isClone) {
      this.form.controls.createdBy.patchValue(
        environment.user?.userDetails?.username
      );
    }
    // }
  }
  initializeRows() {
    if (!this.filters.controls.length) this.addNewFilterRow();
    if (!this.joiningTables.controls.length) this.addNewJoiningTableRow();
    if (!this.outputs.controls.length) this.addNewOutputsRow();
    if (!this.sorts.controls.length) this.addNewSortsRow();
    if (!this.userGroup.controls.length) this.addNewUserGroupRow();
    if (!this.webuserGroup.controls.length) this.addNewWebuserGroupRow();
  }
  getFilterOperators() {
    this.frS.getCodes('OPERATOR').subscribe((r) => (this.filterOperators = r));
  }
  getFilterConnectors() {
    this.frS
      .getCodes('CONNECTOR')
      .subscribe((r) => (this.filterConnectors = r));
  }
  getSortBys() {
    this.frS.getCodes('SORT_BY').subscribe((r) => (this.sortBys = r));
  }
  getOutputFieldFormats() {
    this.frS
      .getCodes('FIELD_FORMAT')
      .subscribe((r) => (this.outputFieldFormats = r));
  }
  get tableName() {
    return this.form.value.tableName;
  }
  valueTyper = (dataType): InputType => {
    switch (dataType) {
      case 'BOOLEAN':
        return 'checkbox';
      case 'TEXT':
        return 'text';
      case 'DATE':
        return 'date';
      case 'NUMBER':
        return 'number';
      default:
        return 'text';
    }
  };
  //#region meta
  get filters(): FormArray {
    return this.form.get('filters') as FormArray;
  }
  addNewFilterRow(e?, index: number = this.filters?.length || 0) {
    // if (!this.isShow) {
    const form = new FormGroup({
      connector: configForms.default(index > 0 ? 'AND' : null),
      id: configForms.default(),
      name: configForms.default(),
      operator: configForms.default(),
      value: configForms.default(),
      fieldName: configForms.default(),
      fieldType: this.isShow ? configForms.default() : configForms.default('D'),
      tableName: configForms.default(),
      dataType: configForms.default(),
    });
    if (e) {
      form.patchValue(e);
    }
    this.filters.insert(index, form);
    // }
  }
  checkConnector(index: number) {
    if (this.filters.length != index + 1) return;
    const ctrl = this.filters.controls[0].get('connector');
    if (ctrl.value) this.addNewFilterRow(null, index + 1);
  }
  patchFilterDataType(columnNameVal: string, formGroup: any) {
    const ret = this.fieldNames?.find((x) => x.columnName == columnNameVal);
    formGroup.patchValue({ dataType: ret.dataType });
  }
  async removeFilterRow(index: number) {
    const id = this.filters.controls[index]?.value?.id;
    this.filters.removeAt(index);
    if (id) {
      await this.frS.deleteConfig(id, 'filter');
    }
  }

  get joiningTables(): FormArray {
    return this.form.get('joiningTables') as FormArray;
  }
  addNewJoiningTableRow(e?, index: number = this.joiningTables?.length || 0) {
    // if (!this.isShow) {
    const form = new FormGroup({
      fieldName: configForms.default(),
      id: configForms.default(),
      tableLink: configForms.default(),
      tableName: configForms.default(),
      tableGroup: configForms.default(),
    });
    if (e) {
      form.patchValue(e);
    }
    this.joiningTables.insert(index, form);
    // }
  }
  async removeJoiningTableRow(index: number) {
    const id = this.joiningTables.controls[index]?.value?.id;
    this.joiningTables.removeAt(index);
    if (id) {
      await this.frS.deleteConfig(id, 'join');
    }
  }

  get outputs(): FormArray {
    return this.form.get('outputs') as FormArray;
  }
  addNewOutputsRow(
    output?: IReportOutput,
    index: number = this.outputs?.length || 0
  ) {
    // if (!this.isShow) {
    const form = new FormGroup({
      format: configForms.default(),
      id: configForms.default(),
      fieldName: configForms.default(),
      truncate: configForms.number(false),
      fieldType: this.isShow ? configForms.default() : configForms.default('D'),
      tableName: configForms.default(),
    });
    if (output) {
      form.patchValue(output);
    }
    this.outputs.insert(index, form);
    // }
  }
  async removeOutputRow(index: number) {
    const id = this.outputs.controls[index]?.value?.id;
    this.outputs.removeAt(index);
    if (id) {
      await this.frS.deleteConfig(id, 'output');
    }
  }
  selectAllOutputFields(e: any) {
    if (!this.form.value.primaryTable) {
      return null;
    }
    if (e) {
      this.frS.getFieldNames(this.form.value.primaryTable).subscribe((r) => {
        this.outputs.controls.splice(0);
        r.forEach((x) =>
          this.addNewOutputsRow({
            fieldName: x.columnName,
            fieldType: 'D',
            format: null,
            truncate: null,
          })
        );
      });
    }
  }

  get sorts(): FormArray {
    return this.form.get('sorts') as FormArray;
  }
  addNewSortsRow(e?, index: number = this.sorts?.length || 0) {
    // if (!this.isShow) {
    const form = new FormGroup({
      id: configForms.default(),
      fieldName: configForms.default(),
      sortBy: configForms.default(),
      fieldType: this.isShow ? configForms.default() : configForms.default('D'),
      tableName: configForms.default(),
    });
    if (e) {
      form.patchValue(e);
    }
    this.sorts.insert(index, form);
    // }
  }
  async removeSortRow(index: number) {
    const id = this.sorts.controls[index]?.value?.id;
    this.sorts.removeAt(index);
    if (id) {
      await this.frS.deleteConfig(id, 'sorts');
    }
  }

  //#region USERGROUP
  get userGroup(): FormArray {
    return this.form.get('userGroup') as FormArray;
  }
  addNewUserGroupRow(e?, index: number = this.userGroup?.length || 0) {
    const form = new FormGroup({
      id: configForms.default(),
      group: configForms.default(),
    });
    if (e) {
      form.patchValue(e);
    }
    this.userGroup.insert(index, form);
  }
  async removeUserGroup(index: number) {
    const id = this.userGroup.controls[index]?.value?.id;
    this.userGroup.removeAt(index);
    if (id) {
      await this.frS.deleteConfig(id, 'userGroup');
    }
  }
  //#endregion

  //#region WEBUSERGROUP
  get webuserGroup(): FormArray {
    return this.form.get('webuserGroup') as FormArray;
  }
  addNewWebuserGroupRow(e?, index: number = this.webuserGroup?.length || 0) {
    const form = new FormGroup({
      id: configForms.default(),
      group: configForms.default(),
    });
    if (e) {
      form.patchValue(e);
    }
    this.webuserGroup.insert(index, form);
  }
  async removeWebuserGroup(index: number) {
    const id = this.webuserGroup.controls[index]?.value?.id;
    this.webuserGroup.removeAt(index);
    if (id) {
      await this.frS.deleteConfig(id, 'webuserGroup');
    }
  }
  //#endregion
  userGroupLabelFormatter = (item: any) => {
    return item ? item.group + ' - ' + item.description : '';
  };
  getFieldNameType = (options: IFieldNameKVP[], columnNameVal: string) => {
    const ret = options?.find((x) => x?.columnName == columnNameVal);
    console.log('FIELDNAME Type', ret?.dataType);
    return ret?.dataType;
  };
  //#endregion
  async submitRun() {
    this.loading = true;
    const values = clone(this.form.value as IReportForm);
    delete values.code;
    delete values.id;
    values.generateReport = true;
    this.formatReportInputs(values);
    console.log('Report Form', values);
    try {
      this.loading = false;
      return await this.frS.runReport(values);
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
  async run() {
    try {
      const reportFormData = await this.submitRun();
      if (reportFormData.summary)
        this.uS.info(
          `Report was ran successfully.<br>Select a download option`,
          1,
          null,
          [
            {
              value: 'Excel',
              action: () =>
                this.download(EReportFormat.excel, reportFormData?.filePath),
            },
            {
              value: 'PDF',
              action: () =>
                this.download(EReportFormat.pdf, reportFormData?.filePath),
            },
          ]
        );
      else
        this.uS.info(
          `There was no data matching the criteria specified.<br>Please adjust your criteria.`,
          0
        );
    } catch (error) {
      this.uS.info(error, 0);
    }
  }
  async save() {
    this.loading = true;
    const values = this.form.value as IReportForm;
    values.generateReport = false;
    this.formatReportInputs(values);
    console.log('Report Form', values);
    try {
      this.reportFormData = await (values?.id
        ? this.frS.modifyReport(values, values.id)
        : this.frS.submitReport(values));
      this.open();
      this.uS.info(
        `Report ${this.reportFormData.code} was saved successfully.`,
        1
      );
    } catch (e) {debugger
      this.uS.info(e?.error?.message, 0);
    }
    this.loading = false;
  }

  async generate() {
    this.loading = true;
    const values = this.form.value as IReportForm;
    values.generateReport = true;
    this.formatReportInputs(values);
    console.log('Report Form', values);
    try {
      this.reportFormData = await (this.reportFormData?.id
        ? this.frS.modifyReport(values, this.reportFormData.id)
        : this.frS.submitReport(values));
      console.log('post report form', this.reportFormData);

      this.loading = false;
      this.uS
        .info(
          `Report ${this.reportFormData?.code} was generated successfully.`,
          1
        )
        .then(() => {
          this.open(
            this.reportFormData.generateReport ? 'show' : 'edit',
            this.reportFormData.summary
          );
        });
    } catch (e) {
      this.uS.info(e?.error?.message, 0);
      console.log(e);
      this.loading = false;
    }
  }
  open(
    route: string = this.reportFormData.generateReport ? 'show' : 'edit',
    summary?: number,
    filepath?: string
  ) {
    this.uS.router.navigate(['../' + route], {
      relativeTo: environment.activatedRoute || this.route,
      queryParams: { code: filepath || this.reportFormData.code, summary },
    });
  }
  private formatReportInputs(val: IReportForm) {
    val.outputs = val.outputs?.filter((x) => x.fieldName);
    val.filters = val.filters?.filter((x) => x.fieldName);
    val.userGroup = val.userGroup?.filter((x) => x.group);
    val.webuserGroup = val.webuserGroup?.filter((x) => x.group);
    val.sorts = val.sorts?.filter((x) => x.fieldName);
    val.joiningTables = val.joiningTables?.filter((x) => x.fieldName);
    val.outputs.forEach((x) => (x.tableName = val.primaryTable));
    val.filters.forEach((filter) => {
      filter.tableName = val.primaryTable;
      filter.name = filter.fieldName;
      filter.dataType = this.fieldNames?.find(
        (x) =>
          x.columnName?.toLowerCase()?.trim() ==
          filter.fieldName?.toLowerCase()?.trim()
      )?.dataType;
    });
    val.sorts.forEach((x) => (x.tableName = val.primaryTable));
    val.reportHeader = val.reportHeader?.trim()
      ? val.reportHeader.trim()
      : val.description;
    delete val.webuserGroup;
  }
  onDownload = (event: MouseEvent, filePath?: string) => {
    // debugger;
    this.uS.dialogOpener(
      ReportSaveTypeComponent,
      {
        height: 'auto',
        width: 'auto',
        maxWidth: '90vw',
        maxHeight: '90vh',
        position: {
          top: event.y + 27 + 'px',
          left: event.x - 205 + 'px',
        },
      },
      (reportFormat: EReportFormat) => {
        if (reportFormat) {
          this.download(reportFormat, filePath);
        }
      }
    );
  };
  private async download(format: EReportFormat, filePath?: string) {
    this.loading = true;
    try {
      await this.frS
        .downloadReport(filePath || this.reportFormData.code, format)
        .toPromise()
        .then((r) => {
          console.log(r);
          this.uS.downloader(
            r,
            this.reportFormData.code +
              ' ' +
              this.reportFormData.reportHeader +
              (format == EReportFormat.excel
                ? '.xlsx'
                : format == EReportFormat.pdf
                ? '.pdf'
                : '')
          );
        });
    } catch (e) {
      this.uS.info(e, 0);
      console.log(e);
    }
    this.loading = false;
  }
  visualize(filepath?: string) {
    this.open('visualize', null, filepath);
  }
  screenView(filepath?: string) {
    this.open('table', null, filepath);
  }
  edit() {
    this.loading = true;
    this.open('edit');
  }
  clone() {
    this.loading = true;
    this.open('clone');
  }
}
