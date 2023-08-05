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
