import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = false;
  private isLoadingObservable =  new Subject<boolean>();

  constructor() { }

  toggle() {
    this.isLoading = !this.isLoading;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
    this.isLoadingObservable.next(this.isLoading);
  }

  getIsLoading(): Subject<boolean> {
    return this.isLoadingObservable;
  }
}
