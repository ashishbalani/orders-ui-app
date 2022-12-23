import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { OktaAuth } from '@okta/okta-auth-js';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const config = {
    issuer: 'https://not-real.okta.com',
    clientId: 'fake-client-id',
    redirectUri: 'http://localhost:4200'
  };
  const oktaAuth = new OktaAuth(config);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        OktaAuthModule
      ],
      providers: [{provide: OKTA_CONFIG, useValue: { oktaAuth }}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
