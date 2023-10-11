import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Services/life/users.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import {
  IUserDetail,
  IUserSearchResponse,
} from '../user-extras/user.interface';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss'],
})
export class UserIndexComponent implements OnInit {
  searchForm = new FormGroup({
    clientNo: new FormControl(),
    company: new FormControl(),
    email: new FormControl(),
    fullName: new FormControl(),
    group: new FormControl(),
    relManager: new FormControl(),
    subRelManager: new FormControl(),
    userMenu: new FormControl(),
    userName: new FormControl(),
  });
  form2 = new FormGroup({
    user: new FormControl(null,Validators.required),
  });
  userSearchResponse: IUserSearchResponse;
  constructor(
    public uS: UtilityService,
    public userS: UsersService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchForm.valueChanges.subscribe((r) => { 
      this.userS.search(r).subscribe((res) => {
        this.userSearchResponse = res;
      });
    });
    this.searchForm.updateValueAndValidity()
  }

  show() {
    if (this.form2.get('user').valid)
      this.uS.router.navigate(['../show'], {
        queryParams: { 
          id: this.form2.get('user').value,
        },
        relativeTo: this.route,
      });
  }

  clone() {
    if (this.form2.get('user').valid)
      this.uS.router.navigate(['../clone'], {
        queryParams: { 
          code: this.form2.get('user').value,
        },
        relativeTo: this.route,
      });
  }
}
