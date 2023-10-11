import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FindGroupComponent } from './find-group/find-group.component';
import { GroupDeskOverviewComponent } from './group-desk-overview/group-desk-overview.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';

const routes: Routes = [
  {
    path: appRoutes.life.group.find._,
    component: FindGroupComponent,
    data: { title: 'Group Desk / Find Group' },
  },
  {
    path: 'view-group',
    component: ViewGroupComponent,
    data: { title: 'View Group' },
  },
  {
    path: appRoutes.life.group.groupSearch._,
    component: GroupSearchComponent,
    data: { title: 'Group Desk / Search Group' },
  },
  {
    path: appRoutes.life.group.overview._,
    component: GroupDeskOverviewComponent,
    data: { title: 'Group Desk / Overview' },
  },
  {
    path: 'members',
    loadChildren: () =>
      import('./members/members.module').then((m) => m.MembersModule),
    data: { title: 'Group Desk / Members' },
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./assets/assets.module').then((m) => m.AssetsModule),
    data: { title: 'Group Desk / Assets' },
  },
  {
    path: 'documents',
    loadChildren: () =>
    import(
      '../../Reusables/reusable-pages/document-list/document-list.module'
    ).then((m) => m.DocumentListModule),
    data: { title: 'View Group / Documents', rModule: ERModule.group },
  },
  {
    path: 'endorsements',
    loadChildren: () =>
    import(
      '../../Reusables/reusable-pages/endorsement-list/endorsement-list.module'
    ).then((m) => m.EndorsementListModule),
    data: { title: 'View Group / Endorsements' , rModule: ERModule.group},
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('../../Reusables/reusable-pages/notes/notes.module').then(
        (m) => m.NotesModule
      ),
    data: { title: 'View Group / Notes', rModule: ERModule.group },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupDeskRoutingModule {}
