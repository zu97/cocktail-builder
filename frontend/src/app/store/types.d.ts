import { User } from '../models/user.model';
import { Cocktail, CocktailError } from '../models/cocktail.model';

export type UsersState = {
  user: null | User,
  loginLoading: boolean,
  loginError: null,
}

export type CocktailsState = {
  cocktails: Cocktail[],
  cocktail: null | Cocktail,
  fetchLoading: boolean,
  fetchError: null | string,
  getLoading: boolean,
  getError: null | string,
  createLoading: boolean,
  createError: null | CocktailError,
  rateLoading: boolean,
  rateError: null | string,
  publishLoading: boolean,
  publishError: null | string,
  removeLoading: boolean,
  removeError: null | string,
}

export type AppState = {
  users: UsersState,
  cocktails: CocktailsState,
}
