import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../services/snack-bar.service';
import { LoginDto } from '../models/loginDto';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { SystemUserDto } from '../models/systemUserDto ';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<SystemUserDto>(1);
  currentUser$ = this.currentUserSource.asObservable();
  isAuthedUser= false;

  constructor( private http: HttpClient, private _snackBar: SnackBarService, private router: Router) {
  }

  login(loginDto: LoginDto){

    return  this.http.post(this.baseUrl +'Account/login',loginDto)
    .subscribe((res: SystemUserDto| any)=>{
      let user:SystemUserDto;
      user=res;
      console.log(user);
      if(user){
        this.isAuthedUser= true;
        this.setCurrentUser(user);
        this._snackBar.openSnackBar("log is Successed");
        this.router.navigateByUrl('/main-nav')
        }
    })
  }

  setCurrentUser(user: SystemUserDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    this.isAuthedUser=false;
    localStorage.removeItem('user');
    // this.currentUserSource.next(null);
    this.currentUserSource = new ReplaySubject<SystemUserDto>();
    this.router.navigateByUrl('/sign-in');
  }
}
