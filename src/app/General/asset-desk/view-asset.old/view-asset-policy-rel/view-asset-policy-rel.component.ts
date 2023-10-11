import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {FindClientService} from "../../../../Life/client-desk/service/find-client.service";
import {ActivatedRoute} from "@angular/router";
import {HelpersService} from "../../../../Life/client-desk/service/helpers.service";
import {HttpErrorResponse} from "@angular/common/http";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-view-asset-policy-rel',
  templateUrl: './view-asset-policy-rel.component.html',
  styleUrls: ['./view-asset-policy-rel.component.scss']
})
export class ViewAssetPolicyRelComponent implements OnInit {
  RELATIONSHIP_TYPES;
  clientRelationshipsForm: FormArray = new FormArray([]);
  clientFullName: string;
  newRelationsList: FormGroup[] = [];
  clientNo: string;


  constructor(public findClientService: FindClientService, public route: ActivatedRoute, private helpersService: HelpersService) {
    this.RELATIONSHIP_TYPES = this.helpersService.RELATIONSHIP_TYPES;
  }

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.paramMap.get("id");
    console.log('param id', this.clientNo)
    this.setRelationship(this.clientNo)
    this.setClientFullName(this.clientNo)
  }

  setRelationship(id) {
    this.findClientService.getRelationshipApi(id)
      .subscribe(
        (res: any[]) => {
          console.log('response gotten from getClientRelationships service', res)
          if (Array.isArray(res)) {
            res.forEach((relation) => {
              this.clientRelationshipsForm.push(new FormGroup(
                {
                  clientNo: new FormControl(relation?.clientNo),
                  relationship: new FormControl(relation?.relationship),
                  category: new FormControl(relation?.category),
                  fullName: new FormControl(relation?.fullName),
                  email: new FormControl(relation?.email),
                  phoneNumber: new FormControl(relation?.phoneNumber),
                  id: new FormControl(relation?.id),
                  clientStatus: new FormControl(relation?.clientStatus),
                  policyNo: new FormControl(relation?.policyNo),
                  codeTitle: new FormControl(relation?.codeTitle),
                  policyCode: new FormControl(relation?.policyCode),
                  relClientNo: new FormControl(relation?.relClientNo),
                  relDt: new FormControl(relation?.reDt),
                }
              ))
            })
          }
        },
        (err: HttpErrorResponse) => console.log("error fetching relations for clientNo:" + id, err)
      )
  }

  setClientFullName(clientNo) {
    this.findClientService.getClientViewData(clientNo)
      .pipe(map(res => res?.fullName))
      .subscribe(
        (fullName: string) => this.clientFullName = fullName,
        (err: HttpErrorResponse) => console.log("Error fetching client's full name for client number: " + clientNo, err)
      )
  }

  onSaveNewRelation(relationForm: FormGroup) {
    console.log('about to add this new relation', relationForm)
    // TODO send update the db first
    this.clientRelationshipsForm.push(relationForm);
  }

  addNewRelationForm() {
    this.newRelationsList.push(new FormGroup({
      clientNo: new FormControl(this.clientNo),
      fullName: new FormControl(null),
      relationship: new FormControl(null),
      email: new FormControl(null),
      relClientNo: new FormControl(null),
      clientStatus: new FormControl(null),
      relDt: new FormControl(null),
    }))
  }
}
