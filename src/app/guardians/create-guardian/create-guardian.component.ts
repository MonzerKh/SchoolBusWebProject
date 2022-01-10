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
import { SchoolsService } from 'src/app/_services/schools.service';


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
                private schoolService: SchoolsService,
                private route: ActivatedRoute,
                private router: Router,
                private _snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];  console.log(this.id);
      if(this.id){
        this.editMode=true;
      };  console.log(this.editMode);
      this.loadSchoolList();
      this.initGuardianForm();
    });
    // this.initGuardianForm();
  }

  private loadForm(){
    this.guardianForm= this.fb.group({
      id : [  this.guardian.id],
      nationality_Id:[  this.guardian.nationality_Id],
      full_Name:[  this.guardian.full_Name],
      email: [  this.guardian.email ],
      phone:[  this.guardian.phone],
      imagePath:[  this.guardian.imagePath],
      school_Id:[  this.guardian.school_Id],
      country :[  this.guardian.country],
      city :[  this.guardian.city],
      town :[  this.guardian.town],
      street :[  this.guardian.street],
      boxNumber :[  this.guardian.boxNumber],
      address:[  this.guardian.address],
      createdBy: [this.guardian.createdBy],
    });
  }

  private initGuardianForm(){
    if(this.editMode){
      this.guardianService.getGuardianById(this.id).subscribe(data=>{
        this.guardian=data;
        this.loadForm();
      })
    }else{
      this.loadForm();
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

  private loadSchoolList(){
    this.schoolService.getSchoolList().subscribe(response=>{
      this.schools= response;
    })
    }

}
