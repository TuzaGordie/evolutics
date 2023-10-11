import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientAssignProviderComponent } from './client-assign-provider/client-assign-provider.component';

@Component({
  selector: 'app-client-document-register-new-claim',
  templateUrl: './client-document-register-new-claim.component.html',
  styleUrls: ['./client-document-register-new-claim.component.scss']
})
export class ClientDocumentRegisterNewClaimComponent implements OnInit {
  @Output() next = new EventEmitter<void>();

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAssignProviderModal(){
    this.matDialog.open(ClientAssignProviderComponent).afterClosed().subscribe(data => {
      console.log('assigned provider:', data)
    })
  }

  nextTab(){
    this.next.emit();
  }
}
