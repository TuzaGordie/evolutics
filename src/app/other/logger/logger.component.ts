import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/other/logger/logger.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Log } from './logger.interface';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
})
export class LoggerComponent implements OnInit {
  constructor(public lS: LoggerService, public uS: UtilityService) {}

  ngOnInit(): void {
    if (!this.lS.isAuthed) {
      let pwd = prompt('Please enter the password');
      // debugger;
      if (pwd == this.lS.pwd) {
        this.lS.unlock();
      }
    }
  }
  trackByID(index: number, item: Log) {
    return item.id;
  }
  copy(i: number) {}
  download(i: number) {}
  lock() {
    this.lS.lock();
  }
  copied() {
    this.uS.notify('Copied to clipboard');
  }
  downloaded() {
    this.uS.notify('Downloaded');
  }
  makeTextFile = (log: Log) => {
    var data = new Blob([JSON.stringify(log)], { type: 'text/plain' });
    this.uS.downloader(data, `log_${log.time}.json`);
  };
}
