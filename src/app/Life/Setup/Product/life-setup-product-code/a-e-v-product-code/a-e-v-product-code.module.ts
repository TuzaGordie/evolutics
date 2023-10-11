import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AEVProductCodeRoutingModule } from './a-e-v-product-code-routing.module';
import { AEVProductCodeComponent } from './a-e-v-product-code.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { DependentCoversFormComponent } from './dependent-covers-form/dependent-covers-form.component';
import { DocumentationFormComponent } from './documentation-form/documentation-form.component';
import { QuoteInfoFormComponent } from './quote-info-form/quote-info-form.component';
import { PolicyInfoFormComponent } from './policy-info-form/policy-info-form.component';
import { DefaultsFormComponent } from './defaults-form/defaults-form.component'; 

@NgModule({
    declarations: [AEVProductCodeComponent, BasicFormComponent, DependentCoversFormComponent, DocumentationFormComponent, QuoteInfoFormComponent, PolicyInfoFormComponent, DefaultsFormComponent],
    imports: [CommonModule, AEVProductCodeRoutingModule, SharedModule, ComponentsModule, UtilityPipesModule],
    exports: [
        AEVProductCodeComponent
    ]
})
export class AEVProductCodeModule {}
