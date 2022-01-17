import { ListSchoolComponent } from './schools/list-school/list-school.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BusCompanyCreateComponent } from './bus-company/bus-company-create/bus-company-create.component';
import { CreateGuardianComponent } from './guardians/create-guardian/create-guardian.component';
import { GuardianListComponent } from './guardians/guardian-list/guardian-list.component';
import { CreateSchoolComponent } from './schools/create-school/create-school.component';
import { SchoolListComponent } from './schools/school-list/school-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BusCompanyListComponent } from './bus-company/bus-company-list/bus-company-list.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { SupervisorListComponent } from './supervisor/supervisor-list/supervisor-list.component';
import { SupervisorCreateComponent } from './supervisor/supervisor-create/supervisor-create.component';
import { BusCreateComponent } from './buses/bus-create/bus-create.component';
import { BusListComponent } from './buses/bus-list/bus-list.component';
import { DriverCreateComponent } from './drivers/driver-create/driver-create.component';
import { DriverListComponent } from './drivers/driver-list/driver-list.component';
import { StudentBusComponent } from './students-buses/student-bus/student-bus.component';
// import { GoogleMapComponent } from './_googleMap/google-map/google-map.component';
import { StudentBusListComponent } from './students-buses/student-bus-list/student-bus-list.component';
import { GoogleMapComponent } from './_googleMap/google-map/google-map.component';

const routes: Routes = [

  { path: '',canActivate:[!AuthGuard], component: SignInComponent },
  { path: 'sign-in',canActivate:[!AuthGuard], component: SignInComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent},
      { path: 'school', component: CreateSchoolComponent },
      { path: 'school/new', component: CreateSchoolComponent },
      { path: 'school/:id/edit', component: CreateSchoolComponent },
      { path: 'school-list', component: ListSchoolComponent },

      { path: 'guardian', component: CreateGuardianComponent },
      { path: 'guardian/new', component: CreateGuardianComponent },
      { path: 'guardian/:id/edit', component: CreateGuardianComponent },
      { path: 'guardian-list', component: GuardianListComponent },

      { path: 'busCompany', component:BusCompanyCreateComponent},
      { path: 'busCompany/new', component:BusCompanyCreateComponent},
      { path: 'busCompany/edit/:id', component:BusCompanyCreateComponent},
      { path: 'busCompany-list', component:BusCompanyListComponent },

      { path: 'student', component:StudentCreateComponent},
      { path: 'student/new', component:StudentCreateComponent},
      { path: 'student/edit/:id', component:StudentCreateComponent},
      { path: 'student-list', component:StudentListComponent },

      { path: 'supervisor', component: SupervisorCreateComponent},
      { path: 'supervisor/new', component: SupervisorCreateComponent},
      { path: 'supervisor/edit/:id', component: SupervisorCreateComponent},
      { path: 'supervisor-list', component: SupervisorListComponent},

      { path: 'bus', component: BusCreateComponent},
      { path: 'bus/new', component: BusCreateComponent},
      { path: 'bus/edit/:id', component: BusCreateComponent},
      { path: 'bus-list', component: BusListComponent},

      { path: 'driver', component: DriverCreateComponent},
      { path: 'driver/new', component: DriverCreateComponent},
      { path: 'driver/edit/:id', component: DriverCreateComponent},
      { path: 'driver-list', component: DriverListComponent},

      { path: 'student-bus', component: StudentBusComponent},
      { path: 'student-bus-list', component: StudentBusListComponent},

      { path: 'google-map', component: GoogleMapComponent}
    ],
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
