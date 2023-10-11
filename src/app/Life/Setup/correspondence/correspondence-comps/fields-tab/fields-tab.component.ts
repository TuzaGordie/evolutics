import { Component, Input, OnInit } from '@angular/core';
import {
  CorrespondenceJoinTemplateList,
  CorrespondenceOutputFieldList,
  CreateCorrespondence,
} from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-correspondence-fields-tab',
  templateUrl: './fields-tab.component.html',
  styleUrls: ['./fields-tab.component.scss'],
})
export class CorrespondenceFieldsTabComponent implements OnInit {
  @Input('correspondence') createCorrespondence: CreateCorrespondence;
  @Input() isShow: boolean;
  @Input() documentCodes: any[] = [];
  @Input() connectorTypes: any[] = [];
  @Input() connectors: any[] = [];
  @Input() tableColumns: any[] = [];
  @Input() fieldTypes: ICodeTitle[];
  constructor(
    public correspondenceService: CorrespondenceService,
    public util: UtilityService
  ) {}

  ngOnInit(): void {
    this.getDocumentCodes();
    this.getConnectorTypeByCodeGroup();
    this.getFieldTypeByCodeGroup();
  }
  getDocumentCodes() {
    this.correspondenceService.getDocumentCodes().subscribe((data: any) => {
      this.documentCodes = data;
    });
  }
  getConnectorTypeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('CONNECTOR_TYPE')
      .subscribe((data: any) => {
        this.connectorTypes = data;
      });
  }
  getFieldTypeByCodeGroup() {
    this.correspondenceService
      .getCodesByCodeSubGroup('FIELD_TYPE')
      .subscribe((data) => {
        this.fieldTypes = data;
      });
  }

  removeCorrespondenceJoinTemplate(i: number) {
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
            this.util.notify('Correspondence Document deleted suceesfully.', 1);
          },
          () => {
            this.util.notify('Unable to delete.', 0);
          }
        );
      return;
    }
    this.createCorrespondence.correspondenceJoinTemplateList.splice(i, 1);
  }
  addCorrespondenceJoinTemplate(
    i = this.createCorrespondence?.correspondenceJoinTemplateList?.length
  ) {
    let corr = new CorrespondenceJoinTemplateList();
    corr.rowId =
      this.createCorrespondence.correspondenceJoinTemplateList.length + 1;
    corr.deleted = false;
    this.createCorrespondence.correspondenceJoinTemplateList.splice(i, 0, corr);
  }

  removeCorrespondenceOutputField(i: number) {
    if (this.createCorrespondence.correspondenceOutputFieldList[i].id != null) {
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
            this.util.notify('Correspondence Document deleted suceesfully.', 1);
          },
          () => {
            this.util.notify('Unable to delete.', 0);
          }
        );
      return;
    }
    this.createCorrespondence.correspondenceOutputFieldList.splice(i, 1);
  }
  addCorrespondenceOutputField(
    i = this.createCorrespondence.correspondenceOutputFieldList
  ?.length) {
    let corr = new CorrespondenceOutputFieldList();
    corr.rowId =
      this.createCorrespondence.correspondenceOutputFieldList.length + 1;
    corr.deleted = false;
    this.createCorrespondence.correspondenceOutputFieldList.splice(i, 0, corr);
  }
}
