import { CocktailsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  getCocktailFailure,
  getCocktailRequest,
  getCocktailSuccess,
  publishCocktailFailure,
  publishCocktailRequest,
  publishCocktailSuccess,
  rateCocktailFailure,
  rateCocktailRequest,
  rateCocktailSuccess,
  removeCocktailFailure,
  removeCocktailRequest,
  removeCocktailSuccess
} from './cocktails.actions';

const initialState: CocktailsState = {
  cocktails: [],
  cocktail: null,
  fetchLoading: false,
  fetchError: null,
  getLoading: false,
  getError: null,
  createLoading: false,
  createError: null,
  rateLoading: false,
  rateError: null,
  publishLoading: false,
  publishError: null,
  removeLoading: false,
  removeError: null,
};

export const cocktailsReducer = createReducer(
  initialState,

  on(fetchCocktailsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchCocktailsSuccess, (state,{ cocktails }) => ({...state, fetchLoading: false, cocktails})),
  on(fetchCocktailsFailure, state => ({...state, fetchLoading: false})),

  on(getCocktailRequest, state => ({...state, getLoading: true, getError: null, cocktail: null})),
  on(getCocktailSuccess, (state, { cocktail }) => ({...state, getLoading: false, cocktail})),
  on(getCocktailFailure, state => ({...state, getLoading: false})),

  on(createCocktailRequest, state => ({...state, createLoading: true, createError: null})),
  on(createCocktailSuccess, state => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, { error }) => ({...state, createLoading: false, createError: error})),

  on(rateCocktailRequest, state => ({...state, rateLoading: true, rateError: null})),
  on(rateCocktailSuccess, state => ({...state, rateLoading: false})),
  on(rateCocktailFailure, state => ({...state, rateLoading: false})),

  on(publishCocktailRequest, state => ({...state, publishLoading: true, publishError: null})),
  on(publishCocktailSuccess, state => ({...state, publishLoading: false})),
  on(publishCocktailFailure, state => ({...state, publishLoading: false})),

  on(removeCocktailRequest, state => ({...state, removeLoading: true, removeError: null})),
  on(removeCocktailSuccess, state => ({...state, removeLoading: false})),
  on(removeCocktailFailure, state => ({...state, removeLoading: false})),
);
