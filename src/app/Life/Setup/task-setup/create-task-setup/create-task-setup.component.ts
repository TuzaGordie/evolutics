import {
  Component,
  createPlatform,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { createBranchResponseState } from 'src/app/Store/BranchAPIStore/branch.selector';
import { ApiService } from 'src/app/Services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { configForms } from 'src/app/Shared/models/form.class';
import { ITaskSetupPayload } from '../task-setup-extras/task-setup.interface';
import { ITaskSetup } from '../task-setup-extras/task-setup.response.interface';
import { AppService } from 'src/app/Services/app.service';
import { TaskSetupService } from '../task-setup-extras/task-setup.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/Services/user.service';
import { PageService } from 'src/app/Services/page.service';

@Component({
  selector: 'app-create-task-setup',
  templateUrl: './create-task-setup.component.html',
  styleUrls: ['./create-task-setup.component.scss'],
})
export class CreateSetupsTaskSetupComponent implements OnInit {
  private nbofcats: number = 1;
  private nbofitems: number = 1;
  taskSetupForm: FormGroup = new FormGroup({
    workflowTask: new FormGroup(
      {
        // defaultToSystemAdmin:new FormControl(null),
        // schedule:new FormControl(null),
        action: new FormControl(null), // if Unclosed After Action
        autoAssignToPolicyCreator: new FormControl(null),
        busLine: new FormControl(this.appS.getCurrentSystemMetadata.busline),
        clientNotMandatory: new FormControl(null), // client Not Mandatory
        code: new FormControl(null),
        eventOnAssignment: new FormControl(null),
        eventOnCompletion: new FormControl(null),
        eventOnCreation: new FormControl(null),
        eventTrigger: new FormControl(null), // on Completion Trigger
        firstOrderEscalateAfter: new FormControl(null, [Validators.required]),
        group: new FormControl(null), // default User Group
        hidden: new FormControl(null), // hide From Manual Selection
        ifUnclosedAfter: new FormControl(null),
        maintenanceFunctionLink: new FormControl(null), // maintenance Function Link
        originalSla: new FormControl(null, [Validators.required]),
        preventManualClosing: new FormControl(null), // prevent Manual Closure
        randomAssign: new FormControl(null),
        scheduleFrequency: new FormControl(null),
        secondOrderEscalateAfter: new FormControl(null, [Validators.required]),
        taskGroup: new FormControl(null, Validators.required), // workflow Group
        taskInstructions: new FormControl(null),
        uniqueForPolicy: new FormControl(null), // unique Policy
        user: new FormControl(null), // default User
        warningSla: new FormControl(
          null,
          Validators.required
          // this.validateWS_S.bind(this)
        ),
        description: new FormControl(null, Validators.required), // task Name
      },
      this.validateWorkFlowTaskForm.bind(this)
    ),
    workflowTaskChecklist: new FormGroup({
      checklistCategory: new FormControl(null),
      checklistDescription: new FormControl(null),
      checklistItems: new FormArray([]),
    }),
    workflowTaskCompany: new FormGroup({
      companiesAllowed: new FormArray([]), // company Allowed
    }),
    workflowTaskNext: new FormGroup({
      afterEvent: new FormControl(null),
      afterEventTime: new FormControl(null),
      nextTask: new FormControl(null),
    }),
  });
  onCompletionTriggers = [];
  workflowGroups = [];
  events = [];
  actions = [];
  userGroups = [];
  maintenanceFunctionLinks = [];
  checklistItems: FormArray;
  companieAllowed = [];
  users = [];
  checklist = [];
  item = [];
  loading = false;
  day: any;
  hours: any;
  minutes: any;
  code: string;
  taskcode: string;

  constructor(
    public appS: AppService,
    public route: ActivatedRoute,
    private taskSetupService: TaskSetupService,
    private userService: UserService,
    public utilityService: UtilityService,
    public pageS: PageService,
    private companyService: CompanyService
  ) {}

  async ngOnInit(): Promise<void> {
    this.code = this.route.snapshot.queryParamMap.get('code');
    this.workflowTaskForm.get('group').valueChanges.subscribe((r) => {
      if (r) this.workflowTaskForm.get('randomAssign').enable();
      else this.workflowTaskForm.get('randomAssign').disable();
    });
    // this.timeSubscribers();
    if (this.code) {
      await this.getTaskCode(this.code);
      if(!this.companiesAllowed?.length)this.addCompanyForm();
      if (!this.checklistItems?.length) this.itemsInc();
    }else{
      this.addCompanyForm();
      this.itemsInc();
    }
    this.fetchOnCompletionTriggers();
    this.fetchWorkflowGroups();
    this.fetchEvents();
    this.fetchActions();
    this.getDefaultUsers();
    this.getDefaultUserGroup();
    this.fetchMaintenanceFunctionLinks();
    this.fetchCompaniesAllowed();
    this.fetchChecklist();
    this.onChangeChecklist(this.taskSetupForm.value.checklistItems);
  }
  validateWorkFlowTaskForm(form: FormGroup) {
    const controls: { [x: string]: AbstractControl } = {
      firstOrderEscalateAfter: form.get('firstOrderEscalateAfter'),
      ifUnclosedAfter: form.get('ifUnclosedAfter'),
      originalSla: form.get('originalSla'),
      secondOrderEscalateAfter: form.get('secondOrderEscalateAfter'),
      warningSla: form.get('warningSla'),
    };
    const vals: { [x: string]: number } = {
      firstOrderEscalateAfter: this.utilityService.hourMinToMinutes2(
        form.getRawValue().firstOrderEscalateAfter?.toString()
      ),
      ifUnclosedAfter: this.utilityService.hourMinToMinutes2(
        form.getRawValue().ifUnclosedAfter?.toString()
      ),
      originalSla: this.utilityService.hourMinToMinutes2(
        form.getRawValue().originalSla?.toString()
      ),
      secondOrderEscalateAfter: this.utilityService.hourMinToMinutes2(
        form.getRawValue().secondOrderEscalateAfter?.toString()
      ),
      warningSla: this.utilityService.hourMinToMinutes2(
        form.getRawValue().warningSla?.toString()
      ),
    };
    if (!Object.keys(vals).some((x) => vals[x] != null)) return;
    // console.log(controls, vals);
    const validate = (
      lField: string,
      gField: string,
      validator: (control?: AbstractControl) => {
        custom: string;
      }
    ) => {
      if (vals[lField] != null && vals[gField] != null) {
        // debugger
        const gCustomError = controls[gField].getError('custom');
        const lCustomError = controls[lField].getError('custom');
        if (vals[lField] < vals[gField]) {
          if (
            (gCustomError && gCustomError == validator().custom) ||
            (lCustomError && lCustomError == validator().custom)
          ) {
            controls[gField].setErrors(null);
            controls[lField].setErrors(null);
            setTimeout(() => {
              form.updateValueAndValidity();
            }, 100);
          }
        } else {
          // debugger;
          if (
            gCustomError != validator().custom ||
            lCustomError != validator().custom
          ) {
            controls[gField].setErrors(validator());
            controls[lField].setErrors(validator());
            setTimeout(() => {
              form.updateValueAndValidity();
            }, 100);
          }
        }
      }
    };
    validate('warningSla', 'originalSla', this.validateWS_S);
    validate('originalSla', 'firstOrderEscalateAfter', this.validateS_FOE);
    validate(
      'firstOrderEscalateAfter',
      'secondOrderEscalateAfter',
      this.validateFOE_SOE
    );
    validate(
      'secondOrderEscalateAfter',
      'ifUnclosedAfter',
      this.validateSOE_IUA
    );
  }
  validateWS_S(control?: AbstractControl) {
    return { custom: 'Warning SLA must be earlier than SLA' };
  }
  validateS_FOE(control?: AbstractControl) {
    return { custom: '1st Order Escalation must be later than SLA' };
  }
  validateFOE_SOE(control?: AbstractControl) {
    return {
      custom: '1st Order Escalation must be earlier than 2nd Order Escalation',
    };
  }
  validateSOE_IUA(control?: AbstractControl) {
    return {
      custom: 'If Unclosed After must be later than 2nd Order Escalation',
    };
  }
  async getTaskCode(id: string) {
    this.loading = true;
    try {
      const res = await this.taskSetupService.getTaskCode(id).toPromise();
      if(!res) throw `Task Code ${id} could not be found`
      if (this.isClone) {
        delete res.workflowTask.code;
      }
      this.patchForm(res);
      if (this.isShow) {
        this.taskSetupForm.disable({ emitEvent: true });
        this.taskSetupForm.get(['workflowTask', 'user']).disable();
      } 
    } catch (error) {
      console.log(error);
      await this.utilityService.info(error, 0);
      this.utilityService.back();
    }
    this.loading = false;
  }

  get workflowTaskForm() {
    return this.taskSetupForm.controls.workflowTask as FormGroup;
  }
  get workflowTaskNextForm() {
    return this.taskSetupForm.controls.workflowTaskNext as FormGroup;
  }
  get workflowTaskChecklistForm() {
    return this.taskSetupForm.controls.workflowTaskChecklist as FormGroup;
  }
  getDefaultUsers() {
    this.userService.getAllUserCodeAndFullName().subscribe((data: any) => {
      this.users = data;
      console.log('users', data);
    });
  }

  getDefaultUserGroup() {
    this.taskSetupService.getDefaultUserGroup().subscribe((data: any) => {
      this.userGroups = data;
      console.log('user groups', data);
    });
  }

  catCounter() {
    return new Array(this.nbofcats);
  }
  get companiesAllowed() {
    return this.taskSetupForm.get([
      'workflowTaskCompany',
      'companiesAllowed',
    ]) as FormArray;
  }

  addCompanyForm(ele?, index = this.companiesAllowed?.length) {

    const form = new FormGroup({
      item: new FormControl(null, Validators.required),
    });
    if (ele) 
    form.patchValue({item:ele})
    this.companiesAllowed.insert(index, form);
  }

  catDec(index: number) {
    this.companiesAllowed.removeAt(index);
  }

  itemsCounter() {
    return new Array(this.nbofitems);
  }

  itemsInc(ele?, index: number = this.checklistItems?.controls?.length || 0) {
    console.log(this.taskSetupForm);

    this.checklistItems = this.taskSetupForm.controls.workflowTaskChecklist.get(
      'checklistItems'
    ) as FormArray;
    console.log(this.checklistItems);
    const form = new FormGroup({
      item: new FormControl(null),
      mandatory: configForms.boolean(false),
      checklistItemsDescription: new FormControl(null),
    });
    if (ele) form.patchValue(ele);
    this.checklistItems.insert(index, form);
    console.log(form);
  }
  itemsRemove(index: number) {
    this.checklistItems.removeAt(index);
  }
  patchChecklistItem(index: number) {
    const control = this.checklistItems.controls[index];
    control.patchValue({
      checklistItemsDescription: this.item.find(
        (x) => x.code == control.value.item
      )?.title,
    });
    console.log(this.taskSetupForm);
  }
  fetchOnCompletionTriggers() {
    this.taskSetupService.getOnCompletionTriggers().subscribe((data) => {
      this.onCompletionTriggers = data;
    });
  }

  fetchWorkflowGroups() {
    this.taskSetupService.getWorkflowGroups().subscribe((data) => {
      this.workflowGroups = data;
    });
  }

  fetchEvents() {
    this.taskSetupService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  fetchActions() {
    this.taskSetupService.getActions().subscribe((data) => {
      this.actions = data;
    });
  }

  fetchMaintenanceFunctionLinks() {
    this.taskSetupService.getMaintenanceFunctionLinks().subscribe((data) => {
      this.maintenanceFunctionLinks = data;
    });
  }

  fetchCompaniesAllowed() {
    this.companyService.getCompanyCodeAndDesc().subscribe((data) => {
      this.companieAllowed = data;
    });
  }

  fetchChecklist() {
    this.taskSetupService.getWorkflowChecklist().subscribe((data) => {
      this.checklist = data;
    });
  }
  onChangeChecklist(event) {
    const code = event?.target?.value;
    this.workflowTaskChecklistForm.controls.checklistDescription.reset();
    if (code) {
      this.taskSetupService
        .getWorkflowChecklistByCode(code)
        .subscribe((data) => {
          this.item = data;
        });
      this.workflowTaskChecklistForm.controls.checklistDescription.patchValue(
        this.checklist.find((x) => x.code == code).description
      );
    }
    console.log('check list code:', code);
  }

  fetchCheck(code) {
    this.taskSetupService.getCheck(code).subscribe((data) => {
      this.item = data;
    });
  }
  formatPayload(data: ITaskSetupPayload) {
    data.workflowTaskCompany.companiesAllowed =
      data.workflowTaskCompany?.companiesAllowed?.map((x: any) => x?.item);
    if (!data.workflowTaskNext.afterEventTime)
      data.workflowTaskNext.afterEventTime = '0:0';
    if (!data.workflowTask.ifUnclosedAfter)
      data.workflowTask.ifUnclosedAfter = '0:0';
  }
  get isShow() {
    return this.pageS.isShow(this.route);
  }
  get isCreate() {
    return this.pageS.isCreate(this.route);
  }
  get isEdit() {
    return this.pageS.isEdit(this.route);
  }
  get isClone() {
    return this.pageS.isClone(this.route);
  }
  async submit() {
    this.loading = true;
    try {
      const payload: ITaskSetupPayload = this.taskSetupForm.value;
      this.formatPayload(payload);
      const res = await (this.isEdit
        ? this.taskSetupService.updateTaskCode(this.code, payload).toPromise()
        : this.taskSetupService.saveTaskCode(payload).toPromise());
      this.utilityService.info(
        `Task Setup ${res?.workflowTask?.code} has been saved successfully`,
        1
      );
      if (environment.production) {
        this.utilityService.router.navigate(['../show'], {
          queryParams: { code: res?.workflowTask?.code },
          relativeTo: this.route,
        });
      }
    } catch (error) {
      console.log(error);
      this.utilityService.info('An Error occured', 0);
    }
    this.loading = false;
  }

  patchForm(data: any) {
    this.fetchCheck(data?.workflowTaskChecklist?.checklistCategory);
    this.taskcode = data?.workflowTask?.code;
    if (data?.workflowTaskCompany?.companiesAllowed?.length > 0) {
      console.log('demo currencyAllowed ');
      data?.workflowTaskCompany?.companiesAllowed.forEach((ele) => {
        // debugger
        this.addCompanyForm(ele); 
      });
    }

    if (data?.workflowTaskChecklist?.checklistItems?.length > 0) {
      console.log('demo currencyAllowed ');
      data?.workflowTaskChecklist?.checklistItems.forEach((ele, index) => {
        if (data?.workflowTaskChecklist?.checklistItems?.length - 1 != index) {
          this.itemsInc(ele);
        }
      });
    }

    this.taskSetupForm.patchValue(data);
  }

  getDay(value: any) {
    return (this.day = value.substring(0, 2));
  }
  getHours(value: any) {
    return (this.hours = value.substring(2, 4));
  }
  getMinutes(value: any) {
    return (this.minutes = value.substring(4, 6));
  }
  /*  getTimeAndHour(data){
    let value = data?.taskSetupForm?.workflowTask

    var day = value.substring(0, 2);
    var hour = value.substring(2, 4);
    var minutes = value.substring(4, 6);
  } */

  get pageMode(): 'create' | 'show' | 'clone' {
    if (this.isClone) return 'clone';
    if (this.code) return 'show';
    return 'create';
  }
}
