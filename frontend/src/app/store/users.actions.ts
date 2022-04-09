import { createAction, props } from '@ngrx/store';
import { LoginUserData, User } from '../models/user.model';

export const loginUserRequest = createAction('[Users] Login Request', props<{ userData: LoginUserData }>());
export const loginUserSuccess = createAction('[Users] Login Success', props<{ user: User }>());
export const loginUserFailure = createAction('[Users] Login Failure');

export const logoutUserRequest = createAction('[Users] Logout Request');
export const logoutUser = createAction('[Users] Logout');
