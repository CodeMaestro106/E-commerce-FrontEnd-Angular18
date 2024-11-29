import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from './auth.reducer';
import { AuthService } from './auth.service';
import { LoginComponent } from '../common/login/login.component';
import { HeaderComponent } from '../common/header/header.component';

// @NgModule({
//   declarations: [LoginComponent, HeaderComponent],
//   imports: [
//     CommonModule,
//     StoreModule.forFeature(authFeatureKey, authReducer),
//     EffectsModule.forFeature([AuthEffects]),
//   ],
//   providers: [AuthService],
// })
// export class AuthModule {}
