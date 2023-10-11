import { Component, Input, OnInit } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { TemplateService } from 'src/app/Services/life/template.service';
import { CorrespondenceTemplate, CreateCorrespondence } from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';

@Component({
  selector: 'app-templates-to-attach-to-email',
  templateUrl: './templates-to-attach-to-email.component.html',
  styleUrls: ['./templates-to-attach-to-email.component.scss'],
})
export class TemplatesToAttachToEmailComponent implements OnInit {
  @Input('correspondence') createCorrespondence: CreateCorrespondence;
  @Input() isShow: boolean;
  constructor(
    public codeService: CodeService,
    public templateService: TemplateService
  ) {}

  ngOnInit(): void {}
  removeTemplate(index: number) {
    this.createCorrespondence?.correspondenceTemplates?.splice(index, 1);
  }
  addTemplate(
    index: number = this.createCorrespondence?.correspondenceTemplates?.length
  ) {
    this.createCorrespondence?.correspondenceTemplates?.splice(
      index,
      0,
      new CorrespondenceTemplate()
    );
  }
}
