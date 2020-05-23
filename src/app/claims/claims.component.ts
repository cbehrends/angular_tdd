import { Component, OnInit } from '@angular/core';
import {ClaimsService} from './claims.service';
import {IClaim} from './IClaim';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims: IClaim[];
  errorReceived: boolean;
  constructor(private claimsService: ClaimsService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  getClaims() {
    this.errorReceived = false;
    this.claimsService.getClaims()
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(claims => {
        this.claims = claims;
      });
  }
  private handleError(error: any) {
      this.errorReceived = true;
      return throwError(error);
  }
}
