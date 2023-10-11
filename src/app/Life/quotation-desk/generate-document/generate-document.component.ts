import { Component, OnInit } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-generate-document',
  templateUrl: './generate-document.component.html',
  styleUrls: ['./generate-document.component.scss']
})
export class GenerateDocumentComponent implements OnInit {
  cols: string[] = ['Normal Trigger', 'How Delivered', 'Document'];
  docs: { trigger; delivery; doc }[] = [];

  constructor(private findQuotationService: FindQuotationService,public uS: UtilityService, public dialogRef: MatDialogRef<GenerateDocumentComponent>) { }

  ngOnInit(): void {
    this.docs = this.uS.dataGen(['trigger', 'delivery', 'doc'], 6);
  }
  close() {
    this.dialogRef.close();
  }
  gen(item: any) {
    this.close();
  }

}
