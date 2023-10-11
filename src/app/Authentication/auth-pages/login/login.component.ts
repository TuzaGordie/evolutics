import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { AppService } from 'src/app/Services/app.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { AuthenticationService } from '../../auth-extras/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    userName: configForms.default(),
    password: configForms.default(),
  });
  loading: boolean;
  errMsg: any; 
  constructor(
    public router: Router,
    public appS: AppService,
    public authS: AuthenticationService,
    public uS: UtilityService,
    public route: ActivatedRoute,
    public sS: StorageService
  ) {}

  ngOnInit(): void {
    this.uS.stopPl();
  }
  async submit() {
    if (this.authS.count >= this.authS.maxCount) return;
    this.loading = true;
    this.errMsg = null;
    try {
      await this.authS.login(this.form.value);
      this.router.navigateByUrl(
        this.route.snapshot.queryParams.r ||
          this.appS.getFirstAvailableSystem.appRoute.pub
      );
    } catch (error) {
      this.errMsg = error;
      this.authS.count++;
      if (this.authS.isLocked) this.authS.startTimer();
      this.loading = false;
    }
  }
}
