<<<<<<< HEAD
import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
=======
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
>>>>>>> c25f1b98e18efa15cb12f9c9c61adce5f2fbbbcb
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BusCompanyCreateComponent } from "./bus-company/bus-company-create/bus-company-create.component";
import { BusCompanyListComponent } from "./bus-company/bus-company-list/bus-company-list.component";
import { CreateGuardianComponent } from "./guardians/create-guardian/create-guardian.component";
import { GuardianListComponent } from "./guardians/guardian-list/guardian-list.component";
import { HomeComponent } from "./home/home.component";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { MaterialModule } from "./material/material.module";
import { CreateSchoolComponent } from "./schools/create-school/create-school.component";
import { SchoolListComponent } from "./schools/school-list/school-list.component";
import { DateInputComponent } from "./shared/sharedFormComponents/date-input/date-input.component";
import { EmailInputComponent } from "./shared/sharedFormComponents/email-input/email-input.component";
import { TextInputComponent } from "./shared/sharedFormComponents/text-input/text-input.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { StudentCreateComponent } from "./students/student-create/student-create.component";
import { StudentListComponent } from "./students/student-list/student-list.component";

<<<<<<< HEAD
=======
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { TextInputComponent } from './shared/sharedFormComponents/text-input/text-input.component';
import { CreateSchoolComponent } from './schools/create-school/create-school.component';
import { SchoolListComponent } from './schools/school-list/school-list.component';
import { CreateGuardianComponent } from './guardians/create-guardian/create-guardian.component';
import { GuardianListComponent } from './guardians/guardian-list/guardian-list.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { EmailInputComponent } from './shared/sharedFormComponents/email-input/email-input.component';
import { ImageUploadeComponent } from './shared/ImageComponents/image-uploade/image-uploade.component';
import { NgxSpinnerModule } from 'ngx-spinner';
>>>>>>> c25f1b98e18efa15cb12f9c9c61adce5f2fbbbcb

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    TextInputComponent,
    EmailInputComponent,
    CreateSchoolComponent,
    SchoolListComponent,
    CreateGuardianComponent,
    GuardianListComponent,
    BusCompanyListComponent,
    BusCompanyCreateComponent,
    DateInputComponent,
    StudentListComponent,
    StudentCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MaterialModule,
<<<<<<< HEAD
    LayoutModule
=======
    LayoutModule,
    NgxSpinnerModule,

>>>>>>> c25f1b98e18efa15cb12f9c9c61adce5f2fbbbcb
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
    // ,
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
