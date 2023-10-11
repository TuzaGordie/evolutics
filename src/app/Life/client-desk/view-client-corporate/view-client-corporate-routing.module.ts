import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientNotesListComponent } from '../client-notes/client-notes.component';
import { ViewClientCorporateComponent } from './view-client-corporate.component';

const routes: Routes = [
  { path: '', component: ViewClientCorporateComponent },
  {
    path: 'note',
    component: ClientNotesListComponent,
    data: {title: 'View Corporate Client / Note'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewClientCorporatetRoutingModule { }
