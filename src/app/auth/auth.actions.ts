import { createAction, props } from '@ngrx/store';

// Define the action for login
export const login = createAction(
  '[Auth] Login', // Action type, usually scoped to a feature like 'Auth'
  props<{ email: string; password: string }>(), // Payload for login credentials
);

export const verifyOtp = createAction(
  '[Auth] verifyOtp',
  props<{ email: string; otp: string }>(),
);

export const sendOtp = createAction(
  '[Auth] sendOtp',
  props<{ email: string; password: string }>(),
);

// Action for successful login
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>(), // Payload containing user data and auth token
);

// Action for failed login attempt
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(), // Payload for the error message
);

// Action for logout
export const logout = createAction('[Auth] Logout');

// Define the action for register
export const register = createAction(
  '[Auth] Register', // Action type, usually scoped to a feature like 'Auth'
  props<{ username: string; email: string; password: string }>(), // Payload for register credentials
);

// Action for successful register
export const registerSuccess = createAction('[Auth] Register Success');

// Action for failed register attempt
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>(), // Payload for the error message
);
