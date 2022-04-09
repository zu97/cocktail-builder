export interface User {
  _id: string;
  googleId: string;
  displayName: string;
  avatar: string;
  token: string;
  role: string;
}

export interface LoginUserData {
  authToken: string;
  id: string;
  name: string;
  photoUrl: string;
}
