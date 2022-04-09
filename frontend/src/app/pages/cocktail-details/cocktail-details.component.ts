import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getCocktailRequest,
  publishCocktailRequest,
  rateCocktailRequest,
  removeCocktailRequest
} from '../../store/cocktails.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  cocktail: Observable<null | Cocktail>;
  getLoading: Observable<boolean>;
  getError: Observable<null | string>;
  publishLoading: Observable<boolean>;
  publishError: Observable<null | string>;
  removeLoading: Observable<boolean>;
  removeError: Observable<null | string>;

  userId = '';
  cocktailId = '';

  votes = 0;
  allRating = 0;
  ourRating = 0;

  apiUrl = environment.apiUrl;

  private userSub!: Subscription;
  private cocktailSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.user = store.select((state) => state.users.user);
    this.cocktail = store.select((state) => state.cocktails.cocktail);
    this.getLoading = store.select((state) => state.cocktails.getLoading);
    this.getError = store.select((state) => state.cocktails.getError);
    this.publishLoading = store.select((state) => state.cocktails.publishLoading);
    this.publishError = store.select((state) => state.cocktails.publishError);
    this.removeLoading = store.select((state) => state.cocktails.removeLoading);
    this.removeError = store.select((state) => state.cocktails.removeError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        void this.router.navigate(['404']);
        return;
      }

      this.cocktailId = id;
      this.store.dispatch(getCocktailRequest({id}));
    });

    this.userSub = this.user.subscribe((user) => {
      if (!user) {
        return;
      }

      this.userId = user._id;
    });

    this.cocktailSub = this.cocktail.subscribe((cocktail) => {
      if (!cocktail) {
        return;
      }

      this.votes = 0;
      this.allRating = 0;
      this.ourRating = 0;

      cocktail.rates.forEach((rate) => {
        this.votes++;
        this.allRating += rate.rate;

        if (this.userId === rate.user) {
          this.ourRating = rate.rate;
        }
      });
    });
  }

  onPublish() {
    this.store.dispatch(publishCocktailRequest({id: this.cocktailId}));
  }

  onRemove() {
    this.store.dispatch(removeCocktailRequest({id: this.cocktailId}));
  }

  onRate() {
    this.store.dispatch(rateCocktailRequest({id: this.cocktailId, rate: this.ourRating }));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
    this.cocktailSub.unsubscribe()
  }

}
