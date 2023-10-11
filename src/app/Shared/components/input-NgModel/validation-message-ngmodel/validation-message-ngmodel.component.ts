import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { configValidationMessages } from 'src/app/configs/validation-messages.config';
import {
  EValidationType,
  IValidationMessage,
} from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-validation-message-ngmodel',
  templateUrl: './validation-message-ngmodel.component.html',
  styleUrls: ['./validation-message-ngmodel.component.scss'],
})
export class ValidationMessageNgmodelComponent implements OnInit {
  @Input() isError: boolean;
  @Input() validationKey: EValidationType;
  validation: { type: EValidationType; message: string };
  @Input() label: string;
  @Input() customMessage = 'Value is invalid';
  @Input() name;

  validations;
  constructor(
    private titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.initializeValidationMessages()
    this.setValidation()
  }

  initializeValidationMessages(){
    this.validations = [
      {
        type: EValidationType.required,
        message: `${this.titleCasePipe.transform(this.name)} is required.`,
      },
      {
        type: EValidationType.minlength,
        message: `${this.titleCasePipe.transform(this.name)} must be at least 2 characters long.`,
      },
      {
        type: EValidationType.unique,
        message: `${this.titleCasePipe.transform(this.name)} already exists.`,
      },
    ]
  }

  setValidation(){
    this.validation = this.validations.find((x) => x.type == this.validationKey)
  }
}
