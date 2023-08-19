import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CHAR_LENGTH_128, emailPhoneRegex } from 'src/app/core/providers/helper';
import { register } from '../../../core/redux/actions/auth.actions';
import { registerSuccess } from 'src/app/core/redux/actions/auth.actions';
import { map } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  actions$ = inject(Actions);
  store = inject(Store);
  signupForm!: FormGroup;

  
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setUpSignupForm();
  }

  setUpSignupForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(CHAR_LENGTH_128),
          Validators.pattern(emailPhoneRegex),
        ],
      ],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    }, {validators: [this.confirmPasswordValidator]});
  }

  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password === control.value.repassword
      ? null
      : { PasswordNoMatch: true };
  };
  
  onSubmit() {
    this.store.dispatch(register({register: this.signupForm.value }));
    this.actions$
      .pipe(
        ofType(registerSuccess),
        map((res) => {
          this.router.navigate(['auth/login']);
        })
      )
      .subscribe();
  }
}
