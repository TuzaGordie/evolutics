import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { ChangeStatusModalComponent } from 'src/app/Shared/components/change-status-modal/change-status-modal.component';
import { configForms } from 'src/app/Shared/models/form.class';
declare const $: any;
@Component({
  selector: 'app-pending-claims-view',
  templateUrl: './pending-claims-view.component.html',
  styleUrls: ['./pending-claims-view.component.scss'],
})
export class PendingClaimsViewComponent implements OnInit {
  form = new FormGroup({
    test: configForms.default(),
  });
  claimNo: any;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.claimNo = this.route.snapshot.queryParams.claimNo;
  }

  openStatusDialog = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: { options: [] },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {}
    );
  };
  client_view() {
    return;
    this.router.navigate(['../view-client'], { relativeTo: this.route });
  }
  openAdjust() {}
  openHistory() {}
}
