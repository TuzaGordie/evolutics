import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BandService } from './band.service';

@Component({
  selector: 'app-index-agent-band',
  templateUrl: './index-agent-band.component.html',
  styleUrls: ['./index-agent-band.component.scss']
})
export class IndexSetupsAgentBandComponent implements OnInit {

  constructor(public router: Router, private bandService: BandService) { }

  dateBasis: any
  basis: any
  agentBand: { versionNo: string, dateBasis: string, date: string }[] = [{
    versionNo: "", dateBasis: "", date: ""
  }]

  bandBasisFactor: { band: string, basis: string, factor: string }[] = [{
    band: "", basis: "", factor: ""
  }]

  ngOnInit(): void {
    this.bandService.getBasis().subscribe(
      (res) => {
        this.basis = res
      }
    )
    this.bandService.getDateBasis().subscribe(
      (res) => {
        this.dateBasis = res
      }
    )

  }


  addbandBasisFactor() {
    this.bandBasisFactor.push({ band: "", basis: "", factor: "" })

  }
  deletebandBasisFactor(index) {
    this.bandBasisFactor.splice(index, 1)

  }

  addAgentBand() {
    this.agentBand.push({ versionNo: "", dateBasis: "", date: "" })

  }
  deleteAgentBand(index) {
    this.agentBand.splice(index, 1)

  }
  submitAgentData() {
    // This is where the data should be sent to the backend
  }
}
