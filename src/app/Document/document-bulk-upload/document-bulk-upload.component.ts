import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { DocumentService } from '../../Services/document.service';

@Component({
  selector: 'app-document-bulk-upload',
  templateUrl: './document-bulk-upload.component.html',
  styleUrls: ['./document-bulk-upload.component.scss']
})
export class DocumentBulkUploadComponent implements OnInit {

  FILE: any;

  isFile = false;
  fileName?: any;
  file?: any;

  connection = {
    creating: false,
    error: false
  };

    constructor(
      private documentService: DocumentService,
      private toaster: UtilityService
    ) { }

  ngOnInit(): void {
  }

  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  onChange(file: any) {
    this.FILE = file.files[0];
    this.fileName = file.files[0].name;
    this.isFile = false;
  }

  bulkUpload() {
    this.documentService.uploadBulkDocument(this.FILE).subscribe((data: any) => {
      this.connection.creating = false;
      // location.reload();
    });
  }

}
