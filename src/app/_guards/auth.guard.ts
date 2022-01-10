import { map } from 'rxjs/operators';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { AccountService } from '../_services/account.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private _snackBar: SnackBarService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {return true;}

        this._snackBar.openSnackBar('You shall not pass!')
        return false;


      })
    )
  }

}
