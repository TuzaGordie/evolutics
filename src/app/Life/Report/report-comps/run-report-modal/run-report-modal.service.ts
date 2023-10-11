import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { RunReportModalComponent } from './run-report-modal.component';

@Injectable({
  providedIn: 'root',
})
export class RunReportModalService {
  constructor(public uS: UtilityService) {}
  openModal(reportCode: String) {
    return this.uS.dialogOpenerRef(RunReportModalComponent, {
      height: 'auto',
      width: '80%',
      autoFocus: false,
      data: { reportCode },
    });
  }
}
