import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-client-basic-register-new-claim',
  templateUrl: './client-basic-register-new-claim.component.html',
  styleUrls: ['./client-basic-register-new-claim.component.scss']
})
export class ClientBasicRegisterNewClaimComponent implements OnInit {
  @Output() next = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  nextTab(){
    this.next.emit();
  }
}
