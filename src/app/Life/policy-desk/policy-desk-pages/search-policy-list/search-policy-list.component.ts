import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyEndpointsService } from '../../policy-desk-extras/policy-endpoints.service';


@Component({
  selector: 'search-policy-list',
  templateUrl: './search-policy-list.component.html',
  styleUrls: ['./search-policy-list.component.scss'],
})
export class SearchPolicyListComponent implements OnInit {

  policyNo: string;

  pageNumber: number;
  pageSize: number;
  policyList: any;
  policies: any[] = [];
  policy: any;
  itemsPerPageParmeters: any[];

  connection = {
    creating: false,
    error: false,
    retrieving: false,
  };

  constructor( private router: Router, private policyDeskService: PolicyEndpointsService ) {}

  ngOnInit(): void {
    this.getPolicies();
    this.initializeVariables();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('searchPolicies');
  }

  initializeVariables() {
    this.pageSize = 10;
    this.pageNumber = 1;
  }

  findPolicy(policyNo) {
    this.connection.creating = true;

    this.policyDeskService.findPolicies(policyNo).subscribe((data: any) => {
      this.policy = data;
      localStorage.setItem('policy', JSON.stringify(this.policy))
      this.router.navigate(['life/view-policy']);
      this.connection.creating = false;
    });

  }

  getPolicies() {
    this.connection.creating = true;

    this.policyList = localStorage.getItem('searchPolicies');
    this.policies = JSON.parse(this.policyList);
    console.log('policies', this.policies);
  }

  saveParams(policyCode, policyNoSuffix) {
    let params = [policyCode, policyNoSuffix]
    localStorage.setItem('params', JSON.stringify(params))
  }

  getItemsPerPage() {
    this.itemsPerPageParmeters = [
      {number: '5'},
      {number: '10'},
      {number: '20'},
      {number: '50'},
      {number: '100'}
    ];
  }

  fetchAllRecords() {

  }
  
}
