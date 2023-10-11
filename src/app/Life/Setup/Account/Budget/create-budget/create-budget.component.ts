import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss'],
})
export class CreateBudgetComponent
  extends PageTemplateComponent
  implements OnInit
{
  constructor(public route: ActivatedRoute, public utilS: UtilityService) {
    super(route, utilS);
  }

  @ViewChild('f') form: NgForm;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.init(async () => {
      return this.code
        ? this.fetchProcess(this.code).then((r) => {
            this.isShow ? this.form.form.disable() : null;
            this.loading = false;
          })
        : null;
    });
  }

  async fetchProcess(code: string) {}
}
