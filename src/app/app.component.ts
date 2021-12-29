
import { Component, ViewChild } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'School Bus';

   IsLogin :boolean= false;


  constructor(private accountService: AccountService) { }


  ngOnInit(): void {
    this.accountService.getCurrentUser();
     this.accountService.currentUser$.subscribe(user => {
       this.IsLogin = !!user;
     });
  }






}
