import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { FormNavigationComponent } from './form-navigation/form-navigation.component';
import { NavigationComponent } from './navigation.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { LoaderModule } from 'src/app/Shared/components/loader/loader.module';
import { SearchModule } from 'src/app/components/search/search.module';
import { DirectivesModule } from 'src/app/Shared/directives/index.directive';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent  } from './bottom-nav/menu-item/menu-item.component';
import { MenuItemsComponent } from './bottom-nav/menu-items/menu-items.component';

const comps = [
  BottomNavComponent,
  FormNavigationComponent,
  MenuItemComponent,
  NavigationComponent,
  TopNavComponent,
  // SubMenuItemComponent,
  MenuItemsComponent,
];
@NgModule({
  declarations: comps,
  exports: comps,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    UtilityPipesModule,
    LoaderModule,
    SearchModule,
    DirectivesModule,
    MatMenuModule
  ],
})
export class NavigationModule {}
