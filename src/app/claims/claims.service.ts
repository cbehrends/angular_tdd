import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IClaim} from './IClaim';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IClaimReadDto} from "./IClaimReadDto";

@Injectable({
  providedIn: 'root'
})

export class ClaimsService {
  private claimsUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getClaim(id: number): any{
    const url = this.claimsUrl + '/claims/' + id;
    return this.http.get(url);
  }

  getClaims(): Observable<IClaimReadDto[]> {
    const url = this.claimsUrl + '/claims';

    return this.http.get<IClaimReadDto[]>(url);
  }

  createClaim(claim: IClaim){
    const url = this.claimsUrl + '/claims';
    return this.http.post(url, claim);
  }

  saveClaim(claim: IClaim): Observable<any>{
    const url = this.claimsUrl + '/claims';
    return this.http.put(url, claim);
  }
}
