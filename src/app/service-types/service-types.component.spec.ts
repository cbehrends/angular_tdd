import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceTypesComponent } from './service-types.component';
import {ServicesTypesService} from './services-types.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';

import {IServiceType} from './service-type';

const errorResp = new Error('BOOM');

describe('ServiceTypesComponent', () => {
  let component: ServiceTypesComponent;
  let fixture: ComponentFixture<ServiceTypesComponent>;

  const testVal = new Observable<IServiceType>();
  let getServicesSpy: any;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ServicesTypesService', ['getServices', 'addService']);

    spy.getServices.and.returnValue(testVal);
    spy.addService.and.returnValue(testVal);

    TestBed.configureTestingModule({
      providers: [
        { provide: ServicesTypesService, useValue: spy },
        MatDialog,
        ServiceTypesComponent,
        {provide: MAT_DIALOG_DATA, useValue: {}},
        ],
      imports: [MatDialogModule, MatSnackBarModule],
      declarations: [ ServiceTypesComponent ]
    })
    .compileComponents();

    getServicesSpy = TestBed.inject(ServicesTypesService);
    component = TestBed.inject(ServiceTypesComponent);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ServicesTypesService.getServices on init', async () => {
    await component.ngOnInit();

    expect(getServicesSpy.getServices).toHaveBeenCalled();
  });

  it('should call ServicesTypesService.addService on add new service', async () => {
    component.addService('FOOOO');
    expect(getServicesSpy.addService).toHaveBeenCalled();
  });

  it('should call ServicesTypesService.addService on add new service and deal with errors', () => {

    getServicesSpy.addService.and.throwError(errorResp);

    expect(() => {
        component.addService('FOOO');
      }
    ).toThrowError();

  });
});
