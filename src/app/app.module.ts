import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

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
    ImageUploadeComponent,
  ],
  imports: [

    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    NgxSpinnerModule,

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
