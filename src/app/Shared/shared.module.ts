import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { BtnModule } from './components/btn/btn.module';
import { InputModule } from './components/input/input.module';
import { TextCase1Module } from './components/text-case-1/text-case-1.module';
import { ComponentsModule } from './components/components.module';
import { LoaderModule } from './components/loader/loader.module';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { InfoDialogModule } from './components/info-dialog/info-dialog.module';
import { InputNGModelModule } from './components/input-NgModel/input-ngmodel.module';
import { EditableTextCaseModule } from './components/editable-text-case/editable-text-case.module';
import { UtilityPipesModule } from './pipes/utility.pipe';
import { LayoutModule } from '../Layout/layout.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoIconModule } from './components/info-icon/info-icon.module';
import { PhoneNumberModule } from './components/phone-number/phone-number.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { TranslatorDirective } from './directives/translator.directive';
import { AutocompleteModule } from './components/autocomplete/autocomplete.module';
import { AutocompleteNgModelModule } from './components/autocomplete-ng-model/autocomplete-ng-model.module';
import { DirectivesModule } from './directives/index.directive';
import { PageToComponentModule } from './components/page-to-component/page-to-component.module';
import { FormTabHeadersModule } from './components/form-tab-headers/form-tab-headers.module';
import { PageTemplateModule } from './components/page-template/page-template.module';
import { ExportTableModule } from './components/export-table/export-table.module';

@NgModule({
  declarations: [],
  imports: [
    // BtnModule,
    CommonModule,
    // ComponentsModule,
    // ConfirmDialogModule,
    // FontAwesomeModule,
    // InfoDialogModule,
    // InputModule,
    // RouterModule,
    // TextCase1Module,
    // UtilityPipesModule,
    // MatTooltipModule,
    // InfoIconModule,
  ],
  exports: [
    AutocompleteModule,
    AutocompleteNgModelModule,
    BtnModule,
    ComponentsModule,
    DirectivesModule,
    EditableTextCaseModule,
    ExportTableModule,
    FileUploadModule,
    FontAwesomeModule,
    FormTabHeadersModule,
    InfoIconModule,
    InputModule,
    InputNGModelModule,
    LayoutModule,
    LoaderModule,
    MatTooltipModule,
    PageTemplateModule,
    PageToComponentModule,
    PhoneNumberModule,
    RouterModule,
    TextCase1Module,
    UtilityPipesModule,
  ],
  providers: [DecimalPipe],
})
export class SharedModule {}
