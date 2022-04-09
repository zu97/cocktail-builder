import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponents } from './page-not-found.components';
import { LayoutComponent } from './ui/layout/layout.component';
import { EditCocktailComponent } from './pages/edit-cocktail/edit-cocktail.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { CocktailsComponent } from './pages/cocktails/cocktails.component';
import { CocktailItemComponent } from './pages/cocktails/cocktail-item/cocktail-item.component';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './auth.interceptor';
import { HasRoleDirective } from './directives/has-role.directive';
import { LoaderComponent } from './ui/loader/loader.component';
import { IsAuthDirective } from './directives/is-auth.directive';


const socialAuthConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleApiId, {
        scope: 'profile'
      })
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponents,
    LayoutComponent,
    EditCocktailComponent,
    FileInputComponent,
    CocktailsComponent,
    CocktailItemComponent,
    CocktailDetailsComponent,
    HasRoleDirective,
    LoaderComponent,
    IsAuthDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    AppStoreModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    SocialLoginModule,
    MatProgressSpinnerModule,
    NgxStarRatingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialAuthConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
