import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { ProcessAction } from '../processAction.interface';
import { ProcessActionService } from '../processAction.service';

@Component({
  selector: 'app-create-process-actions',
  templateUrl: './create-process-actions.component.html',
  styleUrls: ['./create-process-actions.component.scss'],
})
export class CreateProcessActionsComponent
  extends PageTemplateComponent
  implements OnInit
{
  @ViewChild('processActionForm') form: NgForm;
  public actionArray: any[] = [];
  public documentCodeArray: any[] = [];
  public batchArray: any[] = [];
  public workflowTaskCodeArray: any[] = [];
  public processActions: ProcessAction[];

  loading = false;
  loadingText = '';

  processSetup = {
    description: '',
    group: '',
    code: '',
    eventCode: '',
  };

  /**
   *
   * @param data
   * @param {{ProcessActionService}} processActionService
   */
  constructor(
    private processActionService: ProcessActionService,
    public route: ActivatedRoute,
    public util: UtilityService,
    private localStorage: StorageService
  ) {
    super(route, util);
  }

  ngOnInit(): void {
    this.getProcessActionsList();
    this.getBatchesList();
    this.getWorkflowsList();
    this.getCorrespondencesList();
  }

  ngAfterViewInit(): void {
    super.init(async () => {
      if (this.code) {
        this.fetchProcessSetup(this.code);
        this.fetchProcessActions(this.code);
        if (this.isShow) this.form.form.disable();
      }
    });
  }

  getProcessSetupEventByCode(code: string) {
    return this.processActionService
      .getProcessSetupEventByProcessCode(code)
  }

  fetchProcessSetup(code: string) {
    this.processActionService
      .getProcessSetupByProcessCode(code)
      .subscribe((res: any) => {
        this.processSetup = res;
      });
  }

  fetchProcessActions(code: string){
    this.processActionService
          .getProcessSetupActionBy(code)
          .pipe(mergeMap((res) => {
            // if the processActions endpoint returns no data or an empty array, then call the eventCodes endpoint and pass it as processArray
            // else use the data returned by processArray endpoint
            if (!res?.length){
              return this.getProcessSetupEventByCode(code)
            }else{
              return of(res)
            }
          }))
          .subscribe((data: ProcessAction[]) => {
            this.processActions = [];
            data.map((act, i) => {
              act.rowId = this.processActions.length + 1;
              this.processActions.push(act);
            });

            // if no process action was received, insert one empty row
            if (!this.processActions.length) {
              this.processActions.push({ rowId: 1 } as ProcessAction);
            }
          });
  }

  changedAction(action, item) {
    // reset values of disabled dropdowns
    switch(action){
      case 'TB':
        item.docCodeLinked = '';
        item.workFlowLinked = '';
        break;
      case 'TC':
        item.batchLinked = '';
        item.workFlowLinked = '';
        break;
      case 'TW':
        item.batchLinked = '';
        item.docCodeLinked = '';
        break;
      case 'TR':
      default:
        item.batchLinked = '';
        item.docCodeLinked = '';
        item.workFlowLinked = '';
    }
  }

  getProcessActionsList(){
    this.processActionService
      .getCodeAndTitleByCodeSubgroup('PROCESS_ACTION ')
      .subscribe((res: []) => {
        this.actionArray = res;
      });
  }

  getBatchesList(){
    this.processActionService
      .getAllBatchCodesAndDescription()
      .subscribe((res: []) => {
        this.batchArray = res;
      });
  }

  getWorkflowsList(){
    this.processActionService
        .getAllCodeAndDescription()
        .subscribe((res: []) => {
          this.workflowTaskCodeArray = res;
        });
  }

  getCorrespondencesList(){
    this.processActionService
        .getAllCorrespondenceCodeAndDescription()
        .subscribe((res: []) => {
          this.documentCodeArray = res;
        });
  }

  // addFilter() {
  //   this.processActions.push({
  //     eventCode: this.processSetup.eventCode,
  //     eventAction: '',
  //     docCodeLinked: '',
  //     batchLinked: '',
  //     workFlowLinked: '',
  //     rowId: this.processActions.length + 1,
  //     code: this.processSetup.code,
  //   });
  // }

  // deleteFilter(i: number) {
  //   this.processActions.splice(i, 1);
  // }

  createProcessAction() {
    if (this.form.form.invalid) {
      this.util.notify('Please complete the form', 0, 5000, 'fail');
      return;
    }

    this.processActions.map((act) => {
      act.code = this.processSetup.code;
      return act;
    });

    this.loading = true;
    this.loadingText = 'Saving Process Actions.....';

    this.processActionService
      .createProcessAction(this.processActions)
      .subscribe(
        (data: ProcessAction[]) => {
          this.processActions = [];
          data.map((act) => {
            act.rowId = this.processActions.length + 1;
            this.processActions.push(act);
          });

          this.util.info(
            'You have Successfully saved Process Action(s)! Count: ' +
              this.processActions.length,
            1
          );
        },
        () => {
          this.util.info('Error, Please try again later!', 0);
        }
      )
      .add(() => (this.loading = false));
  }
  toggleEditMode(){
    if (this.form.form.disabled){
      this.form.form.enable()
    }else{
      this.form.form.disable()
    }
  }
}
