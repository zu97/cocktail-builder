import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LoginUserData, User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { loginUserRequest, logoutUserRequest } from '../../store/users.actions';
import { AppState } from '../../store/types';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: Observable<null | User>;
  apiUrl = environment.apiUrl;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService,
  ) {
    this.user = store.select((state) => state.users.user);
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      const userData: LoginUserData = {
        authToken: user.authToken,
        id: user.id,
        name: user.name,
        photoUrl: user.photoUrl
      };

      this.store.dispatch(loginUserRequest({ userData }));
    });
  }

  login() {
    void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }
}
