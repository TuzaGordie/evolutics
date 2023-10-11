import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatHelpDeskService {
  showOptions: boolean;
  isShown: boolean;
helpLink=environment.helpLink
  constructor() {}

  reload() {
    this.closeOptions();
    this.show();
  }
  show() {
    this.isShown = true;
  }
  hide() {
    this.isShown = false;
  }
  toggle() {
    this.isShown = !this.isShown;
  }

  closeOptions() {
    this.showOptions = false;
  }
  openOptions() {
    this.showOptions = true;
  }
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
}
