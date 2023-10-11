import { HttpErrorResponse } from '@angular/common/http'; 
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../service/find-client.service';

@Component({
  selector: 'app-client-notes',
  templateUrl: './client-notes.component.html',
  styleUrls: ['./client-notes.component.scss']
})
export class ClientNotesListComponent implements OnInit {
  clientNo: string;
  clientName: string;
  noteForm: FormGroup;
  isNoteHidden: boolean = true;
  notesList: any[] = [];
  saving: boolean = false;

  constructor(
      private findClientService: FindClientService,
      private route: ActivatedRoute, 
      private utilityService: UtilityService,
    ) {}

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.queryParams['clientNo'];
    this.createNotesForm()
    this.setNotesList()
    this.setClientName()
  }

  onSave() {
    if (!this.noteForm.value.note) {
        this.noteForm.markAllAsTouched()
        return
    }
    console.log(this.noteForm.value)
    this.saving = true;
    this.findClientService.saveNote(this.noteForm.value)
        .subscribe(
            (note: any) => {
                this.utilityService.notify("Note saved successfully. Note ID: " + note.id);
                this.notesList.push(note)
                this.noteForm.patchValue({note: ''})
                this.noteForm.markAsUntouched()
                this.saving = false;
            },
            (err: HttpErrorResponse) => {
                this.utilityService.notify("Error saving new note: " + err.statusText, 0)
                console.log("Error saving new note: ", err)
                this.saving = false;
            }
        )
  }

  onAddNote() {
    this.isNoteHidden = false

  }

  createNotesForm(){
      this.noteForm = new FormGroup({
        createdBy: new FormControl('', Validators.required),
        note: new FormControl('', Validators.required),
        refCat: new FormControl('CLI', Validators.required),
        refNo: new FormControl(this.clientNo, Validators.required),
        visibleToAll: new FormControl(true)
      })
  }

  setNotesList(){
    this.findClientService.getNotesList(this.clientNo)
    .subscribe(
        (res: any[]) => this.notesList = res,
        (err: HttpErrorResponse) => console.log("Error fetching notes list for client number: ", this.clientNo, err)
    )
  }

  setClientName(){
    this.findClientService.getClientList(this.clientNo)
    .pipe(map(client => client?.fullName))
    .subscribe(
        (clientName: string) => {
            this.clientName = clientName;
            this.noteForm.patchValue({createdBy: this.clientName})
        },
        (err: HttpErrorResponse) => console.log("Error fetching client name for client number: " + this.clientNo, err)
    )
  }

  get isInvalidNote(){
      return this.noteForm.touched && this.noteForm.controls['note'].invalid;
  }

  resolve(event, note){
    event.preventDefault()
    if (note.resolve) return;

    note.resolving = true;
    const payload = {
        refCat: 'CLI',
        refNo: this.clientNo,
        id: note.id,
        resolvedBy: this.clientName
    }

    this.findClientService.resolveNote(payload)
        .subscribe(
            (res: any) => {
                note.resolving = false;
                note.resolve = true; // note is resolved
                this.utilityService.notify(`Note ( id = ${note.id} ) successfully resolved`)
            },
            (err: HttpErrorResponse) => {
                note.resolving = false;
                this.utilityService.notify("Couldn't resolve this note: " + err.statusText, 0)
                console.log("Error resolving note", err)
            }
        )
  }
}
