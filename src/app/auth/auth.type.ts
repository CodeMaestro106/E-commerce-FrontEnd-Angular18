// define custom types like action-related ones
export type AuthRole = 'admin' | 'user';

// Define the types for the login and user information
export interface User {
  username: string;
  email: string;
  role: AuthRole;
}

// Define type for your reducer or selectors.
export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
  isAuthenicated: boolean;
}

export const USER_TOKEN_KEY = 'auth_token';
export const USER_KEY = 'auth_user';
