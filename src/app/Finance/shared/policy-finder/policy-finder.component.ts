import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { PolicyService } from 'src/app/Services/cash/policy.service';

@Component({
  selector: 'app-policy-finder',
  templateUrl: './policy-finder.component.html',
  styleUrls: ['./policy-finder.component.scss']
})
export class PolicyFinderComponent implements OnInit {
  ownerName;
  policies: any[] = []
  loading: boolean = false;

  constructor(private policyService: PolicyService, private dialogRef: MatDialogRef<PolicyFinderComponent> ) { }

  ngOnInit(): void {
  }

  findPolicy(){
    if (!this.ownerName) return

    this.loading = true
    this.policyService.findPolicyByOwnerName(this.ownerName).subscribe(
      (res: any) => this.policies = res
    ).add(() => this.loading = false)
  }

  onSelectPolicy(policy){
    this.dialogRef.close(policy)
  }

}
