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

  it('should contain a Home nav link', () => {
    const compiled = fixture.nativeElement;
    const navLink = compiled.querySelector('#home');
    expect(navLink.textContent).toContain('Home');
  });

  it('home nav link should route to home page', async () => {
    const compiled = fixture.nativeElement;
    const navLink = compiled.querySelector('#home');
    await router.navigateByUrl('/claims'); // Set to something other than the default route
    expect(router.url).toBe('/claims');
    await navLink.click();
    expect(router.url).toBe('/');
  });

  it('should contain a Claims nav link', () => {
    const compiled = fixture.nativeElement;
    const navLink = compiled.querySelector('#claims');
    expect(navLink.textContent).toContain('Claims');
  });

  it('claims nav link should route to claims page', async () => {
    const compiled = fixture.nativeElement;
    const navLink = compiled.querySelector('#claims');
    await router.navigateByUrl('/dummy'); // Set to something other than the claims route
    await navLink.click();
    expect(router.url).toBe('/claims');
  });

});
