import { Injectable } from '@angular/core';
import {ServiceType} from './ServiceType';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  services = [];
  constructor() { }

  getServices(): ServiceType[]{
    this.services = new Array(new ServiceType('Toenail Removal'));
    this.services.push(new ServiceType('Covid-19 Test'));
    this.services.push(new ServiceType('Ear Cleaning'));
    return this.services;
  }

  addService(serviceType: ServiceType){
    this.services.push(serviceType);
  }

}
