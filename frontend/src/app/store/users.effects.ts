import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginUserFailure, loginUserRequest, loginUserSuccess, logoutUser, logoutUserRequest } from './users.actions';
import { mergeMap, tap } from 'rxjs';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HelpersService } from '../services/helpers.service';
import { SocialAuthService } from 'angularx-social-login';

@Injectable()
export class UsersEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private socialsService: SocialAuthService,
    private helpersService: HelpersService,
    private usersService: UsersService,
  ) {}

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.loginUser(userData).pipe(
      map((user) => loginUserSuccess({user})),
      tap(() => {
        this.helpersService.openSnackBar('Login successful');
      }),
      this.helpersService.catchServerError(loginUserFailure),
    )),
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => this.usersService.logoutUser().pipe(
      map(() => logoutUser()),
      tap(() => {
        void this.router.navigate(['/']);
        void this.socialsService.signOut();
        this.helpersService.openSnackBar('Logout successful');
      }),
    )),
  ));

}
