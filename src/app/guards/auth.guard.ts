import { inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { DandelionService } from '../services/dandelion.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('dandelionToken');
  const dandelionService = inject(DandelionService);

  if (!token) {
    router.navigate(['/token-config']);
    return false;
  }

  return dandelionService.validateToken(token).pipe(
    map(() => true),
    catchError(() => {
      localStorage.removeItem('dandelionToken');
      router.navigate(['/token-config']);
      return of(false);
    })
  );
};
