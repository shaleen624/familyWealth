import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { LandingComponent } from './landing/landing.component';
import { FamilyAcctDetailsComponent } from './family-acct-details/family-acct-details.component';
import { SpendingComponent } from './spending/spending.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FamilyAcctDetailsComponent,
    SpendingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
