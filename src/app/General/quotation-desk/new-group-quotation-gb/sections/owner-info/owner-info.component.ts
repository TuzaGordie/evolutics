import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClientDetails } from 'src/app/General/services/quotation.interface';

@Component({
  selector: 'g-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss']
})
export class GroupOwnerInfoComponent implements OnInit {
  ownerDetails: IClientDetails
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.data)
    this.ownerDetails = this.route.snapshot.data['ownerDetails']
  }
}
