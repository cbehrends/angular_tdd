import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimEditorComponent } from './claim-editor.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {IClaim} from '../IClaim';

describe('ClaimEditorComponent', () => {
  let component: ClaimEditorComponent;
  let fixture: ComponentFixture<ClaimEditorComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEditorComponent ],
      providers: [MatDialogModule,
        {provide: MatDialogRef, useValue: {}},
        { provide: FormBuilder, useValue: formBuilder },
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEditorComponent);
    component = fixture.componentInstance;
    component.editForm = formBuilder.group({
      firstName: ''
    });
    component.claim = {firstName: 'foo'} as IClaim;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
