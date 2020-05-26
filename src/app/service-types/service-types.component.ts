import {Component, OnInit} from '@angular/core';
import {IServiceType} from './service-type';
import {ServicesTypesService} from './services-types.service';
import {catchError, map, tap} from 'rxjs/operators';
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
    if(this.services === undefined){
      this.services = new Array(0);
    }
    this.servicesTypesService.addService(serviceDescription)
      .subscribe(
        data => {
          this.services.push({id: data.id, description: data.description});
          this.newServiceName = '';
        },
        error => this.handleError(error)
      );
  }

  getServices() {
    this.errorReceived = false;
    this.servicesTypesService.getServices()
      .subscribe(
        services =>  this.services = services,
          error => this.handleError(error)
        );
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

        this.deleteService(id);
      }
    });
  }

  public deleteService(id: number) {
    this.servicesTypesService.deleteService(id)
      .subscribe(
        () => this.services.splice(this.services.indexOf(this.services.find(s => s.id === id)), 1),
        error => this.handleError(error)
      );
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
