import { Component, OnInit } from '@angular/core';
import {ClaimsService} from './claims.service';
import {IClaim} from './IClaim';
import {throwError} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ClaimEditDialogModel, ClaimEditorComponent} from './claim-editor/claim-editor.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims: IClaim[];
  errorReceived: boolean;
  constructor(private claimsService: ClaimsService,
              private dialog: MatDialog,
              private titleService: Title,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.titleService.setTitle('Claims');
    this.getClaims();
  }

  getClaims() {
    this.errorReceived = false;
    this.claimsService.getClaims()
      .pipe(catchError(this.handleError))
      .subscribe(claims => {
        this.claims = claims;
      });
  }

  saveClaim(claim: IClaim){
    this.claimsService.saveClaim(claim)
      .pipe(
        catchError(this.handleError),
        )
      .subscribe((updatedClaim: IClaim) => {
        this.claims[(this.claims.indexOf(this.claims.find(s => s.id === claim.id)))] = updatedClaim;
      });
  }

  editDialog(claim: IClaim): void {
    const dialogData = new ClaimEditDialogModel('Edit Claim', claim);

    const dialogRef = this.dialog.open(ClaimEditorComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult){
        this.claimsService.saveClaim(dialogResult)
          .pipe(catchError((err) => this.handleError(err)))
          .subscribe((updatedClaim: IClaim) => {
            this.claims[(this.claims.indexOf(this.claims.find(s => s.id === claim.id)))] = updatedClaim;
          });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Auto confirm if open more than 5 seconds
      verticalPosition: 'top'
    });
  }

  public handleError(error: any) {
      this.errorReceived = true;
      let errors = '';
      for (const fieldName in error.error) {
        if (error.error.hasOwnProperty(fieldName)) {
          errors += error.error[fieldName] + '\n';
        }
      }
      this.openSnackBar(errors, 'Confirm');
      return throwError(error);
  }
}
