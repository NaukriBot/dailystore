import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/redux/reducers/index';
import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map, takeUntil } from 'rxjs/operators';
import { CHAR_LENGTH_128, emailPhoneRegex } from '../../../core/providers/helper';
import { login, loginFailure } from '../../../core/redux/actions/auth.actions';
import { Router } from '@angular/router';
import { selectIsLoggedIn } from '../../../core/redux/selectors/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: any = {};
  destroyed$ = new Subject<boolean>();
  loginForm!: FormGroup;
  loginFailure = false;
  hide = true;

  constructor(
    private router: Router,
    public actions$: Actions,
    public store: Store<fromStore.State>,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.setUpLoginForm();

    this.store.select(selectIsLoggedIn).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
      console.log(isLoggedIn);
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  setUpLoginForm = () => {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(CHAR_LENGTH_128),
          Validators.pattern(emailPhoneRegex),
        ],
      ],
      password: ['', [Validators.required]],
    });
  };

  onSubmit() {
    this.user = {
      userId: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      loginType:
        this.loginForm.get('email')?.value.indexOf('@') !== -1
          ? 'EMAIL'
          : 'MSISDN',
    };
    console.log(this.user);
    this.store.dispatch(login({ user: this.user }));
    this.actions$
      .pipe(
        ofType(loginFailure),
        takeUntil(this.destroyed$),
        map((response) => {
          this.loginFailure = true;
          this.destroyed$.next(true);
          this.destroyed$.complete();
        })
      )
      .subscribe();
  }
}
