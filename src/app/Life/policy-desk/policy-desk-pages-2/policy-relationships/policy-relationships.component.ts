import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from '../../../../Shared/models/form.class';
import { TableCol, FCInput } from '../../../../Shared/models/index.model';
import { PolicyEndpointsService } from '../../policy-desk-extras/policy-endpoints.service';

@Component({
  selector: 'app-policy-relationships',
  templateUrl: './policy-relationships.component.html',
  styleUrls: ['./policy-relationships.component.scss'],
})
export class PolicyRelationshipsComponent implements OnInit {
  list: any[] = [];
  slist = [];
  dCols: TableCol[] = [
    new TableCol('Client', 'relClient'),
    new TableCol('Relationship Type', 'type'),
    new TableCol('Relationship Date', 'relDate'),
  ];
  name = '';

  constructor(
    public pdS: UtilityService,
    public activatedRoute: ActivatedRoute,
    public pS: PolicyEndpointsService,
    public cS: ClientService
  ) {}
  async ngOnInit(): Promise<void> {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const details = {
      policyNo: queryParams.get('policyNo'),
      quoteNo: queryParams.get('quoteNo'),
      policyCode: queryParams.get('policyCode'),
      clientNo: queryParams.get('clientNo'),
      policyID: queryParams.get('policyID'),
      owner: queryParams.get('owner'),
      pcd: queryParams.get('pcd'),
      pfreq: queryParams.get('pfreq'),
    };
    this.name = details.owner;
    const relationships = await this.pS
      .getRelatedClients(details.policyNo)
      .toPromise();
    relationships.forEach(
      async (rel) =>
        (rel.relClient = await this.cS
          .getClientNameByNum(rel.relClient)
          .toPromise())
    );
    // console.log(relationships);
    let rels = [];
    const nrelationships = relationships.map(async (item) => {
      item.relClient = await this.cS
        .getClientNameByNum(item.relClient)
        .toPromise();
      console.log(item);
      rels.push(item);
    });
    console.log(nrelationships);
    this.list = relationships;
    console.log(this.list, rels, relationships);
    // this.dCols.map((x) => relationships[x.f]);
  }
}
