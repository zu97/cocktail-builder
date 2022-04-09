export interface Cocktail {
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: {
    ingredient: string;
    amount: string;
  }[],
  rates: {
    user: string;
    rate: number;
  }[]
}

export interface CocktailData {
  [ key: string ]: any;
  name: string;
  ingredients: string;
  recipe: string;
  image: string;
}

interface FieldError {
  message: string;
}

export interface CocktailError {
  errors: {
    name?: undefined | FieldError;
    ingredients?: undefined | FieldError;
    recipe?: undefined | FieldError;
    image?: undefined | FieldError;
  }
}
