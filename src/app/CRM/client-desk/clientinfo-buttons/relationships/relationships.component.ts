import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.scss']
})
export class RelationshipsComponent implements OnInit {

  relationshipList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setRelationship()
  }
  setRelationship(){
    this.findClientService.getRelationship().subscribe( res => {
      this.relationshipList = res;
      console.log("relationshipList Info",res)
    })
  }

}