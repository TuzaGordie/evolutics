import { Component, Inject, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EPageType } from '../../models/index.model';
import { PageToComponentDirective } from './page-to-component.directive';

@Component({
  templateUrl: './page-to-component.component.html',
  styleUrls: ['./page-to-component.component.scss'],
})
export class PageToComponentComponent implements OnInit {
  @ViewChild(PageToComponentDirective, { static: true })
  compHost!: PageToComponentDirective;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      component: Type<any>;
      modelData: any;
      title: string;
      pageType:EPageType
    },
    public dialogRef: MatDialogRef<PageToComponentComponent>
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.compHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.data.component);
    componentRef.instance.modelData = this.data.modelData;
    componentRef.instance.isModal = true;
    componentRef.instance.pageType = this.data.pageType;
    componentRef.instance.modalOnComplete = (data?: any) => {
      this.onComplete(data);
    };
  }

  onComplete(data) {
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({ template: `` })
export class PageModal<ModelData = any,CompletionFunc=any> {
  @Input() isModal: boolean;
  @Input() modelData: ModelData;
  @Input() modalOnComplete:CompletionFunc;
}