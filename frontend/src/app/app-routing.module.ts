import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponents } from './page-not-found.components';
import { EditCocktailComponent } from './pages/edit-cocktail/edit-cocktail.component';
import { CocktailsComponent } from './pages/cocktails/cocktails.component';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'cocktails', children: [
    {path: '', component: CocktailsComponent},
    {path: 'my', component: CocktailsComponent, canActivate: [AuthGuardService]},
    {path: 'create', component: EditCocktailComponent, canActivate: [AuthGuardService]},
    {path: ':id', component: CocktailDetailsComponent},
  ]},
  {path: '**', component: PageNotFoundComponents},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
