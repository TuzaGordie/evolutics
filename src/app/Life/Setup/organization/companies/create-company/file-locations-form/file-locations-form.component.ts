import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-file-locations-form',
  templateUrl: './file-locations-form.component.html',
  styleUrls: ['./file-locations-form.component.scss']
})
export class FileLocationsFormComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
