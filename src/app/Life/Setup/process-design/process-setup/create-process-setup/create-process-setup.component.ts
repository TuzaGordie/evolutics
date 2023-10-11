import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { ProcessSetupData, ProcessSetupEvent } from '../processSetup.interface';
import { ProcessSetupService } from '../processSetup.service';

@Component({
  selector: 'app-create-process-setup',
  templateUrl: './create-process-setup.component.html',
  styleUrls: ['./create-process-setup.component.scss'],
})
export class CreateSetupsProcessSetupComponent
  extends PageTemplateComponent
  implements OnInit
{
  // editMode = true;
  // showEditButton = false;

  @ViewChild('processForm') form: NgForm;
  isSavingBasic: boolean = false;
  loading = false;
  loadingText = '';
  disableTableSection = true;

  changeMeLater;
  constructor(
    private processSetupService: ProcessSetupService,
    public util: UtilityService,
    public localStorage: StorageService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(route, util);
  }

  public processGroupArray: any[] = [];
  public groupConditionArray: any[] = [[]];
  public pFiltersArray: any[] = [];
  public pFiltersClassArray: any[] = [];
  public coverCodeArray: any[] = [];
  public companyFilterArray: any[] = [];
  public systemUserArray: any[] = [];
  public triggerCatArray: any[] = [];
  public triggerArrays: any = {};
  public policyStatusArray: any[] = [];
  public whenArray: any[] = [];

  public processSetupData: ProcessSetupData = {
    processSetup: {
      code: '',
      description: '',
      group: '',
      groupCond: '',
      coverCode: '',
      companyCode: '',
      productClass: '',
      productCode: '',
      system: false,

      active: '',
      authBy: '',
      authOn: '',
      eventCode: '',
      slaGroup: 0,
    },
    processSetupEvent: [
      {
        triggerCat: '',
        when: '',
        duration: 0,
        policyStatus: '',
        triggerEvent: '',
        eventCode: '',
        rowId: 0,

        id: 0,
        processSetupId: 0,
      },
    ],
  };

  ngAfterViewInit(): void {
    super.init(async () => {
      if (this.code) {
        this.fetchProcessSetup(this.code);
        // using setTimeout to allow angular pickup the change in the next cycle
        if (this.isShow) setTimeout(() => this.form.form.disable(), 0);
        // if (this.isEdit) setTimeout(() => this.form.form.enable(), 0);

      }
    });
  }

  ngOnInit(): void {
    this.processSetupService
      .getCodeAndTitleByCodeSubgroup('PROCESS_SETUP_GROUP')
      .subscribe((res: any[]) => {
        this.processGroupArray = res;
      });
    this.processSetupService
      .getCodeAndTitleByCodeSubgroup('PRODUCT_CLASS')
      .subscribe((res: any[]) => {
        this.pFiltersClassArray = res;
      });
    this.processSetupService
      .getCodeAndTitleByCodeGroupAndSubgroup('EVENTS', 'GROUP_CONDITION')
      .subscribe((res: any[]) => {
        this.groupConditionArray = res;
      });
    this.processSetupService
      .getCompanyCodeAndDescription()
      .subscribe((res: any[]) => {
        this.companyFilterArray = res;
      });
    this.processSetupService
      .getCoverAndCodeDescription()
      .subscribe((res: any[]) => {
        this.coverCodeArray = res;
      });
    this.processSetupService
      .getCodeAndTitleByCodeSubgroup('EVENT_TRIGGER')
      .subscribe((res: any[]) => {
        this.triggerCatArray = res;
      });

    this.processSetupService
      .getCodeAndTitleByCodeSubgroup('WHEN')
      .subscribe((res: any[]) => {
        this.whenArray = res;
      });
    this.processSetupService
      .getStatusCodeAndDescriptionStatusCat('P')
      .subscribe((res: any[]) => {
        this.policyStatusArray = res;
      });
    this.getProductCodesArray()
  }

  fetchProcessSetup(code: string) {
    this.loading = true;
    this.loadingText = 'Fetching process Setup....';
    this.processSetupService
      .getProcessSetup(code)
      .subscribe(
        (res: ProcessSetupData) => {
          this.processSetupData.processSetup = res.processSetup;
          this.processSetupData.processSetupEvent = [];

          if (this.isClone) {
            delete this.processSetupData.processSetup.id;
            delete this.processSetupData.processSetup.code;
          }

          res.processSetupEvent.map((processSetupEvent) => {
            if (this.isClone) delete processSetupEvent.id;
            processSetupEvent.rowId =
              this.processSetupData.processSetupEvent.length + 1;
            this.processSetupData.processSetupEvent.push(processSetupEvent);
          });

          if (this.processSetupData.processSetupEvent.length < 1)
            this.addProcessEvent();

          // this.onProductClassFilterChange();
        },
        () => {
          this.util.notify('Error, Please try again later!', 0, 5000, 'fail');
          // this.router.navigate(['../create-process-setup'], {
          //   relativeTo: this.route,
          // });
        }
      )
      .add(() => (this.loading = false));
  }

  changeTriggerCategory(event: string) {
    this.processSetupService
      .getCodeAndTitleByCodeSubgroupAndCodeCat('EVENT_TRIGGER', event)
      .subscribe((res: any[]) => {
        this.groupConditionArray = res;
      });
  }

  // REASON FOR COMMENTING OUT: productCode array is now independent of companyCode
  // changeCompanyFilter(event: string) {
  //   this.processSetupService
  //     .getAllCodeAndDescriptionByCompanyCode(event)
  //     .subscribe((res: any[]) => {
  //       this.pFiltersArray = res;
  //     });
  // }

  addProcessEvent() {
    console.log('EVENT::::', this.processSetupData.processSetupEvent);
    this.processSetupData.processSetupEvent.push({
      duration: 0,
      eventCode: '',
      id: null,
      policyStatus: '',
      processSetupId: 0,
      triggerCat: '',
      triggerEvent: '',
      when: '',
      rowId: this.processSetupData.processSetupEvent.length + 1,
    });
  }

  async deleteProcessEvent(index: number) {
    if (this.isEdit) {
      if (this.processSetupData.processSetupEvent[index].id != null) {
        if (
          await this.util.confirm('Do you want to delete this process event?')
        ) {
          this.processSetupService
            .deleteProcessEventById(
              this.processSetupData.processSetupEvent[index].id
            )
            .subscribe(
              () => {
                this.util.notify('Deleted successfully!.', 1);
                this.processSetupData.processSetupEvent.splice(index, 1);
              },
              () => this.util.notify('Internal server error!.', 0)
            );
        }
      } else this.processSetupData.processSetupEvent.splice(index, 1);
    }
  }

  createProcess() {
    // if (this.form.form.invalid) {
    //   this.util.notify("Error, This form Is INVALID!", 0, 5000, "fail")
    //   return
    // }

    this.loading = true;
    this.loadingText = 'Saving Process Setup....';

    this.processSetupService
      .createProcess(this.processSetupData)
      .subscribe(
        (data: ProcessSetupData) => {
          this.util.info(
            `Process ${data.processSetup.code} has been saved successfully`,
            1
          );
          this.processSetupData.processSetup = data.processSetup;
          this.processSetupData.processSetupEvent = [];

          data.processSetupEvent.map((setup) => {
            setup.rowId = this.processSetupData.processSetupEvent.length + 1;
            this.processSetupData.processSetupEvent.push(setup);
          });

          if (this.processSetupData.processSetupEvent.length < 1)
            this.addProcessEvent();
        },
        () => {
          this.util.info('Error, Please try again later!', 0);
        }
      )
      .add(() => (this.loading = false));
  }

  saveBasicSection() {
    // validation
    if (this.form.form.invalid){
      this.form.form.markAllAsTouched()
      this.util.notify("Kindly fill all required values", 0)
      return;
    }
    this.isSavingBasic = true;

    console.log("this.processSetupData: ", this.processSetupData)
    this.processSetupService
      .createProcess(this.processSetupData)
      .subscribe(
        (data: ProcessSetupData) => {
          this.util.info(
            `Process ${data.processSetup.code} has been saved successfully`,
            1
          );
          this.processSetupData.processSetup = data.processSetup;
          this.processSetupData.processSetupEvent = [];

          data.processSetupEvent.map((setup) => {
            setup.rowId = this.processSetupData.processSetupEvent.length + 1;
            this.processSetupData.processSetupEvent.push(setup);
          });

          if (this.processSetupData.processSetupEvent.length < 1)
            this.addProcessEvent();

          // this.showEditButton = true;
          // this.editMode = false;
          this.disableTableSection = false;
        },
        () => {
          this.util.info('Error, Please try again later!', 0);
        }
      )
      .add(() => (this.isSavingBasic = false));
  }

  // REASON FOR COMMENTING OUT: productCode list is now independent of productClass
  // onProductClassFilterChange() {
  //   this.processSetupService
  //     .getProductCodesByClass(this.processSetupData.processSetup.productClass)
  //     .subscribe((res) => (this.pFiltersArray = res));
  // }

  getProductCodesArray(){
    this.processSetupService.getAllProductCodes().subscribe(
      res => this.pFiltersArray = res
    )
  }

  onTriggerCatChange({ triggerCat, rowId }) {
    console.log('item from nkewa: ', triggerCat);
    let response$;
    switch (triggerCat) {
      case 'PN':
        response$ = this.processSetupService.getProcessNodes();
        break;
      case 'WFA':
      case 'WFC':
        response$ = this.processSetupService.getWorkflowTasks();
        break;
      case 'FA':
        response$ = this.processSetupService.getFutureActivities();
        break;
      default:
        return;
    }
    response$.subscribe((res) => (this.triggerArrays[rowId] = res));
  }

  fetchCatChange=(triggerCat) =>{ 
    let response$:Observable<any[]>;
    switch (triggerCat) {
      case 'PN':
        response$ = this.processSetupService.getProcessNodes();
        break;
      case 'WFA':
      case 'WFC':
        response$ = this.processSetupService.getWorkflowTasks();
        break;
      case 'FA':
        response$ = this.processSetupService.getFutureActivities();
        break;
      default:
        response$ = of([]);
    }
   return response$.toPromise()
  }

  toggleEditMode(){
    if (this.form.form.disabled){
      this.form.form.enable()
    }else{
      this.form.form.disable()
    }
  }

  onFilterChange(event){
    // disable fields which cannot be selected together with the field which was just selected

    const controls = this.form.form.controls;
    switch(event.target.name){
      case 'companyFilter':
      case 'pClassFilter':
        // depending on value, toggle pFilter and coverCode
        if (controls['companyFilter'].value){
          controls['pFilter'].disable();
          controls['coverCode'].disable();
          // reset their values
          controls['pFilter'].patchValue('');
          controls['coverCode'].patchValue('');
        }else{
          controls['pFilter'].enable();
          controls['coverCode'].enable();
        }
        break;

      case 'groupCondition':
        // do nothing. It works with all fields
        break;   

      case 'pFilter':
        // depending on value, toggle companyFilter, productClass, coverCode
        if (controls['pFilter'].value){
          controls['companyFilter'].disable();
          controls['pClassFilter'].disable();
          controls['coverCode'].disable();
          // reset their values
          controls['companyFilter'].patchValue('');
          controls['pClassFilter'].patchValue('');
          controls['coverCode'].patchValue('');
        }else{
          controls['companyFilter'].enable();
          controls['pClassFilter'].enable();
          controls['coverCode'].enable();
        }
        break;

      case 'coverCode':
        // depending on value, toggle companyFilter, productClass, productCode
        if (controls['coverCode'].value){
          controls['companyFilter'].disable();
          controls['pClassFilter'].disable();
          controls['pFilter'].disable();
          // reset their values
          controls['companyFilter'].patchValue('');
          controls['pClassFilter'].patchValue('');
          controls['pFilter'].patchValue('');
        }else{
          controls['companyFilter'].enable();
          controls['pClassFilter'].enable();
          controls['pFilter'].enable();
        }
        break;
    }
  }
}
