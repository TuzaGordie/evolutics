import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { IShortTermRate } from '../../Setup/Rates/short-term-rates/short-term-rates-extras/short-term-rates.interface';
import { BatchMemberModalComponent } from '../assets/batch-member-modal/batch-member-modal.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  form = new FormGroup({
    test: configForms.required(),
  });
  showAddManually: boolean;
  showUpload: boolean;
  rate: IShortTermRate;
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {}
  private nbofMember: number = 1;
  export(rate: IShortTermRate = this.rate || this.form.value) {
    const csvArray =
      `S/No,Client No,Title,First Name,Middle Name,Surname,Gender,Marital Status,Date of Birth,Address,City,Phone,Email,Salary,Cover Value,Staff ID,Subgroup,Join Date,Leave Date,Change Date\r\n` +
      rate.shortTermRateValuesList.map((x) => x.days).join('\r\n');
    console.log(csvArray);

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'Group Member Upload ' + rate.code + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadTemplate() {
    const rate: any = {
      code: 'template',
      shortTermRateValuesList: [{ days: 1 }],
    };
    this.export(rate);
  }
  memberCounter() {
    return new Array(this.nbofMember);
  }

  import() {
    this.openBatchMemberModal('UPLOAD');
  }
  openBatchMemberModal(mode: 'UPLOAD' | 'MANUAL') {
    console.log('opening');
    this.uS.dialogOpener(
      BatchMemberModalComponent,
      {
        data: {
          mode,
        },
        width: '95vw',
        maxWidth: '95vw',
      },
      (r) => {}
    );
  }
  memberInc(value = 1) {
    this.nbofMember = this.nbofMember + value;
  }
  openAddMember() {
    this.showUpload = false;
    this.showAddManually = true;
    // this.uS.dialogOpener(AddMemberModalComponent, null, () => {});
  }
  openUpload() {
    this.showUpload = true;
    this.showAddManually = false;
  }
}
