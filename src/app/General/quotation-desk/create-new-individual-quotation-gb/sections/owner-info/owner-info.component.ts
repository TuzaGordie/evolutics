import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClientDetails } from 'src/app/General/services/quotation.interface';

@Component({
  selector: 'q-individual-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss']
})
export class OwnerInfoComponent implements OnInit {
  clientDetails: IClientDetails
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['clientDetails']
  }

}
