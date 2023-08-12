import {
  ChangeDetectorRef,
  SimpleChanges,
  ViewRef,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { get, isEqual } from 'lodash';

export const onDestroy = () => {
  const destroy$ = new Subject<void>();
  const viewRef = inject(ChangeDetectorRef) as ViewRef;
  viewRef.onDestroy(() => {
    destroy$.next();
    destroy$.complete();
  });
  return destroy$;
};

export const checkForChanges = (
  base: string,
  changes: SimpleChanges,
  property?: string
) =>
  get(changes, `${base}.previousValue`, undefined) &&
  !isEqual(
    get(changes, `${base}.previousValue${property ? '.' + property : ''}`),
    get(changes, `${base}.currentValue${property ? '.' + property : ''}`)
  );


export const emailPhoneRegex =
  /^(?:\d{12}|\d{11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;
export const numberRegex = '^[0-9]*$';
export const nonZeroNumberRegex = '^(?!0)[1-9][0-9]*$';

export const CHAR_LENGTH_128 = 128;
export const CHAR_LENGTH_12 = 12;
export const CHAR_LENGTH_64 = 64;
