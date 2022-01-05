import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { GuardianService } from '../../_services/guardian.service';
import { GuardianDto } from '../../models/guardianDto';
import { map } from 'rxjs/operators';
import { forkJoin, Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { SchoolDto } from 'src/app/models/schoolDto';


@Component({
  selector: 'app-create-guardian',
  templateUrl: './create-guardian.component.html',
  styleUrls: ['./create-guardian.component.scss']
})
export class CreateGuardianComponent implements OnInit {
  baseUrl = environment.apiUrl;
  guardianForm!: FormGroup;
  schools: SchoolDto[]=[];
  guardian:GuardianDto = {id:0} as GuardianDto;
  id!:number;
  editMode= false ;
  message!: string;
  constructor(  private fb: FormBuilder,
                private http: HttpClient,
                private guardianService: GuardianService,
                private route: ActivatedRoute,
                private router: Router,
                private _snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];  console.log(this.id);
      if(this.id){
        this.editMode=true;
      };  console.log(this.editMode);
      this.initGuardianForm();
    });
    // this.initGuardianForm();
  }

  private loadForm(){
    this.guardianForm= this.fb.group({
      id : [  this.guardian.id],
      nationality_Id:[  this.guardian.nationality_Id, Validators.required],
      full_Name:[  this.guardian.full_Name, Validators.required],
      email: [  this.guardian.email, [Validators.required, Validators.email]],
      phone:[  this.guardian.phone, Validators.required],
      imagePath:[  this.guardian.imagePath, Validators.required],
      school_Id:[  this.guardian.school_Id, Validators.required],
      country :[  this.guardian.country, Validators.required],
      city :[  this.guardian.city, Validators.required],
      town :[  this.guardian.town, Validators.required],
      street :[  this.guardian.street, Validators.required],
      boxNumber :[  this.guardian.boxNumber, Validators.required],
      address:[  this.guardian.address, Validators.required],
      createdBy: [this.guardian.createdBy],
    });
  }

  private initGuardianForm(){
    if(this.editMode){
      const guardians$ = this.guardianService.getGuardianById(this.id);
      const schools$ = this.http.get<SchoolDto[]>(this.baseUrl + 'School/GetSchoolList');
      return forkJoin([guardians$, schools$]).subscribe((data) => {
        this.guardian = data[0];
        this.schools = data[1];
        this.loadForm();
      });
    }else{
      return this.guardianService.getGuardianById(this.id).subscribe(data=>{
        this.guardian=data;
        this.loadForm();
      })

    }
  }

  onSubmit(){
    let guardianDto: GuardianDto= this.guardianForm.value;
    this.guardianService.createGuardian(guardianDto);
    this.message = "the model was sent";
    this._snackBar.openSnackBar(this.message);
  }
  cancelRegister(){
    this.guardianForm.reset( 'null');
    this.router.navigate(['/guardian-list'], {relativeTo: this.route});
  }

}
