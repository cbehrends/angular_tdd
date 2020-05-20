import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesService} from './services.service';
import { ServiceTypesComponent } from './service-types.component';
import {ServiceType} from './ServiceType';

let servicesServiceSpy: ServicesService;

describe('ServiceTypesComponent', () => {
  let component: ServiceTypesComponent;
  let fixture: ComponentFixture<ServiceTypesComponent>;

  beforeEach(async(() => {
    const getServicesSpy = jasmine.createSpyObj('ServicesService', ['getServices', 'addService']);
    getServicesSpy.getServices.and.returnValue([new ServiceType('FOO')]);

    TestBed.configureTestingModule({
      providers: [{ provide: ServicesService, useValue: getServicesSpy }],
      declarations: [ ServiceTypesComponent ]
    })
    .compileComponents();

    servicesServiceSpy = TestBed.inject(ServicesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ServicesService.getServices on init', async () => {
    await component.ngOnInit();
    expect(component.servicesService.getServices).toHaveBeenCalled();
  });

  it('should call ServicesService.addService on add new service', async () => {
    component.addService('FOOOO');
    expect(component.servicesService.addService).toHaveBeenCalledWith(new ServiceType('FOOOO'));
  });
});
