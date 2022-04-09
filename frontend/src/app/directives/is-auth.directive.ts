import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';

@Directive({
  selector: '[appIsAuth]'
})
export class IsAuthDirective implements OnInit, OnDestroy {
  @Input('appIsAuth') isAuthorized!: boolean;
  @Input('appIsAuthElse') elseIsAuthorized?: TemplateRef<any>;

  user: Observable<null | User>;
  userSub!: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>,
  ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe((user) => {
      this.viewContainer.clear();

      if (this.isAuthorized === !!user) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (this.elseIsAuthorized) {
        this.viewContainer.createEmbeddedView(this.elseIsAuthorized);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
