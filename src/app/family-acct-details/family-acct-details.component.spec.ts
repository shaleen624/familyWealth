import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAcctDetailsComponent } from './family-acct-details.component';

describe('FamilyAcctDetailsComponent', () => {
  let component: FamilyAcctDetailsComponent;
  let fixture: ComponentFixture<FamilyAcctDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyAcctDetailsComponent]
    });
    fixture = TestBed.createComponent(FamilyAcctDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
