import { TestBed } from '@angular/core/testing';
import { ServicesService } from './services.service';
import {ServiceType} from './ServiceType';

describe('ServicesService', () => {
  let service: ServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new Service description', () => {
    service.addService(new ServiceType('FOO'));
    expect(service.services.length).toBe(1);
  });

  it('should return a list of ServiceTypes', () => {
    service.getServices();
    expect(service.services.length).toBe(3);
  });
});
