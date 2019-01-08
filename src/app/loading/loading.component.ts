import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor(public loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.getIsLoading().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

}
