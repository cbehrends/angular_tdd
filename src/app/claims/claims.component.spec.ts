import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimsComponent } from './claims.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ClaimsService} from './claims.service';
import {of} from 'rxjs';
import {IClaim} from './IClaim';

let claimServiceSpy: any;

const testData = [{id: 1, firstName: 'Foo'} as IClaim, {id: 2, firstName: 'Bar'} as IClaim];

const testVal = of(testData[0]);
const test = of(testData);

describe('ClaimsComponent', () => {
  let claimsComponent: ClaimsComponent;
  let fixture: ComponentFixture<ClaimsComponent>;

  beforeEach(async(() => {

    claimServiceSpy = jasmine.createSpyObj('ClaimsService', ['getClaims', 'saveClaim', 'handleError']);
    claimServiceSpy.getClaims.and.returnValue(test);
    claimServiceSpy.saveClaim.and.returnValue(testVal);

    TestBed.configureTestingModule({
      declarations: [ ClaimsComponent ],
      providers: [
        { provide: ClaimsService, useValue: claimServiceSpy },
        MatDialog
      ],
      imports: [OverlayModule, MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();

    // claimsService = TestBed.inject(ClaimsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsComponent);
    claimsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new Claims component instance and call getClaims on ngInit', () => {
    expect(claimsComponent).toBeTruthy();
    expect(claimServiceSpy.getClaims).toHaveBeenCalled();
  });

  it('should getClaims', () => {
    claimsComponent.getClaims();
    expect(claimServiceSpy.getClaims).toHaveBeenCalled();
  });

  it('should handle error in getClaims', () => {
    claimServiceSpy.getClaims.and.throwError('BOOM');
    expect( () => {
      claimsComponent.getClaims();
    }).toThrowError('BOOM');

  });

  it('should call saveClaim on claim service', () => {
    claimsComponent.saveClaim({id: 1, firstName: 'Foo'} as IClaim);
    expect(claimServiceSpy.saveClaim).toHaveBeenCalled();
  });

  it('should call createClaim on claim service', () => {
    claimsComponent.saveClaim({id: 1, firstName: 'Foo'} as IClaim);
    expect(claimServiceSpy.saveClaim).toHaveBeenCalled();
  });

});
