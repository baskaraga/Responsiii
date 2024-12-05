import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';  // Pastikan impor switchMap

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return [true]; // Izinkan akses jika sudah login
        } else {
          this.router.navigate(['/login']); // Arahkan ke halaman login jika belum login
          return [false];
        }
      })
    );
  }
}
