import { Component, OnInit, Inject } from '@angular/core';
import { EncuentrosAtDayModel } from './encuentros-at-day-model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { EncuentroEdit } from '../entities/encuentroEdit';
import { EncuentroService } from '../services/encuentro.service';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { tap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-encuentros-at-day',
  templateUrl: './encuentros-at-day.component.html',
  styleUrls: ['./encuentros-at-day.component.scss']
})
export class EncuentrosAtDayComponent implements OnInit {
  encuentros: EncuentroEdit[];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EncuentrosAtDayComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: EncuentrosAtDayModel,
    private encuentroService: EncuentroService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.getEncuentros();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.bottomSheetRef.dismiss()),
      take(1),
    ).subscribe();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get date(): Date {
    return this.data.date;
  }

  get deporteId(): number {
    return this.data.deporteId;
  }

  getEncuentros() {
    this.encuentroService.getEncuentrosByDateAndDeporte(this.date, this.deporteId)
      .subscribe(response => this.encuentros = response);
  }
}
