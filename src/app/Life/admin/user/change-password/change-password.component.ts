import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Authentication/auth-extras/authentication.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  });
  minLength = 5;
  maxLength = 20;
  loading: boolean;
  constructor(
    public authS: AuthenticationService,
    public uS: UtilityService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  async submit() {
    try {
      if (!this.form.valid) throw 'Password is invalid';
      this.loading = true;
      await this.authS.changePassword(this.form.value.password).toPromise();
      await this.uS.info(`Your password has been updated`, 1);
      this.uS.router.navigate(['/'])
    } catch (error) {
      console.log(error);
      this.uS.info(error, 0);
    }
    this.loading = false;
  }
}
