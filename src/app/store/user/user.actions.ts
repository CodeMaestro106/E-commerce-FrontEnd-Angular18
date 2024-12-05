import { createAction, props } from '@ngrx/store';
import { User } from './user.type';

export const getUserListAction = createAction('[User] load categories');

// get
export const getUserListSuccess = createAction(
  '[User] get User List is success',
  props<{ users: User[] }>(),
);

// delete
export const deleteUserAction = createAction(
  '[User] delete User by id',
  props<{ id: number }>(),
);

export const deleteUserSuccess = createAction(
  '[User] delete User  is success',
  props<{ id: number }>(),
);

// action failure
export const actionUserFailure = createAction(
  '[User] action is failure',
  props<{ error: string }>(),
);
