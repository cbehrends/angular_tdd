import {Component, OnInit} from '@angular/core';
import {IServiceType} from './service-type';
import {ServicesTypesService} from './services-types.service';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.css']
})
export class ServiceTypesComponent implements OnInit {
  newServiceName: string;
  services: IServiceType[];
  errorReceived: boolean;
  dialogResult: boolean;

  constructor(public servicesTypesService: ServicesTypesService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Services');
    this.newServiceName = '';
    this.getServices();
  }

  addService(serviceDescription: string){
    this.errorReceived = false;
    this.servicesTypesService.addService(serviceDescription)
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  getServices() {
    this.errorReceived = false;
    this.servicesTypesService.getServices()
      .pipe(catchError(this.handleError))
      .subscribe(services => {
        this.services = services;
      });
  }

  confirmDialog(id: number): void {
    const message = 'Are you sure you want to delete this record';

    const dialogData = new ConfirmDialogModel('Confirm Delete', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.dialogResult = dialogResult;
      if (dialogResult){

        this.servicesTypesService.deleteService(id)
          .pipe(catchError((err) => this.handleError(err)))
          .subscribe(() => {
            this.services.splice(this.services.indexOf(this.services.find(s => s.id === id)), 1);
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

  private handleError(error: Error) {
    this.errorReceived = true;
    this.openSnackBar(error.message, 'Confirm');
    return throwError(error);
  }
}
