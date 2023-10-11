import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { EPageType } from '../../models/index.model';

@Component({
  template: ``,
})
export class PageTemplateComponent {
  loading: boolean;
  code: string;
  pageType: EPageType;
  idField = 'code'; 
  constructor(public route: ActivatedRoute, public uS: UtilityService) {}

  async init(func?: () => Promise<any>, err?: () => any) {
    this.loading = true;
    try {
      const code =
        this.route.snapshot.queryParamMap.get(this.idField) ||
        this.route.snapshot.paramMap.get(this.idField);
      this.pageType = this.route.snapshot.data.type;
      this[this.idField] = code;
      if (this.isCreate && code) throw 'Page is impure';
      if (code && func) await func();
    } catch (error) {
      console.error(error);
      if (err) err();
      else {
        await this.uS.info(error, 0);
        this.uS.back();
      }
    }
    this.loading = false;
  }

  get isIndex() {
    return this.uS.pageS.isIndex(this.route,this.pageType);
  }

  get isClone() {
    return this.uS.pageS.isClone(this.route,this.pageType);
  }

  get isCreate() {
    return  this.uS.pageS.isCreate(this.route,this.pageType);
  }

  get isEdit() {
    return this.uS.pageS.isEdit(this.route,this.pageType);
  }

  get isShow() {
    return this.uS.pageS.isShow(this.route,this.pageType);
  }
}
