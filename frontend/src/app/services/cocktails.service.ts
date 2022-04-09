import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Cocktail, CocktailData } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  constructor(
    private http: HttpClient,
  ) {}

  fetchCocktails(my?: boolean) {
    const getMyCocktails = my ? '?my=true' : '';
    return this.http.get<Cocktail[]>(env.apiUrl + '/cocktails' + getMyCocktails);
  }

  getCocktail(id: string) {
    return this.http.get<Cocktail>(env.apiUrl + '/cocktails/' + id);
  }

  createCocktail(cocktailData: CocktailData) {
    const body = new FormData();
    Object.keys(cocktailData).forEach((key) => {
      body.append(key, cocktailData[key]);
    });

    return this.http.post(env.apiUrl + '/cocktails', body);
  }

  rateCocktail(id: string, rate: number) {
    return this.http.post(env.apiUrl + '/cocktails/' + id + '/rate', { rate });
  }

  publishCocktail(id: string) {
    return this.http.post(env.apiUrl + '/cocktails/' + id + '/publish', {});
  }

  removeCocktail(id: string) {
    return this.http.delete(env.apiUrl + '/cocktails/' + id);
  }

}
