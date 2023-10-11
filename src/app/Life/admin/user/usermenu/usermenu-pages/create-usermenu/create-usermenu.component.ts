import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/components/search/search-extras/search.service';
import { AppService } from 'src/app/Services/app.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { InputNGModelComponent } from 'src/app/Shared/components/input-NgModel/input-ngmodel.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { EPageType, ESystem } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import {
  MenuItemConfig,
  IUserMenu,
  IUserMenuConfigDetail,
} from '../../usermenu-extras/usermenu.interface';
import { UsermenuService } from '../../usermenu-extras/usermenu.service';

@Component({
  selector: 'app-create-usermenu',
  templateUrl: './create-usermenu.component.html',
  styleUrls: ['./create-usermenu.component.scss'],
})
export class CreateUsermenuComponent implements OnInit {
  form = new FormGroup({
    authBy: configForms.default(),
    authOn: configForms.default(),
    description: configForms.required(),
    id: configForms.default(),
    userMenu: configForms.default(),
  });
  type: EPageType;
  userMenu: IUserMenu;
  loading: boolean; 
  readonly module: ESystem; 
  selectedMenu: MenuItemConfig;
  selectedModule: MenuItemConfig;
  @ViewChildren('subPages') checkbxes: QueryList<InputNGModelComponent>;
  modules: MenuItemConfig[];
  constructor(
    public uS: UtilityService,
    public appS: AppService,
    public route: ActivatedRoute,
    public router: Router,
    public umS: UsermenuService,
    public sS: SearchService
  ) {
    this.module = this.appS.getCurrentSystemMetadata.name;
  }

  async ngOnInit() {
    const code = this.route.snapshot.queryParams.code;
    this.type = this.route.snapshot.data.type;
    this.modules = this.umS.getAllModuleMenus();
    // this.moduleMainMenu = this.umS.getModuleMenus();
    this.openModule(0);
    if (code) {
      this.loading = true;
      await this.umS
        .getUserMenuByCode(code)
        .toPromise()
        .then((r) => {
          if (r) {
            this.userMenu = r;
            if (this.type == EPageType.showPage) {
              this.form.disable();
            } else if (this.type == EPageType.clonePage) {
              delete r.userMenuConfig.userMenu;
              delete r.userMenuConfig.id;
              r?.userMenuConfigDetails?.forEach(x=>{delete x.id;delete x.userMenuConfigId})
            }
            this.form.patchValue(r.userMenuConfig);
            this.patchMenus(r.userMenuConfigDetails);
            this.loading = false;
          } else {
            this.uS.go('../', { relativeTo: this.route });
          }
        });
    }
    this.initializeRows(); 
  }
  get code() {
    return this.userMenu?.userMenuConfig?.userMenu;
  }
  async initializeRows() {}
  patchMenus(menuConfigs: IUserMenuConfigDetail[]) {
    const patchMenu = (menu: MenuItemConfig) => {
      if (!menu) return;
      const iMneu=menuConfigs.find((x) => x.slug == menu.id);
      menu.allowed = iMneu?.access;
      menu.dbID = iMneu?.id;
      for (const m of menu.subs || []) {
        patchMenu(m);
      }
    };
    for (const _module of this.modules) {
      patchMenu(_module);
    }
  }
  openMenu(index: number) {
    // this.selectedIndex = index;
    this.selectedMenu = this.selectedModule.subs[index];
  }
  openModule(index: number) {
    this.selectedModule = this.modules[index];
    this.openMenu(0);
  }
  toggleMainMenuSubPages(id: string) {
    // debugger
    this.selectedModule.subs.find((x) => x.id == id).toggleAllSubMenus();
  }
  toggleModuleMenuSubPages(id: string) {
    // debugger
    this.modules.find((x) => x.id == id).toggleAllSubMenus();
  }
  get isShow() {
    return this.type == EPageType.showPage;
  }
  async submit() {
    this.loading = true;
    try {
      const ret: IUserMenu = {
        userMenuConfig: this.form.value,
        userMenuConfigDetails: [],
      };
      const deconstructor = (menu: MenuItemConfig, _module: ESystem) => {
        ret.userMenuConfigDetails.push({
          access: menu.allowed || false,
          module: _module,
          page: menu.label,
          slug: menu.id,
          section: menu.label,
          id:menu.dbID
        });
        if (!menu.subs?.length) return;
        for (const m of menu.subs) {
          deconstructor(m,_module)
        } 
      };
      for (const menu of this.modules) {
        deconstructor(menu,menu.label as any);
      }
      ret.userMenuConfigDetails=ret.userMenuConfigDetails?.filter(x=>x.access||x.id)
      // debugger ;
      const um = await this.umS.submit(ret);
      await this.uS.info(
        `User menu ${um?.userMenuConfig?.userMenu} has been saved`,
        1
      );
      this.router.navigate(['../show'], {
        queryParams: { code: um?.userMenuConfig?.userMenu },
        relativeTo: this.route,
      });
    } catch (error) {
      console.log(error);
      this.uS.info(`An error occurred`, 0);
    }
    this.loading = false;
  }
}
