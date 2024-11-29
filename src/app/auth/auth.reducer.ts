import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, USER_KEY, USER_TOKEN_KEY } from './auth.type';
import { AuthStorageService } from './auth.storage.service';

export const authFeatureKey = 'auth';

// Define the initial state for the Auth feature
const initialAuthState: AuthState = {
  user: null,
  error: null,
  loading: false,
  isAuthenicated: false,
};

export const authReducer = createReducer(
  initialAuthState,
  // Handle actions
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.loginSuccess, (state, { user, token }) => {
    // Store in localStorage
    return {
      ...state,
      user: { ...user, token }, // update user data and token
      error: null,
      loading: false,
      isAuthenicated: true,
    };
  }),

  on(AuthActions.loginFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),

  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
      token: null,
      error: null,
    };
  }),

  // register
  // Handle actions
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.registerSuccess, (state, {}) => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(AuthActions.registerFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  })
);
