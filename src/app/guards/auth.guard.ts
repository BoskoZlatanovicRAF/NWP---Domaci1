import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DandelionService } from '../services/dandelion.service';
import { Observable, map, catchError, of } from 'rxjs';

let previousToken: string | null = null;

export const authGuard: CanActivateFn = (route, state): boolean | Observable<boolean> => {
  const router = inject(Router);
  const dandelionService = inject(DandelionService);
  const token = localStorage.getItem('dandelionToken');

  if (!token) {
    router.navigate(['/token-config']);
    return false;
  }

  // If token hasn't changed, allow access
  if (token === previousToken) {
    return true;
  }

  // If token has changed, validate it
  previousToken = token;
  return dandelionService.validateToken(token).pipe(
    map(() => true),
    catchError(() => {
      localStorage.removeItem('dandelionToken');
      router.navigate(['/token-config']);
      return of(false);
    })
  );
};
