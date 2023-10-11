import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FindProviderComponent } from '../../../find-provider/find-provider.component';

@Component({
  selector: 'app-client-assign-provider',
  templateUrl: './client-assign-provider.component.html',
  styleUrls: ['./client-assign-provider.component.scss']
})
export class ClientAssignProviderComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFindProviderModal(): void {
    this.matDialog.open(FindProviderComponent).afterClosed().subscribe(res => {
      console.log('provider found:', res)
    })
  }
}
