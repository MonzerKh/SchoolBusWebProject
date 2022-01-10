import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from '../models/loginDto';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  logInForm!: FormGroup;
  hide = true;
  constructor(private fb : FormBuilder,private accountService: AccountService ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.logInForm= this.fb.group({
      userName: ['',Validators.required],
      password: ['',[Validators.required]]
    })
  }

  onSubmit(){
    let loginDto:LoginDto;
    loginDto=this.logInForm.value;
    this.accountService.login(loginDto);
    console.log(loginDto);
  }
}
