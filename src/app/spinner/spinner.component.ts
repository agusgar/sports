import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  isVisible = false;
  spinnerServiceSubscription: Subscription;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerServiceSubscription = this.spinnerService
      .getIsLoading()
      .subscribe(response => {
        this.isVisible = response;
      });
  }

  ngOnDestroy() {
    this.spinnerServiceSubscription.unsubscribe();
  }
}
