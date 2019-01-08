import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';

@Component({

  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.scss']
})
export class CalendarCellComponent implements OnInit {
  @Input() model: CalendarCellModel;
  @Input() selected: boolean;

  @Output() cellClick: EventEmitter<CalendarCellModel> = new EventEmitter<CalendarCellModel>();

  constructor() { }

  ngOnInit() {
  }

  get day() {
    return getDate(this.model.date);
  }

  get amount() {
    return this.model.amount;
  }

  get disabled() {
    return this.model.disabled;
  }

  getCellClass(): string {
    const disabled = this.model.disabled ? 'calendar-cell-disabled' : 'calendar-cell-enabled';
    const selected = this.selected ? 'calendar-cell-selected' : '';
    return `${disabled} ${selected}`;
  }

  onClick(): void {
    if (!this.disabled && this.amount > 0) {
      this.cellClick.emit(this.model);
    }
  }
}
