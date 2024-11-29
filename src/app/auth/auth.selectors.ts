import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.type';
import { authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

// Selector for user
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// Selector for loading state
export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

// Selector for error state
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

// Selector for error state
export const selectCheckAuthenticate = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenicated
);
