import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Import standalone AppComponent
import { authFeatureKey, authReducer } from './auth/auth.reducer'; // Import your reducers
import { HeaderComponent } from './common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './common/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthEffects } from './auth/auth.effects';

import { httpInterceptorProviders } from './interceptor/http.interceptor';

import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { RegisterComponent } from './common/register/register.component';
import { OtpComponent } from './common/otp/otp.component';
import { SideBarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { NotFoundComponent } from './common/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    OtpComponent,
    SideBarComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    // AuthModule,
    BrowserModule,
    CommonModule,
    StoreModule.forRoot(),
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    StoreDevtoolsModule.instrument(), // Optional: for debugging NgRx state
    EffectsModule.forRoot([]), // Add effects module for handling side effects.
    AppRoutingModule, // The routing configuration
    ReactiveFormsModule,
    HttpClientModule, // HTTP client module to handle API calls

    //-----------
    UserModule,
    AdminModule,
    FormsModule,
  ],
  exports: [AppComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent], // Bootstrap the standalone AppComponent here
})
export class AppModule {}
