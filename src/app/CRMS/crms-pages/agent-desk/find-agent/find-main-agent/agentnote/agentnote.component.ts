import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agentnote',
  templateUrl: './agentnote.component.html',
  styleUrls: ['./agentnote.component.scss']
})
export class CRMSAgentnoteComponent implements OnInit {

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
