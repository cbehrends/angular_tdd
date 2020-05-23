import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IServiceType} from './service-type';
import {DataService} from '../services/data.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesTypesService {
  private serviceTypeUrl = 'http://localhost:5000';
  constructor(private dataService: DataService) { }

  getService(id: number): Observable<IServiceType>{
    const url = this.serviceTypeUrl + '/services/' + id;

    return this.dataService.get(url).pipe<IServiceType>(tap((response: any) => {
      return response;
    }));
  }

  getServices(): Observable<IServiceType[]> {
    const url = this.serviceTypeUrl + '/services';

    return this.dataService.get(url).pipe<IServiceType[]>(tap((response: any) => {
      return response;
    }));
  }

  addService(description: string): Observable<IServiceType>{
    const url = this.serviceTypeUrl + '/services';

    return this.dataService.post(url, {description}).pipe<IServiceType>(tap((response: any) => {
      return response;
    }));
  }

  deleteService(id: number): Observable<Response>{
    const url = this.serviceTypeUrl + '/services/' + id;
    // this.dataService.delete(url);
    return this.dataService.delete(url).pipe(tap((response: any) => {
      return response;
    }));
  }
}
