import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from './snack-bar.service';
import { LoginDto } from '../models/loginDto';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SystemUserDto } from '../models/systemUserDto ';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<SystemUserDto>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginDto: LoginDto) {

    return this.http.post<SystemUserDto>(this.baseUrl + 'account/login', loginDto)
      .subscribe((res: SystemUserDto | any) => {
        let user: SystemUserDto;
        user = res;
        console.log(user);
        if (user) {
          this.setCurrentUser(user);
          this.router.navigateByUrl('/');
        }
      })
  }

  setCurrentUser(user: SystemUserDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getCurrentUser() :boolean {
    const user: SystemUserDto = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
    //this.currentUserSource = new ReplaySubject<SystemUserDto>(1);
    this.router.navigateByUrl('/sign-in');
  }
}
