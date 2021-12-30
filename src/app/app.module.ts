
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BusCompanyCreateComponent } from "./bus-company/bus-company-create/bus-company-create.component";
import { BusCompanyListComponent } from "./bus-company/bus-company-list/bus-company-list.component";
import { CreateGuardianComponent } from './guardians/create-guardian/create-guardian.component';
import { GuardianListComponent } from './guardians/guardian-list/guardian-list.component';
import { HomeComponent } from "./home/home.component";
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { CreateSchoolComponent } from './schools/create-school/create-school.component';
import { SchoolListComponent } from './schools/school-list/school-list.component';
import { DateInputComponent } from "./shared/sharedFormComponents/date-input/date-input.component";
import { EmailInputComponent } from './shared/sharedFormComponents/email-input/email-input.component';
import { TextInputComponent } from './shared/sharedFormComponents/text-input/text-input.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudentListComponent } from "./students/student-list/student-list.component";
import { MaterialModule } from './material/material.module';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { ImageUploadeComponent } from './shared/ImageComponents/image-uploade/image-uploade.component';

import { NgxSpinnerModule } from 'ngx-spinner';


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
    StudentCreateComponent,
    ImageUploadeComponent
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
    LayoutModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
