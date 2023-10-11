import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HtmlerService {
  constructor() {}

  span = (label: string, cls?: string) => {
    return `<span class="${cls || ''}">${label}</span>`;
  };
  //#
}
