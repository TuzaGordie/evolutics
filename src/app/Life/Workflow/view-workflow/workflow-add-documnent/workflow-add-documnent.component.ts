import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { DocumentService } from 'src/app/Services/document.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-workflow-add-documnent',
  templateUrl: './workflow-add-documnent.component.html',
  styleUrls: ['./workflow-add-documnent.component.scss']
})
export class WorkflowAddDocumnentComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  branches: any[] = [];
  sensitivities: any[] = [];
  
  @ViewChild('launchBtn', { static: true }) launchBtn: ElementRef;
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

  constructor(private location: Location, private documentService: DocumentService) { }

  onCloseClick(){
    this.location.back()
  }

  ngOnInit(): void {
    this.getCategories();
    this.getBranches();
    this.getSensitivities();
  }
  ngAfterViewInit() {
    this.launchBtn.nativeElement.click()
 }
  ngOnDestroy () {
      this.closeBtn.nativeElement.click()
 }

  getCategories() {    
    this.documentService.getCategory()
      .subscribe(
        (data: any[]) => this.categories = data,
        (err: HttpErrorResponse) => console.log("Error fetching categories", err)
      )
  }

  getSubCategories(categoryCode) {    
    this.documentService.getSubCategory(categoryCode)
      .subscribe(
        (data: any) => this.subCategories = data,
        (err: HttpErrorResponse) => console.log("Error fetching subcategories", err)
      )
  }

  getBranches() {    
    this.documentService.getBranch()
      .subscribe(
        (data: any[]) => this.branches = data,
        (err: HttpErrorResponse) => console.log("Error fetching branches", err)
      )
  }

  getSensitivities() {    
    this.documentService.getSensitivity()
      .subscribe(
        (data: any) => this.sensitivities = data, 
        (err: HttpErrorResponse) => console.log("Error fetching sensitivites", err)
      )
  }

  onCategoryChange(event) {
    this.getSubCategories(event.target.value)
  }
}
