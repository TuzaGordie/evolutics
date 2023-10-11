import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clientnote',
  templateUrl: './clientnote.component.html',
  styleUrls: ['./clientnote.component.scss']
})
export class CRMSClientnoteComponent implements OnInit {

  noteForm:any = FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      note: new FormControl(null),
      visible: new FormControl(null)
    })
  }

  onSave(){
    console.log(this.noteForm.value)
  }

}
