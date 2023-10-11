import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import {  BatchUpload, EBatchUploadType } from '../../batch-uploads-extras/batch-uploads.model';

@Component({
  selector: 'app-index-batch-uploads',
  templateUrl: './index-batch-uploads.component.html',
  styleUrls: ['./index-batch-uploads.component.scss'],
})
export class IndexBatchUploadsComponent implements OnInit {
  form = new FormGroup({
    type: new FormControl(null, [Validators.required]),
  });
  types = BatchUpload. batchUploadTypes;
  get type() {
    return this.form.value?.type;
  }
  constructor(public route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.types.sort2('title', true);
  }
  open() {
    if (this.form.valid) {
      this.router.navigate([this.type], {
        relativeTo: this.route,
        queryParams: { type: this.type },
      });
    }
  }
}
