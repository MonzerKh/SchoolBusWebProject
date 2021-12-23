import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SchoolBus';

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) listitems!: MatMenuTrigger;

  logoUrl: string="../..assets/images/img/angular2-logo-red.png";
  sidebarBackgrount!:"../../assets/images/sidebar-4.jpg";

  private userSub!: Subscription;
  isAuthenticatedUser= false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              // private authService: AuthService,
              private router: Router) {}


  ngOnInit(): void {
    // this.userSub = this.authService.currentUser$.subscribe(user => {
    //   this.isAuthenticatedUser = !!user;
    //   console.log(!user);
    //   console.log(!!user);
    // });
  }

  showLMenu() {
    this.trigger.openMenu();
  }

  onlogout(){
    this.isAuthenticatedUser= false;
    // this.authService.logout();
    this.router.navigateByUrl('/')
  }

}
