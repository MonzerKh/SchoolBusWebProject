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
      { path: 'school2', component: SchoolListComponent },
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

      { path: 'guardian', component: CreateGuardianComponent},
      { path: 'guardian/new', component:CreateGuardianComponent},
      {path: 'guardian/:id/edit', component:CreateGuardianComponent},
      { path: 'guardian-list', component: GuardianListComponent},


      { path: 'supervisor', component: SupervisorCreateComponent},
      { path: 'supervisor/new', component: SupervisorCreateComponent},
      { path: 'supervisor/edit/:id', component: SupervisorCreateComponent},
      { path: 'supervisor-list', component: SupervisorListComponent},
    ],
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
