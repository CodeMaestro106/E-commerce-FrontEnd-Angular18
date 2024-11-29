// import {
//   ApplicationConfig,
//   importProvidersFrom,
//   isDevMode,
//   provideZoneChangeDetection,
// } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app-routing.module';

// import { BrowserModule } from '@angular/platform-browser';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideAnimations } from '@angular/platform-browser/animations';

// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import {
//   provideHttpClient,
//   withInterceptorsFromDi,
// } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     // provideZoneChangeDetection({ eventCoalescing: true }),
//     importProvidersFrom(
//       BrowserModule,
//       EffectsModule.forRoot([]),
//       StoreModule.forRoot({}, {}),
//       StoreDevtoolsModule.instrument({
//         maxAge: 25,
//         logOnly: !isDevMode(),
//         autoPause: true,
//         trace: false,
//         traceLimit: 75,
//         connectInZone: true,
//       })
//     ),
//     provideAnimationsAsync(),
//     provideAnimations(),
//     provideHttpClient(withInterceptorsFromDi()),
//     provideRouter(routes),
//   ],
// };
