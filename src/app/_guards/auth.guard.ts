import { map } from 'rxjs/operators';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private _snackBar: SnackBarService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;

        this._snackBar.openSnackBar('You shall not pass!')
        return false;

      })
    )
  }

}
