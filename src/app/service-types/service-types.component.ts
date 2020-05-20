import {Component, Input, OnInit} from '@angular/core';
import { ServicesService } from './services.service';
import {ServiceType} from './ServiceType';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.css']
})
export class ServiceTypesComponent implements OnInit {
  services: ServiceType[];

  @Input() newServiceName =  '';
  constructor(public servicesService: ServicesService) { }

  ngOnInit(): void {
    this.services = this.servicesService.getServices();
  }

  addService(description: string){
    this.servicesService.addService(new ServiceType(description));
    this.newServiceName = '';
  }

}
