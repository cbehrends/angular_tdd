import {inject, TestBed} from '@angular/core/testing';
import { ClaimsService } from './claims.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IClaim} from './IClaim';

describe('ClaimsService', () => {
  let service: ClaimsService;
  let httpMock: HttpTestingController;
  const fakeClaims = [
    { firstName: 'Corey' } as IClaim,
    { firstName: 'Hank' } as IClaim
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClaimsService
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClaimsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch claims from DataService', () => {

    service.getClaims().subscribe(claims => {
      expect(claims.length).toBe(2);
      expect(claims).toEqual(fakeClaims);
    });

    service.getClaims();
    const req = httpMock.expectOne('http://localhost:5000/claims');
    expect(req.request.method).toEqual('GET');

    req.flush(fakeClaims);
  });

  it('should fetch claims', () => {

    service.getClaims().subscribe(claims => {
      expect(claims.length).toBe(2);
      expect(claims).toEqual(fakeClaims);
    });

    const req = httpMock.expectOne('http://localhost:5000/claims');
    expect(req.request.method).toEqual('GET');

    req.flush(fakeClaims);
  });

  it('should fetch single claim ', () => {

    service.getClaim(1).subscribe(claim => {
      console.log(claim);
    });

    const req = httpMock.expectOne('http://localhost:5000/claims/1');
    expect(req.request.method).toEqual('GET');
  });

  it('should update claim ', () => {

    service.saveClaim({id: 1, firstName: 'FOO'} as IClaim).subscribe(claim => {
      console.log(claim);
    });

    const req = httpMock.expectOne('http://localhost:5000/claims');
    expect(req.request.method).toEqual('PUT');
  });
});
