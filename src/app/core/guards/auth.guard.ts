import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../redux/selectors/auth.selector';
import { Router } from '@angular/router';


export const authGuard = () => {
  const store = inject(Store);
  const router = inject(Router);
  store.select(selectIsLoggedIn).subscribe((response) => {
    if(!response) {
      router.navigate(['/auth/login']);
      return false;
    }
    return true;
  });
}
