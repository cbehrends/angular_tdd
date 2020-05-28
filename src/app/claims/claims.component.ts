import { Component, OnInit } from '@angular/core';
import {ClaimsService} from './claims.service';
import {IClaim} from './IClaim';
import {throwError} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ClaimEditDialogModel, ClaimEditorComponent} from './claim-editor/claim-editor.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {ServicesTypesService} from '../service-types/services-types.service';
import {IServiceType} from '../service-types/service-type';
import {IClaimReadDto} from './IClaimReadDto';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims: IClaimReadDto[];
  servicesList: IServiceType[];
  errorReceived: boolean;
  addingNew: boolean;
  constructor(private claimsService: ClaimsService,
              private servicesTypesService: ServicesTypesService,
              private dialog: MatDialog,
              private titleService: Title,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addingNew = false;
    this.errorReceived = false;
    this.titleService.setTitle('Claims');
    this.getClaims();
    this.getServices();

  }

  getClaims() {
    this.errorReceived = false;
    this.claimsService.getClaims()
      .pipe(catchError(this.handleError))
      .subscribe(claims => {
        this.claims = claims;
      });
  }

  getServices() {
    this.errorReceived = false;
    this.servicesTypesService.getServices()
      .pipe(catchError(this.handleError))
      .subscribe(services => {
        this.servicesList = services;
      });
  }

  newClaim(){
    this.addingNew = true;
    this.newDialog({firstName: '', totalAmount: 0, amountDue: 0} as IClaim);
  }

  saveClaim(claim: IClaim){
    if (this.addingNew === true){
      return;
    }

    this.claimsService.saveClaim(claim)
      .pipe(
        catchError(this.handleError),
        )
      .subscribe((updatedClaim: IClaim) => {
        this.claims.push( {
          id: updatedClaim.id,
          firstName: updatedClaim.firstName,
          servicesRenderedCount: updatedClaim.servicesRendered.length
        } as IClaimReadDto);
        this.addingNew = false;
        this.errorReceived = false;
      });
  }

  newDialog(claim: IClaim){

    const dialogData = new ClaimEditDialogModel('New Claim', claim, this.servicesList);
    const dialogRef = this.dialog.open(ClaimEditorComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult){
        this.claimsService.createClaim(dialogResult)
          .pipe(catchError((err) => this.handleError(err)))
          .subscribe((updatedClaim: IClaim) => {
            this.claims.push( {
              id: updatedClaim.id,
              firstName: updatedClaim.firstName,
              amountDue: updatedClaim.amountDue,
              servicesRenderedCount: updatedClaim.servicesRendered.length
            } as IClaimReadDto);
          });
      }
    });
  }

  editDialog(claimId: number): void {
    let editClaim: IClaim;
    this.claimsService.getClaim(claimId)
      .subscribe(
        claim => {
          editClaim = claim;
          const dialogData = new ClaimEditDialogModel('Edit Claim', editClaim, this.servicesList);
          const dialogRef = this.dialog.open(ClaimEditorComponent, {
            maxWidth: '400px',
            data: dialogData
          });

          dialogRef.afterClosed().subscribe(dialogResult => {

            if (dialogResult){
              this.claimsService.saveClaim(dialogResult)
                .pipe(catchError((err) => this.handleError(err)))
                .subscribe((updatedClaim: IClaim) => {
                  this.claims[(this.claims.indexOf(this.claims.find(s => s.id === updatedClaim.id)))] =  {
                    id: updatedClaim.id,
                    firstName: updatedClaim.firstName,
                    amountDue: updatedClaim.amountDue,
                    servicesRenderedCount: updatedClaim.servicesRendered.length
                  } as IClaimReadDto;
                });
            }
          });
        }
      );
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
