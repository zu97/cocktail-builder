import { createReducer, on } from '@ngrx/store';
import { loginUserFailure, loginUserRequest, loginUserSuccess, logoutUser } from './users.actions';
import { UsersState } from './types';

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  loginError: null,
};

export const usersReducer = createReducer(
  initialState,
  on(loginUserRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(loginUserSuccess, (state, { user }) => ({...state, loginLoading: false, user})),
  on(loginUserFailure, state => ({...state, loginLoading: false})),
  on(logoutUser, state => ({...state, user: null})),
);
