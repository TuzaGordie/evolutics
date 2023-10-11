import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/Services/utility.service';
import { isConstructorDeclaration } from 'typescript';
import { FindMainAgentService } from '../service/find-main-agent.service';

@Component({
  selector: 'app-agentnote',
  templateUrl: './agentnote.component.html',
  styleUrls: ['./agentnote.component.scss']
})
export class AgentnoteComponent implements OnInit {
  agentNo: string;
  clientNo: string;
  agentClientName: string;
  noteForm: FormGroup;
  isNoteHidden: boolean = true;
  notesList: any[] = [];
  saving: boolean = false;

  constructor(
      private findMainAgentService: FindMainAgentService,
      private route: ActivatedRoute, 
      private utilityService: UtilityService,
    ) {}

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams['agentNo'];
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
    this.findMainAgentService.saveNote(this.noteForm.value)
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
        refNo: new FormControl(this.agentNo, Validators.required),
        visibleToAll: new FormControl(true)
      })
  }

  setNotesList(){
    this.findMainAgentService.getNotesList(this.agentNo)
    .subscribe(
        (res: any[]) => this.notesList = res,
        (err: HttpErrorResponse) => console.log("Error fetching notes list for agent number: ", this.agentNo, err)
    )
  }

  setClientName(){
    this.findMainAgentService.getAgentList(this.agentNo)
    .pipe(
      tap(agent => this.clientNo = agent?.agentInformation?.clientNo),
      mergeMap(agent => this.getAgentClientName(agent)),
      )
    .subscribe(
        (clientName: string) => {
            this.agentClientName = clientName;
            this.noteForm.patchValue({createdBy: this.agentClientName})
        },
        (err: HttpErrorResponse) => console.log("Error fetching agent name for agent number: " + this.agentNo, err)
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
        refCat: 'AGT',
        refNo: this.agentNo,
        id: note.id,
        resolvedBy: this.agentClientName
    }

    this.findMainAgentService.resolveNote(payload)
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

  getAgentClientName(agent){
    console.log("getAgentClientName was passed agent: " + JSON.stringify(agent));
    console.log("this.findMainAgentService.getAgentList was passed clientNo: ", agent?.agentInformation?.clientNo)
    return this.findMainAgentService.getClientList(agent?.agentInformation?.clientNo).pipe(map(client => client?.fullName))
  }
}
