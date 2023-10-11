import { ESystem, IMenuItem, MenuItem } from '../../Shared/models/index.model';
import { appRoutes } from '../app-routes-configs/app-routes.config';
import { actuarialSubMenu } from './actuarial.menu.config';
import { analyticsSubMenu } from './analytics.menu.config';
import { cashSubMenu } from './cash.menu.config';
import { crmsSubMenu } from './crms.menu.config';
import { documentSubMenu } from './document.menu.config';
import { financeSubMenu } from './finance.menu.config';
import { generalSubMenu } from './general.menu.config';
import { healthSubMenu } from './health.menu.config';
import { lifeSubMenu } from './life.menu.config';
const _configMainMenu: IMenuItem[] = [
  {
    label: 'Life',
    link: appRoutes.life.pub,
    icon: 'fa fa-heart',
    subs: lifeSubMenu,
    system: ESystem.life,
    id: 'ML1',
  },
  {
    label: 'General',
    link: appRoutes.general.pub,
    icon: 'fa fa-truck',
    subs: generalSubMenu,
    system: ESystem.general,
    id: 'MG169',
  },
  {
    label: 'Health',
    link: appRoutes.health.pub,
    icon: 'fa fa-heartbeat',
    subs: healthSubMenu,
    system: ESystem.health,
    id: 'MH341',
  },
  {
    label: 'Actuarial',
    link: appRoutes.act.pub,
    icon: 'fa fa-signal',
    subs: actuarialSubMenu,
    system: ESystem.actuarial,
    id: 'MA476',
  },
  {
    label: 'CRM',
    link: appRoutes.crm.pub,
    icon: 'fa fa-chart-pie',
    subs: crmsSubMenu,
    system: ESystem.crms,
    id: 'MC566',
  },
  {
    label: 'Analytics',
    link: appRoutes.analytics.pub,
    icon: 'fa fa-chart-bar',
    subs: analyticsSubMenu,
    system: ESystem.analytics,
    id: 'MA625',
  },
  {
    label: 'Assets Management',
    link: appRoutes.assets.pub,
    icon: 'fa fa-chart-line',
    subs: [],
    system: ESystem.assets,
    id: 'MAM635',
  },
  {
    label: 'Finance',
    link: appRoutes.finance.pub,
    icon: 'fas fa-wallet',
    subs: financeSubMenu,
    system: ESystem.finance,
    id: 'MF636',
  },
  {
    label: 'Document',
    link: appRoutes.document.pub,
    icon: 'fa fa-file',
    subs: documentSubMenu,
    system: ESystem.document,
    id: 'MD719',
  },
  {
    label: 'DBCloner',
    link: appRoutes.dbcloner.pub,
    icon: 'fa fa-clone',
    subs: [],
    system: ESystem.dBCloner,
    id: 'MD748',
  },
  {
    label: 'Human',
    link: appRoutes.human.pub,
    icon: 'fa fa-user',
    subs: [],
    system: ESystem.human,
    id: 'MH749',
  },
];

export const configMainMenu = _configMainMenu ?.map(m=>new MenuItem(m)) ;

console.log('MENUITEMS', configMainMenu);
for (const moduleMenu of configMainMenu) {
  for (let i = 0; i < moduleMenu?.subs?.length; i++) {
    const mi = moduleMenu?.subs[i];
    mi.submenuPosition = moduleMenu?.subs?.length / 2 > i ? 'after' : 'before';
  }
  moduleMenu.systemIcon = moduleMenu.icon;
}
// let j = 1;
// function getID(m: MenuItem) {
//   return (
//     'M' +
//     m.label
//       ?.split(' ')
//       ?.map((x) => x[0])
//       ?.join('') +
//     j++
//   );
// }
// function idier(m: any) {
//   m.id = getID(m);
//   if (m.subs)
//     for (const menu of m.subs) {
//       idier(menu);
//     }
// }
// for (const m of configMainMenu) {
//   idier(m);
// }
