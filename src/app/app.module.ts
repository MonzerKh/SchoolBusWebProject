import { ListSchoolComponent } from './schools/list-school/list-school.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from "@angular/router";
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from "./_interceptors/loading.interceptor";
import { MaterialModule } from './material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CreateGuardianComponent } from "./guardians/create-guardian/create-guardian.component";
import { GuardianListComponent } from "./guardians/guardian-list/guardian-list.component";
import { BusCompanyListComponent } from "./bus-company/bus-company-list/bus-company-list.component";
import { BusCompanyCreateComponent } from "./bus-company/bus-company-create/bus-company-create.component";
import { DateInputComponent } from './shared/sharedFormComponents/date-input/date-input.component';
import { SchoolListComponent } from './schools/school-list/school-list.component';
import { CreateSchoolComponent } from './schools/create-school/create-school.component';
import { EmailInputComponent } from './shared/sharedFormComponents/email-input/email-input.component';
import { TextInputComponent } from './shared/sharedFormComponents/text-input/text-input.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { ImageUploadeComponent } from './shared/ImageComponents/image-uploade/image-uploade.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AgmCoreModule } from '@agm/core';
import { google } from "google-maps";

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
        ListSchoolComponent,
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
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatProgressBarModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyC2SQnvRvx0B820_DWvYNZDwMgbnQzl79w'
        }),

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
