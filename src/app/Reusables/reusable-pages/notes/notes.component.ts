import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { RefCat } from 'src/app/Shared/models/index.model';
import { ERModule } from '../../reusable-extras/reusable.model';
import { INote } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  noteForm = new FormGroup({
    createdBy: new FormControl(null, Validators.required),
    note: new FormControl(null, Validators.required),
    refCat: new FormControl(null, Validators.required),
    refNo: new FormControl(null, Validators.required),
    visibleToAll: new FormControl(null),
  });
  isNoteHidden: boolean = true;
  loading: boolean;
  clientNo: string;
  rModule: ERModule;
  agentNo: any;
  policyNo: any;
  notesList: INote[];
  clientName: any;
  clientNameParam: any;
  refCat: string;
  refNo: string;
  policyNoSuffix: string;
  workflowNo: string;
  paymentNo: string;
  _mainNo: string;
  groupNo: string;
  set mainNo(v:string) { 
    this._mainNo = v || this._mainNo;
  }

  constructor(
    public noteS: NotesService,
    public clientS: ClientService,
    private route: ActivatedRoute,
    private uS: UtilityService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    try {
      this.rModule = this.route.snapshot.data.rModule;
      this.mainNo = this.clientNo =
        this.route.snapshot.queryParamMap.get('clientNo');
      this.mainNo = this.agentNo =
        this.route.snapshot.queryParamMap.get('agentNo');
      this.mainNo = this.groupNo =
        this.route.snapshot.queryParamMap.get('groupNo');
      this.mainNo = this.paymentNo =
        this.route.snapshot.queryParamMap.get('paymentNo');
      this.mainNo = this.policyNo =
        this.route.snapshot.queryParamMap.get('policyNo');
      this.policyNoSuffix =
        this.route.snapshot.queryParamMap.get('policyNoSuffix');
      this.mainNo = this.workflowNo =
        this.route.snapshot.queryParamMap.get('workflowNo');
      this.mainNo = this.refCat =
        this.route.snapshot.queryParamMap.get('refCat');
      this.mainNo = this.refNo =
        this.route.snapshot.queryParamMap.get('refNo');
      await this.getNotes(this.rModule as any, this._mainNo);
      this.getClientName();
    } catch (error) {}
    this.loading = false;
  }

  getClientName() {
    this.mainNo = this.clientNameParam = this.route.snapshot.queryParamMap.get('clientName');
    this.clientS.getClientNameByNum(this.clientNo).subscribe(
      (clientName: any) => {
        console.log(clientName, this.clientNo)
        this.clientName = clientName;
        this.noteForm.patchValue({ createdBy: this.clientName });
      },
      (err) =>
        console.log(
          'Error fetching client name for client number: ' + this.clientNo,
          err
        )
    );
  }
  getNotes(refCat: string, refNo: string) {
    this.noteForm.patchValue({ refCat, refNo });
    refCat = this.refCat;
    refNo = this.refNo;
    console.log('refCat refNo', this.refCat, this.refNo)

    return this.noteS
      .getNotesList(refCat, refNo)
      .toPromise()
      .then((res) => (this.notesList = res));
  }
  onSave() {
    this.noteForm.patchValue({ refCat: this.refCat });
    console.log(this.noteForm.value);
    this.loading = true;
    this.noteS.saveNote(this.noteForm.value).subscribe(
      (note: any) => {
        this.uS.info(
          `Note ${note?.id} saved successfully`,
          1,
          null,
          null,
          false
        );
        this.ngOnInit();
        this.noteForm.controls.note.reset();
        this.noteForm.controls.visibleToAll.reset();
      },
      (err) => {
        this.uS.info('Error saving new note', 0);
        console.log('Error saving new note: ', err);
        this.loading = false;
      }
    );
  }
  resolve(event, note: INote) {
    event.preventDefault();
    if (note.resolve) return;
    note.resolving = true;
    const payload = {
      refCat: this.refCat,
      refNo: this.refNo,
      id: note.id,
      resolvedBy: this.clientName,
    };

    this.noteS.resolveNote(payload).subscribe(
      (res) => {
        note.resolving = false;
        this.uS.notify(`Note ${note.id} successfully resolved`);
        this.ngOnInit();
      },
      (err) => {
        note.resolving = false;
        this.uS.notify("Couldn't resolve this note " + note.id, 0);
        console.log('Error resolving note', err);
      }
    );
  }

  toggleNote() {
    this.isNoteHidden = !this.isNoteHidden;
  }
  get isClient() {
    return this.rModule == ERModule.client;
  }
  get isPolicy() {
    return this.rModule == ERModule.policy;
  }
  get isWorkflow() {
    return this.rModule == ERModule.workflow;
  }
  get isAgent() {
    return this.rModule == ERModule.agent;
  }
}
