import { Component, OnInit, ViewChild } from '@angular/core';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  @ViewChild('bottomNav') bottomNavRef: BottomNavComponent;
 
  constructor() {}

  ngOnInit(): void {}
  get searchRef() {
    return this.bottomNavRef.searchRef;
  }
}
