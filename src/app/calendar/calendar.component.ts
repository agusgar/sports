import { Component, OnInit } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Deporte } from '../entities/deporte';
import { DeporteService } from '../services/deporte.service';
import { EncuentroService } from '../services/encuentro.service';
import { pipe, of, empty } from 'rxjs';
import { getDay, subDays, getDaysInMonth, addDays } from 'date-fns';
import { FormControl } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';
import { isNil, isEmpty } from 'lodash';

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatBottomSheet } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MONTH_FORMAT } from '../settings/datepicker-format';
import { EncuentrosAtDayComponent } from '../encuentros-at-day/encuentros-at-day.component';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MONTH_FORMAT,
    },
  ]
})
export class CalendarComponent implements OnInit {
  amountOfEncuentros: number;
  calendarCellModels: CalendarCellModel[];
  date = new FormControl(moment());
  daysOfWeek: string[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  deportes: Deporte[];
  encuentrosPerDay: number[];
  selectedCalendarCell: CalendarCellModel;
  selectedDeporteId: number;
  selectedMonth: number;
  selectedYear: number;
  type = AlertType;

  constructor(
    private deporteService: DeporteService,
    private encuentroService: EncuentroService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this.selectedMonth = Number.parseInt(this.date.value.format('M'), 10);
    this.selectedYear = Number.parseInt(this.date.value.format('YYYY'), 10);
    this.getDeportes();
  }

  get noDeportes(): boolean {
    return !isNil(this.deportes) && isEmpty(this.deportes);
  }

  buildCalendarCells(encuentrosAmount: number[], deporteId: number, year: number, month: number): CalendarCellModel[] {
    const firstDayOfMonth = new Date(year, month - 1 , 1);
    const preCells = Array
      .from(Array(getDay(firstDayOfMonth)).keys())
      .reverse()
      .map(i => ({
        date: subDays(firstDayOfMonth, i + 1),
        amount: 0,
        disabled: true,
      }));

    const daysInMonth = getDaysInMonth(firstDayOfMonth);
    const cells = Array
      .from(Array(daysInMonth).keys())
      .map(i => ({
        date: addDays(firstDayOfMonth, i),
        amount: encuentrosAmount[i + 1],
        disabled: false,
      }));

    const lastDayOfMonth = cells.slice(-1)[0].date;
    const postCells = Array
      .from(Array(6 - getDay(lastDayOfMonth)).keys())
      .map(i => ({
        date: addDays(lastDayOfMonth, i + 1),
        amount: 0,
        disabled: true,
      }));

    return [...preCells, ...cells, ...postCells];
  }

  getDeportes(): void {
    this.deporteService.getDeportes()
      .pipe(
        map((response: Deporte[]) => response),
        mergeMap((deportes: Deporte[]) => {
          this.deportes = deportes;
          if (isEmpty(this.deportes)) {
            return empty();
          }
          this.selectedDeporteId = deportes[0].id;
          return this.encuentroService.getAmountForDeporteByPeriod(this.selectedDeporteId, this.selectedYear, this.selectedMonth);
        }),
      )
      .subscribe(result => {
        this.encuentrosPerDay = result;
        this.amountOfEncuentros = this.encuentrosPerDay.reduce((amount, value) => amount + value);
        this.calendarCellModels = this.buildCalendarCells(
          result,
          this.selectedDeporteId,
          this.selectedYear,
          this.selectedMonth
        );
      });
  }

  getAmountOfEncuentrosForDeporte(): void {
    this.encuentroService.getAmountForDeporteByPeriod(this.selectedDeporteId, this.selectedYear, this.selectedMonth)
      .subscribe(result => {
        this.encuentrosPerDay = result;
        this.calendarCellModels = this.buildCalendarCells(
          result,
          this.selectedDeporteId,
          this.selectedYear,
          this.selectedMonth
        );
      });
  }

  onCellClick(calendarCellModel: CalendarCellModel) {
    this.bottomSheet.open(EncuentrosAtDayComponent, {
      data: { deporteId: this.selectedDeporteId, date: calendarCellModel.date },
    });
  }

  onChangeMonth($event, datepicker): void {
    this.selectedMonth = Number.parseInt($event.format('M'), 10);
    datepicker.close();
    this.date.patchValue(moment({ year: this.selectedYear, month: this.selectedMonth - 1 }));
    this.getAmountOfEncuentrosForDeporte();
  }

  onChangeYear($event): void {
    this.selectedYear = Number.parseInt($event.format('YYYY'), 10);
    this.date.patchValue(moment({ year: this.selectedYear, month: this.selectedMonth - 1 }));
  }

  onSelectCalendarCell(calendarCell: CalendarCellModel): void {
    this.selectedCalendarCell = calendarCell;
  }

  onSelectedDeporteChange(selectChange): void {
    this.selectedDeporteId = selectChange.value;
    this.getAmountOfEncuentrosForDeporte();
  }
}
