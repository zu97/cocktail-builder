import { createAction, props } from '@ngrx/store';
import { Cocktail, CocktailData, CocktailError } from '../models/cocktail.model';

export const fetchCocktailsRequest = createAction('[Cocktails] Fetch Request', props<{ my?: boolean }>());
export const fetchCocktailsSuccess = createAction('[Cocktails] Fetch Success', props<{ cocktails: Cocktail[] }>());
export const fetchCocktailsFailure = createAction('[Cocktails] Fetch Failure');

export const getCocktailRequest = createAction('[Cocktails] Get Request', props<{ id: string }>());
export const getCocktailSuccess = createAction('[Cocktails] Get Success', props<{ cocktail: Cocktail }>());
export const getCocktailFailure = createAction('[Cocktails] Get Failure');

export const createCocktailRequest = createAction('[Cocktails] Create Request', props<{ cocktailData: CocktailData }>());
export const createCocktailSuccess = createAction('[Cocktails] Create Success');
export const createCocktailFailure = createAction('[Cocktails] Create Failure', props<{ error: CocktailError }>());

export const rateCocktailRequest = createAction('[Cocktails] Rate Request', props<{ id: string, rate: number }>());
export const rateCocktailSuccess = createAction('[Cocktails] Rate Success');
export const rateCocktailFailure = createAction('[Cocktails] Rate Failure');

export const publishCocktailRequest = createAction('[Cocktails] Publish Request', props<{ id: string }>());
export const publishCocktailSuccess = createAction('[Cocktails] Publish Success');
export const publishCocktailFailure = createAction('[Cocktails] Publish Failure');

export const removeCocktailRequest = createAction('[Cocktails] Remove Request', props<{ id: string }>());
export const removeCocktailSuccess = createAction('[Cocktails] Remove Success');
export const removeCocktailFailure = createAction('[Cocktails] Remove Failure');
