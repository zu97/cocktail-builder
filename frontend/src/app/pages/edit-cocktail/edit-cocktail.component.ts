import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createCocktailRequest } from '../../store/cocktails.actions';
import { Observable } from 'rxjs';
import { CocktailData, CocktailError } from '../../models/cocktail.model';

@Component({
  selector: 'app-edit-cocktail',
  templateUrl: './edit-cocktail.component.html',
  styleUrls: ['./edit-cocktail.component.css']
})
export class EditCocktailComponent implements OnInit {
  form = new FormGroup({});

  createLoading: Observable<boolean>;
  createError: Observable<null | CocktailError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.createLoading = store.select((state) => state.cocktails.createLoading);
    this.createError = store.select((state) => state.cocktails.createError);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
      recipe: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });

    this.addIngredient();
  }

  getIngredients() {
    const ingredients = <FormArray>this.form.get('ingredients');
    return ingredients.controls;
  }

  addIngredient() {
    const ingredients = <FormArray>this.form.get('ingredients');
    const newGroup = new FormGroup({
      ingredient: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });

    ingredients.push(newGroup);
  }

  removeIngredient(index: number) {
    if (index === 0) {
      return;
    }

    const ingredients = <FormArray>this.form.get('ingredients');
    ingredients.removeAt(index);
  }

  checkFieldError(fieldName: string, error: string) {
    const field = this.form.get(fieldName);
    if (!field) {
      return;
    }

    return field.touched && field.hasError(error);
  }

  checkIngredientError(index: number, fieldName: string, error: string) {
    const ingredients = <FormArray>this.form.get('ingredients');
    const formGroup = ingredients.controls[index];
    if (!formGroup) {
      return;
    }

    const field = formGroup.get(fieldName);
    if (!field) {
      return;
    }

    return field.touched && field.hasError(error);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const cocktailData: CocktailData = {
      ...this.form.value,
      ingredients: JSON.stringify(this.form.value.ingredients),
    };

    this.store.dispatch(createCocktailRequest({cocktailData}));
  }

}
