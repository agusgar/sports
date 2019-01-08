import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCheckboxModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatRadioModule,
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatInputModule, MatDialogModule,
    MatTableModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDividerModule, MatListModule,
    MatTooltipModule, MatSlideToggleModule, MatSelectModule, MatBadgeModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule,
    MatAutocompleteModule, MatBottomSheetModule, MatSnackBarModule, MatRadioModule,
  ],
  exports: [
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatInputModule, MatDialogModule,
    MatTableModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDividerModule, MatListModule,
    MatTooltipModule, MatSlideToggleModule, MatSelectModule, MatBadgeModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule,
    MatAutocompleteModule, MatBottomSheetModule, MatSnackBarModule, MatRadioModule,
  ]
})
export class AppMaterialModulesModule { }
