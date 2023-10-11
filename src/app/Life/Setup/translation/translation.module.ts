import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  lifeSetupTransRoutes,
  TranslationRoutingModule,
} from './translation-routing.module'; 

import { CreateTranslationsMenuComponent } from './menu/create-menu/create-menu.component';
import { IndexTranslationsMenuComponent } from './menu/index-menu/index-menu.component';
import { StartTranslationsMenuComponent } from './menu/start-menu/start-menu.component';
import { CreateTranslationsSystemMessageComponent } from './system-message/create-system-message/create-system-message.component';
import { IndexTranslationsSystemMessageComponent } from './system-message/index-system-message/index-system-message.component';
import { CreateTranslationsTemplateComponent } from './template/create-template/create-template.component';
import { IndexTranslationsTemplateComponent } from './template/index-template/index-template.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module'; 
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [ 
    CreateTranslationsMenuComponent,
    IndexTranslationsMenuComponent,
    StartTranslationsMenuComponent,
    CreateTranslationsSystemMessageComponent,
    IndexTranslationsSystemMessageComponent,
    CreateTranslationsTemplateComponent,
    IndexTranslationsTemplateComponent,
  ],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    SharedModule,
    ComponentsModule
  ],
})
export class TranslationModule {}
