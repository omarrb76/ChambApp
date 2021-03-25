import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  public getWindowRef() {
    return window;
  }

}
