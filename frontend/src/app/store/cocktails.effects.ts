import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap } from 'rxjs';
import { CocktailsService } from '../services/cocktails.service';
import { map } from 'rxjs/operators';
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
  publishCocktailSuccess, rateCocktailFailure,
  rateCocktailRequest, rateCocktailSuccess,
  removeCocktailFailure,
  removeCocktailRequest,
  removeCocktailSuccess
} from './cocktails.actions';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class CocktailsEffects {

  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private router: Router,
    private cocktailsService: CocktailsService,
    private helpersService: HelpersService,
  ) {}

  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailsRequest),
    mergeMap(({ my }) => this.cocktailsService.fetchCocktails(my).pipe(
      map((cocktails) => fetchCocktailsSuccess({ cocktails })),
      this.helpersService.catchServerError(fetchCocktailsFailure),
    )),
  ));

  getCocktail = createEffect(() => this.actions.pipe(
    ofType(getCocktailRequest),
    mergeMap(({ id }) => this.cocktailsService.getCocktail(id).pipe(
      map((cocktail) => getCocktailSuccess({ cocktail })),
      this.helpersService.catchServerError(getCocktailFailure),
    )),
  ));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createCocktailRequest),
    mergeMap(({ cocktailData }) => this.cocktailsService.createCocktail(cocktailData).pipe(
      map(() => createCocktailSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpersService.openSnackBar('Your cocktail is being reviewed by a moderator');
      }),
      this.helpersService.catchServerError(createCocktailFailure),
    )),
  ));

  rateCocktail = createEffect(() => this.actions.pipe(
    ofType(rateCocktailRequest),
    mergeMap(({ id, rate }) => this.cocktailsService.rateCocktail(id, rate).pipe(
      map(() => rateCocktailSuccess()),
      tap(() => {
        this.store.dispatch(getCocktailRequest({ id }));
        this.helpersService.openSnackBar('Your vote has been accepted');
      }),
      this.helpersService.catchServerError(rateCocktailFailure),
    )),
  ));

  publishCocktail = createEffect(() => this.actions.pipe(
    ofType(publishCocktailRequest),
    mergeMap(({ id }) => this.cocktailsService.publishCocktail(id).pipe(
      map(() => publishCocktailSuccess()),
      tap(() => {
        this.store.dispatch(getCocktailRequest({ id }));
        this.helpersService.openSnackBar('Cocktail published');
      }),
      this.helpersService.catchServerError(publishCocktailFailure),
    )),
  ));

  removeCocktail = createEffect(() => this.actions.pipe(
    ofType(removeCocktailRequest),
    mergeMap(({ id }) => this.cocktailsService.removeCocktail(id).pipe(
      map(() => removeCocktailSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpersService.openSnackBar('Cocktail removed');
      }),
      this.helpersService.catchServerError(removeCocktailFailure),
    )),
  ));

}
