
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
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule,AgmMap } from '@agm/core';
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
import { SupervisorCreateComponent } from './supervisor/supervisor-create/supervisor-create.component';
import { SupervisorListComponent } from './supervisor/supervisor-list/supervisor-list.component';
import { BusCreateComponent } from './buses/bus-create/bus-create.component';
import { BusListComponent } from './buses/bus-list/bus-list.component';
import { DriverCreateComponent } from './drivers/driver-create/driver-create.component';
import { DriverListComponent } from './drivers/driver-list/driver-list.component';
import { StudentBusComponent } from './students-buses/student-bus/student-bus.component';
import { ImageComponent } from './shared/ImageComponents/image/image.component';
// import { GoogleMapComponent } from './_googleMap/google-map/google-map.component';
import { StudentBusListComponent } from './students-buses/student-bus-list/student-bus-list.component';

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
        ImageUploadeComponent,
        SupervisorCreateComponent,
        SupervisorListComponent,
        BusCreateComponent,
        BusListComponent,
        DriverCreateComponent,
        DriverListComponent,
        StudentBusComponent,
        ImageComponent,
        // GoogleMapComponent,
        StudentBusListComponent
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
        GoogleMapsModule,
         AgmCoreModule.forRoot({
           apiKey: 'AIzaSyDIQ_Pz_jj5Ylht3F1E5YrxHqXrS-UvWuM',
           libraries: ['places', 'drawing', 'geometry']
         }),





    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
