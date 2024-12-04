import { User, UserState } from './user.type';
import { userFeatureKey } from './user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

// selector to gett the User items
export const selectUserItems = createSelector(
  selectUserState,
  (state: UserState) => {
    console.log('state', state);
    return state.users;
  },
);

// selector to get the loading state
export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading,
);

// selector to get any error message
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error,
);
