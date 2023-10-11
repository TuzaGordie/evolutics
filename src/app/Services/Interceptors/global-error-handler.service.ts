import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(error: any) {
    // debugger
    if (/Loading chunk [\d]+ failed/.test(error?.message))
      window.location.reload();
    if (/NG0100: ExpressionChangedAfterItHasBeenCheckedError/.test(error?.message))
      return;
    else super.handleError(error);
  }
}
