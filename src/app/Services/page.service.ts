import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EPageType } from '../Shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  pageType: EPageType;
  constructor() {}

  isClone = (activatedRoute: ActivatedRoute, pageType?: EPageType) => {
    return (
      activatedRoute.snapshot.data.type === EPageType.clonePage ||
      pageType === EPageType.clonePage
    );
  };
  isCreate = (activatedRoute: ActivatedRoute, pageType?: EPageType) => {
    return (
      activatedRoute.snapshot.data.type === EPageType.createPage ||
      pageType === EPageType.createPage
    );
  };
  isEdit = (activatedRoute: ActivatedRoute, pageType?: EPageType) => {
    return (
      activatedRoute.snapshot.data.type === EPageType.editPage ||
      pageType === EPageType.createPage
    );
  };
  isIndex = (activatedRoute: ActivatedRoute, pageType?: EPageType) => {
    return (
      activatedRoute.snapshot.data.type === EPageType.indexPage ||
      pageType === EPageType.indexPage
    );
  };
  isShow = (activatedRoute: ActivatedRoute, pageType?: EPageType) => {
    return (
      activatedRoute.snapshot.data.type === EPageType.showPage ||
      pageType === EPageType.showPage
    );
  };
}
