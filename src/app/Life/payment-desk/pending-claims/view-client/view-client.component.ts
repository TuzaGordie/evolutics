import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

 
}
