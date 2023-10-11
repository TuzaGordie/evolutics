import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import {tap, map, catchError } from 'rxjs/operators';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';

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
  referrerDisabled: boolean = false
  isPrimary: boolean[] = []
  product: any
  quoteNo: any
  constructor(private fb: FormBuilder, private qs: QuotationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc')
    }
    this.agents = this.fb.array([
      new FormGroup ({
        agentNo: new FormControl(null, Validators.required, this.validateAgentNo.bind(this)),
        proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
      })
    ])
    this.isPrimary.push(true)
    this.agentForm = this.fb.group({
      agents: this.agents,
      referrerCode: new FormControl(null, Validators.required, this.validateReferrerCode.bind(this)),
      commisionRate: new FormControl(null, Validators.required),
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
      console.log(this.agent)
    })
    this.qs.getBranchCode(this.agentForm.value.agents[0].agentNo).subscribe(data => {
      console.log(data)
      this.branchCode = data ? data : ''
      this.agentForm.patchValue({branchCode: this.branchCode.branchCode})
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
          proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
          primaryAgent: new FormControl(true),
        }))
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
        this.findAgent(0)

        this.referrerDisabled = false
      
    })
  }

  upload(event:any){
    let file = event.target.files[0];
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

}