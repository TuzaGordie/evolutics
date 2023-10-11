import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { StatusService } from 'src/app/Services/status.service';
import { configForms } from '../../models/form.class';
import { ICodeDescription } from '../../models/index.model';

@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss'],
})
export class ChangeStatusModalComponent implements OnInit {
  form = new FormGroup({
    status: configForms.required(),
  });
  get options() {
    return this.data?.options;
  }
  get status() {
    return this.data?.status;
  }
  constructor(
    public dialogRef: MatDialogRef<ChangeStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { options: ICodeDescription[]; status: string }
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
}
