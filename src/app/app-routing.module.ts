import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateGuardianComponent } from './guardians/create-guardian/create-guardian.component';
import { GuardianListComponent } from './guardians/guardian-list/guardian-list.component';
import { CreateSchoolComponent } from './schools/create-school/create-school.component';
import { SchoolListComponent } from './schools/school-list/school-list.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: SignInComponent},
  { path:'home', component: AppComponent},
  { path:  'school', component:CreateSchoolComponent},

  { path:'school/new', component:CreateSchoolComponent},
  { path:'school/:id/edit', component:CreateSchoolComponent},
  { path: 'school-list', component:SchoolListComponent },

  { path: 'guardian', component: CreateGuardianComponent},
  { path: 'guardian/new', component:CreateGuardianComponent},
  {path: 'guardian/:id/edit', component:CreateGuardianComponent},
  { path: 'guardian-list', component: GuardianListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
