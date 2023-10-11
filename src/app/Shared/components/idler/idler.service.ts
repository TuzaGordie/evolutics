import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { IdlerComponent } from './idler.component';

@Injectable()
export class IdlerService {
  private idleState: string;
  private timedOut: boolean;
  private onIdleFunctions: any[] = [];
  private _timeLeft: number;
  idlerModal: MatDialogRef<IdlerComponent>;
  get timeLeft() {
    return this._timeLeft;
  }
  private idleTime = 240; //in seconds
  private timeOutTime = 60; //in seconds
  constructor(private idle: Idle, public dialog: MatDialog) {}
  startIdler(idleTimeSec = this.idleTime ) {
    this.idleTime=idleTimeSec*0.8;
    this.timeOutTime = idleTimeSec * 0.2;
    this.idle.setIdle(idleTimeSec);
    this.idle.setTimeout(this.timeOutTime);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => { 
      this.idlerModal.close();
    });
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true; 
      for (const func of this.onIdleFunctions) {
        func();
      }
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.log(this.idleState);
      this.openTimeWarningModal();
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this._timeLeft = countdown;
    });

    this.reset();
  }
  private reset() {
    this.idle.watch();
  }
  clear() {
    this.onIdleFunctions=[];
  }
  addOnIdleFunction(func: any) {
    this.onIdleFunctions.push(func);
  }
  openTimeWarningModal() {
    this.idlerModal = this.dialog.open(IdlerComponent, {
      // height: 'auto',
      // width: 'auto',
    });
  }
}
