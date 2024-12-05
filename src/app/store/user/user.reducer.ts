import { createFeature, createReducer, on } from '@ngrx/store';
import { UserState } from './user.type';
import {
  getUserListSuccess,
  actionUserFailure,
  deleteUserSuccess,
} from './user.actions';

export const userFeatureKey = 'user';

export const initialState: UserState = {
  users: [],
  error: '',
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  // get User list
  on(getUserListSuccess, (store: UserState, result) => {
    const combinedUserItems = [...store.users, ...result.users];

    // Filter for unique items based on `id`
    const uniqueUserItems = combinedUserItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );
    return {
      ...store,
      users: uniqueUserItems,
      loading: false,
      error: null,
    };
  }),

  // delete User success
  on(deleteUserSuccess, (store: UserState, result) => {
    const users = store.users.filter((user) => user.id !== result.id);
    console.log('reducer=>', users);
    return {
      ...store,
      users: users,
      loading: false,
      error: null,
    };
  }),

  on(actionUserFailure, (store: UserState, result) => {
    return {
      ...store,
      loading: false, // Set loading to false as the data has been loaded
      error: result.error, // Reset the error state (if any)
    };
  }),
);
