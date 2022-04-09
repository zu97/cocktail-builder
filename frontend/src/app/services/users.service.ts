import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { LoginUserData, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) {}

  loginUser(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/users', userData);
  }

  logoutUser() {
    return this.http.delete(env.apiUrl + '/users');
  }

}
