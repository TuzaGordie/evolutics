import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import {tap, map, catchError } from 'rxjs/operators';
import { QuotationService } from 'src/app/General/services/quotation-service.service';

@Component({
  selector: 'q-individual-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  faUpload = faUpload
  agentForm: FormGroup;
  agentNameFromCheck: string = '';
  referrerNameFromCheck: string = '';
  private nbofAgent: number = 1;
  agent: string[] = [''];
  agents: FormArray
  branchCode: any
  fileName: any
  file: any
  agentDisabled: boolean = false
  productCode: string;
  referrerDisabled: boolean = false;
  quoteNo: any;
  isPrimary: boolean[] = [];
  product: { code: string; description: string; };

  constructor(private fb: FormBuilder, private qs: QuotationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productCode = this.route.snapshot.queryParamMap.get('pcd');
    const queryParams = this.route.snapshot.queryParamMap;

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc')
    }
    this.agents = this.fb.array([
      new FormGroup ({
        agentNo: new FormControl(null, Validators.required),
        proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
        primaryAgent: new FormControl(true)
      })
    ])
    this.isPrimary.push(true)
    this.agentForm = this.fb.group({
      agents: this.agents,
      referrerNo: new FormControl(null, Validators.required, this.validateReferrerNo.bind(this)),
      commissionRate: new FormControl(null, Validators.required),
      branchCode: new FormControl(null, Validators.required),
      externalRef: new FormControl(null, Validators.required),
      document: new FormControl(null)
    })
    this.setAgentData()
  }
  get formValue() {
    return this.agentForm.value
  }

  // setBranchCode() {
  //   this.qs.getBranchCode(this.agentForm.value.agents[0].agentNo).subscribe( data => {
  //     console.log(data)
  //     this.agentForm.patchValue({branchCode: data})
  //   })
  // }

  findAgent(i){
    // this.setBranchCode()
    const num = this.agentForm.value.agents[i].agentNo
    this.qs.getAgentName(num).subscribe( data => {
      this.agent[i] = data
    })
    this.qs.getBranchCode(this.agentForm.value.agents[0].agentNo).subscribe(data => {
      console.log(data)
      this.branchCode = data ? data : ''
      this.agentForm.patchValue({branchCode: this.branchCode.branchCode})
    })
    
  }

  upload(event:any){
    let file = event.target.files[0];
    console.log("imagefile",file)
    console.log("imagepath",file.name)
    this.fileName = file.name
    this.file = file
  }
  validateReferrerNo(control: AbstractControl): Observable<ValidationErrors | null> {
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

  setAgentData(){
    this.qs.getDefaultOptions(this.productCode).subscribe(data => {
      if (data.writingAgentNo){
        this.agentDisabled = true
        this.agents.clear()
        this.agents.push(new FormGroup ({
          agentNo: new FormControl(data.writingAgentNo, Validators.required),
          proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
          primaryAgent: new FormControl(true),
        }))
        this.findAgent(0)
      } else {
        this.agentDisabled = false
        this.agents.clear()
        this.agents.push(new FormGroup ({
          agentNo: new FormControl(null, Validators.required),
          proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
          primaryAgent: new FormControl(true),
        }))
        this.findAgent(0)
      }

      if (data.referralAgentNo){
        this.referrerDisabled = true
        this.agentForm.patchValue({
          referrerNo: data.referralAgentNo,
        })
      }
    })
  }


  agentCounter() {
    return new Array(this.nbofAgent);
  }

  agentInc() {
    console.log('clicked')
    if (!this.agentDisabled) {
      const value = 100/(this.agents.length + 1)
      const b = new FormGroup({
        agentNo: new FormControl(null, Validators.required),
        proportion: new FormControl(value, [Validators.required, Validators.max(100), Validators.min(1)]),
      })
      const agents = <FormArray> this.agentForm.get('agents')
      for (let i = 0; i < this.agents.length; i++) {
        agents.controls[i].get('proportion').setValue(value)
      }
      
      this.agent.push('')
      this.isPrimary.push(false)
      this.agents.push(b)
      console.log(value)
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

  removeAgent(i) {
    if(this.agents.length > 1 && this.isPrimary.includes(true)){
      if (!this.isPrimary[i]){
        if (!this.agentDisabled){
          this.agents.removeAt(i)
          this.agent.splice(i, 1)
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

  onPrimaryChange(i){
    const thisAgent = this.agents.controls[i] as FormGroup;
    // if this is checked, uncheck all others
    if(thisAgent.controls['primaryAgent'].value == true){
      this.agents.controls.forEach(agent => {
        if (agent != thisAgent){
          (<FormGroup>agent).patchValue({
            primaryAgent: false
          })
        }
      })
    }
  }
}
