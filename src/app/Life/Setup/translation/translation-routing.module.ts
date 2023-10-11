import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTranslationsMenuComponent } from './menu/create-menu/create-menu.component';
import { IndexTranslationsMenuComponent } from './menu/index-menu/index-menu.component';
import { StartTranslationsMenuComponent } from './menu/start-menu/start-menu.component';
import { CreateTranslationsSystemMessageComponent } from './system-message/create-system-message/create-system-message.component';
import { IndexTranslationsSystemMessageComponent } from './system-message/index-system-message/index-system-message.component';
import { CreateTranslationsTemplateComponent } from './template/create-template/create-template.component';
import { IndexTranslationsTemplateComponent } from './template/index-template/index-template.component';

export const lifeSetupTransRoutes: Routes = [
  {
    path: 'index-menu',
    data: { title: 'Menu' },
    component: IndexTranslationsMenuComponent,
  },
  {
    path: 'start-menu',
    data: { title: 'Menu' },
    component: StartTranslationsMenuComponent,
  },
  {
    path: 'create-menu',
    data: { title: 'Menu' },
    component: CreateTranslationsMenuComponent,
  },

  {
    path: 'index-template',
    data: { title: 'Template' },
    component: IndexTranslationsTemplateComponent,
  },

  {
    path: 'create-template',
    data: { title: 'Template' },
    component: CreateTranslationsTemplateComponent,
  },
  {
    path: 'index-system-message',
    data: { title: 'Message' },
    component: IndexTranslationsSystemMessageComponent,
  },
  {
    path: 'create-system-message',
    data: { title: 'Message' },
    component: CreateTranslationsSystemMessageComponent,
  },
];
lifeSetupTransRoutes.filter((x) => x.data?.title).forEach((x) => (x.data.title = 'Set Up / Translations / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupTransRoutes)],
  exports: [RouterModule],
})
export class TranslationRoutingModule {}
