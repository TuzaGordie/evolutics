import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { FindProductService } from '../../../service/find-product.service';
import { IProductCode } from '../../product-code-extras/product-code.interface';
import { ProductService } from '../../product-code-extras/product.service';

@Component({
  selector: 'app-documentation-form',
  templateUrl: './documentation-form.component.html',
  styleUrls: ['./documentation-form.component.scss'],
})
export class DocumentationFormComponent implements OnInit {
  @Input() isShow: boolean;
  @Input() isEdit: boolean;
  @Input() isClone: boolean;
  @Input() isCreate: boolean;
  @Input() prodCode: string;
  @Input() product: IProductCode;
  @Input() form: FormGroup;
  eventTypes: ICodeTitle[];
  languages: ICodeTitle[];
  documentActions: ICodeTitle[];
  documentTypes: ICodeTitle[];
  conditions: ICodeTitle[];
  constructor(public fpS: ProductService) {}

  ngOnInit(): void {
    this.getEventTypes();
    this.getLanguages();
    this.getDocumentActions();
    this.getDocumentTypes();
    this.getConditions();
  }
  getLanguages() {
    return this.fpS
      .getCodeGroup('LANGUAGE')
      .subscribe((r) => (this.languages = r));
  }
  getDocumentActions() {
    return this.fpS
      .getCodeGroup('DOCUMENT_ACTION')
      .subscribe((r) => (this.documentActions = r));
  }
  getDocumentTypes() {
    return this.fpS
      .getCodeGroup('DOCUMENT_TYPE')
      .subscribe((r) => (this.documentTypes = r));
  }
  getConditions() {
    return this.fpS
      .getCodeGroup('CONDITION')
      .subscribe((r) => (this.conditions = r));
  }
  initializeArrays(product = this.product) {
    this.documentations?.reset();
    if (this.isCreate) {
      this.addNewDocumentations();
    } else {
      product?.documentations?.length
        ? product?.documentations?.forEach((x) => this.addNewDocumentations(x))
        : this.addNewDocumentations();
      if (this.isShow) {
        this.documentations?.disable({emitEvent:false});
      }
    }
  }
  get documentations() {
    return this.form.get('documentations') as FormArray;
  }
  addNewDocumentations(e?, index: number = this.documentations?.length || 0) {
    const form = new FormGroup({
      action: configForms.default(),
      condition: configForms.default(),
      documentName: configForms.default(),
      documentType: configForms.default(),
      event: configForms.default(),
      eventType: configForms.default(),
      id: configForms.default(),
      language: configForms.default(),
      networkPath: configForms.default(),
    });
    if (e) form.patchValue(e);
    this.documentations.insert(index, form);
  }
  async removeDocumentations(index: number) {
    this.documentations.removeAt(index);
    const id = this.documentations.controls[index]?.value?.id;
    if (id) {
      await this.fpS.deleteDocumentations(id);
    }
  }
  getEventTypes = () => {
    return this.fpS
      .getCodeGroup('Event_group')
      .subscribe((r) => (this.eventTypes = r));
  };
}
