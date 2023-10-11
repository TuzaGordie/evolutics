import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/Services/page.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { ReportEndpointService } from '../../report-extras/find-report.service';

@Component({
  selector: 'app-life-report-batch',
  templateUrl: './life-report-batch.component.html',
  styleUrls: ['./life-report-batch.component.scss'],
})
export class LifeReportBatchComponent implements OnInit {
  form = new FormGroup({
    reportGroupCode: configForms.default(),
    report: configForms.default(),
    userGroup: new FormArray([]),
    webuserGroup:  new FormArray([]),
  });
  type: any;
  code: any;
  constructor(
    public frS: ReportEndpointService,
    public pageS: PageService,
    public route: ActivatedRoute,
    // public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.data.type;
    this.code = this.route.snapshot.queryParams.code;
    this.initializeRows();
  }
  initializeRows() {
    this.addNewUserGroupRow();
    this.addNewWebuserGroupRow();
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
  removeUserGroup(index: number) {
    this.userGroup.removeAt(index);
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
  removeWebuserGroup(index: number) {
    this.webuserGroup.removeAt(index);
  }
  //#endregion
  userGroupLabelFormatter = (item: any) => {
    return item ? item.group + ' ' + item.description : '';
  };
  get isShow() {
    return this.pageS.isShow(this.route);
  }
}
