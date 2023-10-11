import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { AuthenticationService } from '../../auth-extras/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    cpassword: new FormControl(null, [
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
      this.uS.go('/');
    } catch (error) {
      console.log(error);
      this.uS.info(error, 0);
    }
    this.loading = false;
  }
}
