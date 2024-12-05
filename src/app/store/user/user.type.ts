export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
