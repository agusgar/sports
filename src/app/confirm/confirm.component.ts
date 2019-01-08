import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmInput } from './confirm-input';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmInput: ConfirmInput) { }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get lines() {
    return this.confirmInput.lines;
  }

  get title() {
    return this.confirmInput.title;
  }
}
