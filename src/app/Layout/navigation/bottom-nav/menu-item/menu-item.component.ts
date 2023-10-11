import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { IMenuItem, MenuItem } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: MenuItem;
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {}
}

// @Component({
//   selector: 'app-sub-menu-item',
//   template: `<a class="dropdown-item "
//     routerLink="{{ menuItem.link }}"
//     [ngClass]="{ underline: !isLast }"
//   >
//     {{ menuItem.label }}</a
//   >`,
//   styleUrls: ['./menu-item.component.scss', '../bottom-nav.component.scss'],
// })
// export class SubMenuItemComponent implements OnInit {
//   @Input() menuItem: MenuItem;
//   @Input() isLast: boolean;
//   constructor() {}

//   ngOnInit(): void {}
// }
