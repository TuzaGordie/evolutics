import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FindClientService } from '../../service/find-client.service';
import { HelpersService } from '../../service/helpers.service';

@Component({
  selector: 'app-relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.scss'],
})
export class RelationshipsComponent implements OnInit {
  RELATIONSHIP_TYPES;
  clientRelationshipsForm: FormArray = new FormArray([]);
  clientFullName: string;
  newRelationsList: FormGroup[] = [];
  clientNo: string;
  relationEditStatus = {}
  newRelationForm: FormGroup
  isCreatingNewRelation: boolean = false;
  showNewRelationForm: boolean = false;

  constructor(public findClientService:FindClientService,public route: ActivatedRoute, private helpersService: HelpersService) {
    this.RELATIONSHIP_TYPES = this.helpersService.RELATIONSHIP_TYPES;
  }

  ngOnInit(): void {
    this.clientNo =this.route.snapshot.paramMap.get("id");
    console.log('param id',this.clientNo)
    this.createNewRelationForm()
    this.setRelationship(this.clientNo)
    this.setClientFullName(this.clientNo)
  }

  setRelationship(id){
    this.findClientService.getRelationshipApi(id)
      .subscribe(
        (res: any[]) => {
          console.log('response gotten from getClientRelationships service', res)
          if (Array.isArray(res)){
            res.forEach((relation) => {
              this.clientRelationshipsForm.push(this.getRelationFormGroup(relation))
              this.relationEditStatus[relation.id] = 'VIEW' // display the edit button for this relation row
            })
          }
        },
        (err: HttpErrorResponse) => console.log("error fetching relations for clientNo:" + id, err)  
      )
  }

  createNewRelationForm(){
    this.newRelationForm = this.getRelationFormGroup({})
  }

  setClientFullName(clientNo){
    this.findClientService.getClientViewData(clientNo)
      .pipe(map(res => res?.fullName))
      .subscribe(
        (fullName: string) => this.clientFullName = fullName,
        (err: HttpErrorResponse) => console.log("Error fetching client's full name for client number: " + clientNo, err)
      )
  }

  onSaveNewRelation(){
    if (this.newRelationForm.invalid){
      this.newRelationForm.markAllAsTouched()
      return
    }
    console.log('about to add this new relation', this.newRelationForm.value)
    this.isCreatingNewRelation = true;
    this.findClientService.createClientRelationship(this.newRelationForm.value)
      .subscribe(
        (relation) => {
          this.clientRelationshipsForm.push(this.getRelationFormGroup(relation))
          this.newRelationForm.reset()
          this.isCreatingNewRelation = false
        },
        (err: HttpErrorResponse) => {
          console.log("error creating new relationship record", err)
          this.isCreatingNewRelation = false;
        }
      )
  }

  getRelationFormGroup(relation){
    return new FormGroup({
      clientNo: new FormControl(this.clientNo, Validators.required),
      relationship: new FormControl(relation.relationship, Validators.required),
      category: new FormControl(relation.category),
      fullName: new FormControl(relation.fullName, Validators.required),
      email: new FormControl(relation.email, Validators.required),
      phoneNumber: new FormControl(relation.phoneNumber),
      id: new FormControl(relation.id),
      clientStatus: new FormControl(relation.clientStatus),
      policyNo: new FormControl(relation.policyNo),
      codeTitle: new FormControl(relation.codeTitle),
      policyCode: new FormControl(relation.policyCode),
      relClientNo: new FormControl(relation.relClientNo, Validators.required),
      relDt: new FormControl(relation.relDt),
      userCode: new FormControl(relation.userCode),
      createdBy: new FormControl(relation.createdBy)
    })
  }

  updateRelation(relationControl: FormGroup){
    if (relationControl.invalid){
      relationControl.markAllAsTouched()
      return
    }
    const relation = relationControl.value
    this.relationEditStatus[relation.id] = 'PENDING'
    this.findClientService.updateClientRelationship(relation.id, relation)
      .subscribe(
        res => {
          relationControl.patchValue(this.getRelationFormGroup(res))
          this.relationEditStatus[relation.id] = 'VIEW'
        },
        (err: HttpErrorResponse) => {
          console.log("Error updating client relationship", err)
          this.relationEditStatus[relation.id] = 'EDITING'
        }
      )
  }

  isFieldInvalid(form, fieldName){
    return form.controls[fieldName].invalid && form.controls[fieldName].touched
  }
}
