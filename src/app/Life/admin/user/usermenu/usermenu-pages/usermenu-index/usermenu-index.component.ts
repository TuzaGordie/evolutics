import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsermenuService } from '../../usermenu-extras/usermenu.service';

@Component({
  // selector: 'app-usermenu-index',
  templateUrl: './usermenu-index.component.html',
  styleUrls: ['./usermenu-index.component.scss'],
})
export class UsermenuIndexComponent implements OnInit { 
  userMenu:string
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userService: UsermenuService, 
  ) {}

  ngOnInit(): void { 
  }
 
}
