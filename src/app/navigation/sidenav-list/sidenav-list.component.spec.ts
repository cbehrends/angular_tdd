import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavListComponent } from './sidenav-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'claims', component: SidenavListComponent},
          {path: '', component: SidenavListComponent},
          {path: 'dummy', component: SidenavListComponent}
        ])
      ],
      declarations: [ SidenavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new SideNav component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a Home button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('#home');
    expect(button.textContent).toContain('Home');
  });

  it('home button should route to home page', async () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('#home');
    await router.navigateByUrl('/claims'); // Set to something other than the default route
    expect(router.url).toBe('/claims');
    await button.click();
    expect(router.url).toBe('/');
  });

  it('should contain a Claims button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('#claims');
    expect(button.textContent).toContain('Claims');
  });

  it('home button should route to claims page', async () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('#claims');
    await router.navigateByUrl('/dummy'); // Set to something other than the claims route
    await button.click();
    expect(router.url).toBe('/claims');
  });

});
