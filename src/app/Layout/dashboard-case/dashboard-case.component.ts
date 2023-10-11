import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Authentication/auth-extras/authentication.service';
import { IdlerService } from 'src/app/Shared/components/idler/idler.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './dashboard-case.component.html',
  styleUrls: ['./dashboard-case.component.scss'],
})
export class DashboardCaseComponent implements OnInit {
  constructor(
    public idleService: IdlerService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    environment.logReq=true
    if (this.useIdler && environment.userCompanyConfig?.config?.timeOutAfter) {
      this.idleService.startIdler(
        (environment.userCompanyConfig?.config?.timeOutAfter ) * 60
      );
      this.idleService.addOnIdleFunction(() => {
        this.authService.logout();
      });
    }
  }
  ngOnDestroy(): void {
    if (this.useIdler) {
      this.idleService.clear();
    }
    environment.logReq=false
  }
  get useIdler() {
    return environment.production;
  }
}
