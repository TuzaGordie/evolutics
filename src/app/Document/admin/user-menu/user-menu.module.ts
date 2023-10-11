import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { DocumentUserMenuComponent } from './user-menu.component';
import { LayoutModule } from 'src/app/Layout/layout.module';
import { RouterModule } from '@angular/router';
import { DocumentUserMenuViewComponent } from './view/view.component';
import { DocumentUserMenuCreateComponent } from './create/create.component';
import { DocumentUserMenuCloneComponent } from './clone/clone.component';

@NgModule({
  declarations: [
    DocumentUserMenuComponent,
    DocumentUserMenuViewComponent,
    DocumentUserMenuCreateComponent,
    DocumentUserMenuCloneComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    ComponentsModule,
    RouterModule,
  ],
})
export class UserMenuModule {}
