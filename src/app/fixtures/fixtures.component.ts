import { Component, OnInit } from '@angular/core';
import { FixtureService } from '../services/fixture.service';
import { Fixtures } from '../entities/fixtures';
import { FormControl } from '@angular/forms';
import { FixtureExecutionComponent } from '../fixture-execution/fixture-execution.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {
  fixtures: Fixtures;
  showDelay = new FormControl(500);

  constructor(
    private fixtureService: FixtureService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getFixtures();
  }

  getFixtures(): void {
    this.fixtureService.getFixtures().subscribe(response => this.fixtures = response);
  }

  onExecute(fixture: string): void {
    const dialogRef = this.dialog.open(FixtureExecutionComponent, {
      width: '500px',
      data: fixture,
    });

    // dialogRef.afterClosed().subscribe(result => this.getEncuentros());
  }

  onReload(): void {
    this.fixtureService.reloadFixtures().subscribe(response => this.fixtures = response);
  }
}
