import { Component, Input, OnInit } from '@angular/core';
import { MenuItemConfig } from '../../../usermenu-extras/usermenu.interface';

@Component({
  selector: 'um-menu-item-box',
  templateUrl: './menu-item-box.component.html',
  styleUrls: ['./menu-item-box.component.scss'],
})
export class MenuItemBoxComponent implements OnInit {
  @Input() menuItem: MenuItemConfig;
  @Input() readonly: boolean;
  constructor() {}

  ngOnInit(): void {}
}
