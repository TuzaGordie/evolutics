import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu, MenuPositionX } from '@angular/material/menu';
import { AppService } from 'src/app/Services/app.service';
import { MenuItem } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss', '../bottom-nav.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  @Input() xPosition: MenuPositionX = 'after';
  @ViewChild('menu', { static: true }) matMenu: MatMenu;
  constructor() {}

  ngOnInit(): void {}
}
