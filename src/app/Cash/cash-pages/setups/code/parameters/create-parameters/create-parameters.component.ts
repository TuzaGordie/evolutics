import { Component, OnInit } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { CodesGroup } from 'src/app/Shared/models/life/setup/codes/CodesGroup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-parameters',
  templateUrl: './create-parameters.component.html',
  styleUrls: ['./create-parameters.component.scss']
})
export class CashCreateParametersComponent implements OnInit {
  codesGroup = new CodesGroup();

  createGroupForm: FormGroup;

  constructor(
    private codeService: CodeService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.createGroupForm = this.formBuilder.group({
      id: [null],
      group: [null, Validators.required],
      description: [null, Validators.required],
      authBy: [null],
      createdBy: [null],
    });
  }

  createCodeGroup() {
    if (this.createGroupForm.valid) {
      this.codeService
        .createCodesGroup(this.createGroupForm.value)
        .subscribe((data: any) => {
          this.snack.open('Code group created successfully!.', 'Close', {
            duration: 5000,
          });
        });
    } else {
      this.snack.open(
        'Unable to create code group, check your entries',
        'Close',
        { duration: 5000 }
      );
    }
  }

}
