import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeporteService } from '../services/deporte.service';
import { Deporte } from '../entities/deporte';
import { FixtureService } from '../services/fixture.service';
import { isNil, isEmpty } from 'lodash';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-fixture-execution',
  templateUrl: './fixture-execution.component.html',
  styleUrls: ['./fixture-execution.component.scss']
})
export class FixtureExecutionComponent implements OnInit {
  fixtureExecutionForm: FormGroup;
  deportes: Deporte[];
  type = AlertType;

  constructor(
    public dialogRef: MatDialogRef<FixtureExecutionComponent>,
    @Inject(MAT_DIALOG_DATA) public fixture: string,
    private formBuilder: FormBuilder,
    private deporteService: DeporteService,
    private fixtureService: FixtureService) { }

  ngOnInit() {
    this.fixtureExecutionForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      selectedDeporteId: ['', Validators.required],
    });
    this.getDeportes();
  }

  get date() {
    return this.fixtureExecutionForm.get('date');
  }

  get selectedDeporteId() {
    return this.fixtureExecutionForm.get('selectedDeporteId');
  }

  get noDeportes(): boolean {
    return !isNil(this.deportes) && isEmpty(this.deportes);
  }

  getDeportes(): void {
    this.deporteService.getDeportes().subscribe(response => {
      this.deportes = response;
      if (!isEmpty(this.deportes)) {
        this.fixtureExecutionForm.patchValue({
          selectedDeporteId: this.deportes[0].id,
        });
      }
    });
  }

  onSubmit(): void {
    this.fixtureService.executeFixture(
      { deporteId: this.selectedDeporteId.value, tipoFixture: this.fixture },
      this.date.value
    ).subscribe(response => this.dialogRef.close(true));
  }
}
