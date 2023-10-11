import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';
import { ChatHelpDeskService } from './chat-help-desk.service';

@Component({
  selector: 'app-chat-help-desk',
  templateUrl: './chat-help-desk.component.html',
  styleUrls: ['./chat-help-desk.component.scss'],
})
export class ChatHelpDeskComponent implements OnInit {
  circleFill = '#514ef5';
  constructor(public chS: ChatHelpDeskService, public appS: AppService) {}

  ngOnInit(): void {}
}
