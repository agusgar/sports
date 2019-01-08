import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private count = 0;
  isLoadingSubject = new Subject<boolean>();

  constructor() { }

  initRequest() {
    this.count = this.count + 1;
    this.isLoadingSubject.next(this.count !== 0);
  }

  finishRequest() {
    this.count = this.count - 1;
    this.isLoadingSubject.next(this.count !== 0);
  }

  getIsLoading(): Subject<boolean> {
    return this.isLoadingSubject;
  }
}
