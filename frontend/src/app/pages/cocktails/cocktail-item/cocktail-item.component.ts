import { Component, Input } from '@angular/core';
import { Cocktail } from '../../../models/cocktail.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.css']
})
export class CocktailItemComponent {
  @Input() cocktail!: Cocktail;
  apiUrl = environment.apiUrl;
}
