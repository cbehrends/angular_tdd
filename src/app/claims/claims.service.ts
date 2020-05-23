import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IClaim} from './IClaim';
import {DataService} from '../services/data.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  private claimsUrl = 'http://localhost:5000';
  constructor(private dataService: DataService) { }

  getClaim(id: number): Observable<IClaim>{
    const url = this.claimsUrl + '/claims/' + id;

    return this.dataService.get(url).pipe<IClaim>(tap((response: any) => {
      return response;
    }));
  }

  getClaims(): Observable<IClaim[]> {
    const url = this.claimsUrl + '/claims';

    return this.dataService.get(url).pipe<IClaim[]>(tap((response: any) => {
      return response;
    }));
  }
}
