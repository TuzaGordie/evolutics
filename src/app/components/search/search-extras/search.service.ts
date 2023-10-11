import { Injectable } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ESystem, MenuItem } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ESearchType, ISearchResponse } from './search.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  menuIndex: MenuItem[];
  readonly storageKey = 'searchIndex';
  systemMenuIndex: MenuItem[];
  constructor(
    public appS: AppService,
    public uS: UtilityService,
    public sS: StorageService
  ) {
    this.sS.getItemA(this.storageKey).then((r) => {
      this.menuIndex = r;
    });
  }

  async search(query: string) {
    return new Promise<
      {
        menuItems: MenuItem[];
        type: ESearchType;
      }[]
    >((res) => {
      if (typeof Worker !== 'undefined') {
        const worker = new Worker(new URL('./search.worker', import.meta.url));
        worker.onmessage = ({ data }) => {
          console.log('data', data);
          res([
            { menuItems: data[0], type: ESearchType.main },
            { menuItems: data[1], type: ESearchType.help },
          ]);
        };
        worker.postMessage({ query, menuIndex: this.systemMenuIndex });
      } else {
        query = query?.toLowerCase()?.trim();
        if (!query) return null;
        const queries = this.parseQuery1(query);
        if (queries.length > 1) queries.unshift(query);
        // console.log('queries', queries);
        Promise.all([this.searchPages(queries), this.searchHelp(queries)]).then(
          (r) =>
            res([
              { menuItems: r[0], type: ESearchType.main },
              { menuItems: r[1], type: ESearchType.help },
            ])
        );
      }
    });
  }

  parseQuery1(query: string) {
    return query?.split(' ')?.filter((q) => q);
  }

  async searchPages(queries: string[]) {
    const res: MenuItem[] = [];
    for (const query of queries) {
      res.push(
        ...(this.systemMenuIndex?.filter((x) =>
          x.breadcrumbsStr.startsWith(query)
        ) || [])
      );
    }
    for (const query of queries) {
      res.push(
        ...(this.systemMenuIndex?.filter((x) =>
          x.breadcrumbsStr.includes(query)
        ) || [])
      );
    }
    for (const query of queries) {
      res.push(
        ...(this.systemMenuIndex?.filter((x) =>
          x.labelLowerCase.startsWith(query)
        ) || [])
      );
    }
    for (const query of queries) {
      res.push(
        ...(this.systemMenuIndex?.filter((x) =>
          x.labelLowerCase.includes(query)
        ) || [])
      );
    }

    return [...new Set(res)];
    // return res.filter(this.uS.onlyUnique);
  }

  async searchHelp(queries: string[]) {
    return [];
  }
  setSystemMenuIndex(system: ESystem) {
    this.systemMenuIndex = this.menuIndex.filter((x) => x.system == system);
  }
  private indexMenuItems = async (menuItems: MenuItem[]) => {
    const index: MenuItem[] = [];
    const recurser = (subMenuItems: MenuItem[], parent?: MenuItem) => {
      if (!subMenuItems) return;
      for (const menuItem of subMenuItems) {
        if (!menuItem || menuItem.isDivider || !menuItem.label) continue;
        else {
          if (parent) {
            menuItem.breadcrumbs = [...(parent.breadcrumbs || [])];
            menuItem.breadcrumbs.push({
              key: parent.label,
              value: parent.link,
            });
          }
          menuItem.labelLowerCase = menuItem.label.toLowerCase();
          menuItem.system = menuItem.system || parent?.system;
          menuItem.systemIcon =
            menuItem.systemIcon || parent?.systemIcon || menuItem.icon;
          if (menuItem.hasSub) recurser(menuItem.subs, menuItem);
          else if (!menuItem.link?.trim()) continue;
          else {
            menuItem.breadcrumbsStr = (
              menuItem.breadcrumbs?.map((x) => x.key)?.join(' ') || ''
            ).toLowerCase();
            index.push(menuItem);
          }
        }
      }
    };
    recurser(menuItems);
    // console.table(index);
    index.sort((x, y) => x.label.localeCompare(y.label));
    return index;
  };
  buildIndex() {
    this.menuIndex = this.sS.getItem(this.storageKey);
    if (this.menuIndex) return;
    if (typeof Worker !== 'undefined' && environment.production) {
      const worker = new Worker(
        new URL('./build-search-index.worker', import.meta.url)
      );
      worker.onmessage = ({ data }) => {
        this.menuIndex = data;

        this.sS.saveItemA(this.storageKey, data);
      };
      worker.postMessage(this.appS.activeSystems);
    } else {
      this.indexMenuItems(this.appS.activeSystems).then((r) => {
        this.menuIndex = r;
        this.sS.saveItemA(this.storageKey, r);
      });
    }
  }
}
