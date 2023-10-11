import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import {tap, map, catchError } from 'rxjs/operators';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { AgentFinderComponent } from '../../modals/agent-finder/agent-finder.component';
import { ClientFinderComponent } from '../../modals/client-finder/client-finder.component';

@Component({
  selector: 'g-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class GroupAgentComponent implements OnInit {
  faUpload = faUpload
  agentForm: FormGroup;
  agentNameFromCheck: string = '';
  referrerNameFromCheck: string = '';
  private nbofAgent: number = 1;
  agents: FormArray
  branchCode: any
  fileName: any
  agentDisabled: boolean
  referrerDisabled: boolean
  file: any
  relationshipmanagerList: any[] = [];
  subRelationshipmanagerList: any[] = [];
  isPrimary: boolean[] = []
  product: any
  quoteNo: any;
  constructor(
    private fb: FormBuilder,
    private qs: QuotationService,
    private utilityService: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc')
    }
    this.agents = this.fb.array([
      new FormGroup ({
        agentNo: new FormControl(null, Validators.required),
        agentName: new FormControl(null),
        proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
      })
    ])
    this.agentForm = this.fb.group({
      agents: this.agents,
      referrerCode: new FormControl(null, Validators.required, this.validateReferrerCode.bind(this)),
      commisionRate: new FormControl(null, Validators.required),
      branchCode: new FormControl(null, Validators.required),
      externalRef: new FormControl(null, Validators.required),
      subRelManager: new FormControl(null, Validators.required),
      su: new FormControl(null, Validators.required),
      document: new FormControl(null),
      policyRelManager: new FormArray([]),
    })
    this.isPrimary.push(true);
    this.getRelationshipManager();
    this.getSubRelationshipManager();
    this.setAgentData()
    this.addPolicyRelManager()
  }
  get policyRelManagerFA(){
    return this.agentForm.get('policyRelManager') as FormArray;
  }
  addPolicyRelManager(i=this.policyRelManagerFA.controls.length,d?){
    const form = new FormGroup({
      primary: new FormControl(),
      proportion: new FormControl(100),
      relManager: new FormControl(),
      subRelManager: new FormControl(),
    });
    if(d)form.patchValue(d);
    this.policyRelManagerFA.insert(i,form)
  }
  removePolicyRelManager(i  ){ 
    this.policyRelManagerFA.removeAt(i)
  }
  get formValue() {
    return this.agentForm.value
  }

  findAgent(form){
    console.log('form', form)
    const num = form.value.agentNo
    console.log(num)
    this.qs.getAgentName(num).subscribe( name => {
      form.patchValue({
        agentName: name
      })
    })
    this.qs.getBranchCode(this.agentForm.value.agents[0].agentNo).subscribe(data => {
      console.log(data)
      this.branchCode = data ? data : ''
      this.agentForm.get('branchCode').setValue(this.branchCode.branchCode)
    })

  }

  setAgentData(){
    this.qs.getDefaultOptions(this.product.code).subscribe(data => {
      console.log(data)
      if (data.writingAgentNo){
        this.agentDisabled = true
        this.agents.clear()
        this.agents.push(new FormGroup ({
          agentNo: new FormControl(data.writingAgentNo, Validators.required),
          agentName: new FormControl(null),
          proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
        }))
      } else {
        this.agentDisabled = false
        this.agents.clear()
        this.agents.push(new FormGroup ({
          agentNo: new FormControl(null, Validators.required),
          agentName: new FormControl(null),
          proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
        }))
      }

      if (data.referralAgentNo){
        console.log('here with', data.referralAgentNo)
        this.referrerDisabled = true
        this.agentForm.patchValue({
          referrerCode: data.referralAgentNo,
        })
      } else {
        this.referrerDisabled = false
      }
    }, () => {

        this.agentDisabled = false
        this.agents.clear()
        this.agents.push(new FormGroup ({
          agentNo: new FormControl(null, Validators.required),
          proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
          primaryAgent: new FormControl(true),
        }))

        this.referrerDisabled = false
      
    }, ()=>{
      this.findAgent(this.agents.controls[0])
    })
  }

  getRelationshipManager(){
    this.qs.getRelManager().subscribe((res: any) => {
       this.relationshipmanagerList = res?.page?.content
       console.log("RELATIONSHIP MANAGER"+JSON.stringify(res?.page?.content))
    });
  }

  getSubRelationshipManager(){
    this.qs.getRelManager().subscribe((res: any) => {
       this.subRelationshipmanagerList = res?.page?.content
    });
  }

  upload(event:any){
    let file = event.target.files[0];
    console.log("imagefile",file)
    console.log("imagepath",file.name)
    this.fileName = file.name
    this.file = file
  }

  validateAgentNo(control: AbstractControl): Observable<ValidationErrors | null> {
    this.agentNameFromCheck = ''
    return this.qs.getAgentName(control?.value).pipe(
      tap(data => {
        this.agentNameFromCheck = data as string
      }),
      map(data => {
        return data ? null : { valid: false }
      }),
      catchError(() => {
        this.agentNameFromCheck = ''
        return of({ valid: false })
      })
    );
  }
  validateReferrerCode(control: AbstractControl): Observable<ValidationErrors | null> {
    this.referrerNameFromCheck = ''
    return this.qs.getClientFullName(control?.value).pipe(
      tap(data => {
        this.referrerNameFromCheck = data as string
      }),
      map(data => {
        return data ? null : { valid: false }
      }),
      catchError(() => {
        this.agentNameFromCheck = ''
        return of({ valid: false })
      })
    );
  }



  agentCounter() {
    return new Array(this.nbofAgent);
  }

  agentInc() {
    if (!this.agentDisabled){
    const value = 100/(this.agents.length + 1)
    const b = new FormGroup({
      agentNo: new FormControl(null, Validators.required),
      agentName: new FormControl(null),
      proportion: new FormControl(value, [Validators.required, Validators.max(100), Validators.min(1)]),
    })
    const agents = <FormArray> this.agentForm.get('agents')
    for (let i = 0; i < this.agents.length; i++) {
      agents.controls[i].get('proportion').setValue(value)
    }

    // this.agent.push('')
    this.isPrimary.push(false)
    this.agents.push(b)
  }
  }

  removeAgent(i) {
    if(this.agents.length > 1 && this.isPrimary.includes(true)){
      if (!this.isPrimary[i]){
        if (!this.agentDisabled){
          this.agents.removeAt(i)
          this.isPrimary.splice(i, 1)
    
          const value = 100/(this.agents.length)
          const agents = <FormArray> this.agentForm.get('agents')
          for (let i = 0; i < this.agents.length; i++) {
            agents.controls[i].get('proportion').setValue(value)
          }
        }
      }
    }
  }


  checkPrimary(event: Event, i) {
    if (this.isPrimary.length > 1){
      if (this.isPrimary.includes(true)){
        console.log(this.isPrimary.indexOf(true))
        if (this.isPrimary.indexOf(true) == i){
          this.isPrimary[i] = !this.isPrimary[i]
        } else {
          event.preventDefault()
          this.isPrimary[i] = false
        }
      } else {
        this.isPrimary[i] = !this.isPrimary[i]
      }
    } else if (this.isPrimary.includes(true)) {
      event.preventDefault()
    }
  }

  openFindAgentModal(form){
    this.utilityService.dialogOpener(
      AgentFinderComponent,
      {width: '60vw'},
      ({agentNo, agentName}) => {
        form.patchValue({
          agentNo,
          agentName,
        })
      }
    )
  }

  openFindClientModal(){
    this.utilityService.dialogOpener(
      ClientFinderComponent,
      {width: '60vw'},
      ({clientNo, clientName}) => {
        this.agentForm.patchValue({
          referrerCode: clientNo
        })
        this.referrerNameFromCheck = clientName;
      }
    )
  }
}
