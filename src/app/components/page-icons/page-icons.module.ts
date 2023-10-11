import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHelpDeskComponent } from './chat-help-desk/chat-help-desk.component';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';



@NgModule({
  declarations: [
    ChatHelpDeskComponent
  ],
  imports: [
    CommonModule,UtilityPipesModule
  ],
  exports: [
    ChatHelpDeskComponent
  ]
})
export class PageIconsModule { }
