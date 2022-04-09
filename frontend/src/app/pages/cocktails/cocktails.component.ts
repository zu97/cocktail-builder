import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { fetchCocktailsRequest } from '../../store/cocktails.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails: Observable<Cocktail[]>;
  fetchLoading: Observable<boolean>;
  fetchError: Observable<null | string>;

  private getMyCocktails = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.cocktails = store.select((state) => state.cocktails.cocktails);
    this.fetchLoading = store.select((state) => state.cocktails.fetchLoading);
    this.fetchError = store.select((state) => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.route.url.subscribe((segment) => {
      this.getMyCocktails = segment[0] && segment[0].path === 'my';
      this.store.dispatch(fetchCocktailsRequest({ my: this.getMyCocktails }));
    });
  }

}
