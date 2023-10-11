import { ICreateTeamCode } from './../extras/setup.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { IAgeGroup } from '../extras/setup.model';
import { SetupService } from '../extras/setup.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-teams-crm',
  templateUrl: './teams-crm.component.html',
  styleUrls: ['./teams-crm.component.scss'],
})
export class TeamsCrmComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  submitBtn: boolean;
  showPage: boolean;
  showPageReadOnly: boolean;
  teamMembers: FormArray;
  tm: string[] = [''];

  constructor(
    private route: ActivatedRoute,
    public setS: SetupService,
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.teamMembers = this.fb.array([
      new FormGroup({
        salesPersonnelCode: configForms.required(),
        salesPersonnelName: configForms.required(),
      }),
    ]);

    this.form = this.fb.group({
      teamCode: configForms.default(),
      description: configForms.required(),
      category: configForms.required(),
      company: configForms.required(),
      channel: configForms.required(),
      teamMembers: this.teamMembers,
      teamCodeLinked: configForms.required(),
      teamLead: configForms.required(),
      teamLeadName: configForms.required(),
      teamTeamDescription: configForms.required(),
    });
    this.prefillShowForm();
  }

  prefillShowForm() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      let teamCode = queryMap.get('teamCode');
      teamCode == null ? (this.loading = false) : (this.loading = true);
      if (teamCode == null || undefined) {
        this.showPage = false;
      } else {
        this.setS.showTeamCode(teamCode).subscribe((res: any) => {
          this.loading = false;
          console.log('Show Team Code' + JSON.stringify(res));
          // this.form.patchValue({
          //   ageGroupCode: res?.code,
          //   description: res?.description,
          //   ageFrom: res?.ageFrom,
          //   ageTo: res?.ageTo,
          // });
          // this.form.disable();
          // this.showPage= true;
        });
      }
    });
  }

  onSubmit() {
    this.submit();
  }

  private async submit() {
    this.loading = true;
    let values = this.form.value as ICreateTeamCode;
    this.setS
      .submitTeamCode(values)
      .then((res) => {
        this.loading = false;
        console.log('RESULT' + res);
        if (res !== null) {
          this.utilityService.info('Succesfully Created', 1);
        } else {
          this.utilityService.info('Succesfully Created', 0);
        }
      })
      .catch((error) => {
        this.loading = false;
        this.utilityService.info('An Error Occurred', 0);
      });
  }

  teamMembersInc() {
    const b = new FormGroup({
      salesPersonnelCode: configForms.required(),
      salesPersonnelName: configForms.required(),
    });
    this.tm.push('');
    this.teamMembers.push(b);
  }

  removeTeamMembers(i) {
    this.teamMembers.removeAt(i);
    this.tm.splice(i, 1);
  }

  getPersonnelName() {
    let teamMembers = this.teamMembers.value;
    for (let index = 0; index < this.teamMembers.length; index++) {
      const element = this.teamMembers.value[index];
      console.log("Personal Name Value"+JSON.stringify(element));
      this.setS.getPersonnelName(element?.salesPersonnelCode).subscribe(async (res: any) => {
        console.log("Personal Name Value"+JSON.stringify(res?.content));
          this.teamMembers[index].patchValue({
            salesPersonnelName: 'Roland',
            // res?.content?.teamHeadName;
          });
        });
    }
  }
}
