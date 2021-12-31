import { AccountService } from '../_services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)  sidenav!:MatSidenav;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) listitems!: MatMenuTrigger;

  logoUrl: string = "../..assets/images/img/angular2-logo-red.png";
  sidebarBackgrount!: "../../assets/images/sidebar-4.jpg";


  constructor(
    private accountService: AccountService,
    private observer : BreakpointObserver,
    private breakpointObserver: BreakpointObserver ) { }

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );



  // ngAfterViewInit() {
  //    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
  //      if (res.matches) {
  //        this.sidenav.mode = 'over';
  //        this.sidenav.close();
  //      } else {
  //        this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //      }
  //    });
  // }

  onLogout() {
     this.accountService.logout();
   }

   showLMenu() {
    this.trigger.openMenu();
  }

}
