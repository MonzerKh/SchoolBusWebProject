import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { GuardianService } from '../../services/guardian.service';
import { GuardianDto } from '../../models/guardianDto';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';


@Component({
  selector: 'app-create-guardian',
  templateUrl: './create-guardian.component.html',
  styleUrls: ['./create-guardian.component.scss']
})
export class CreateGuardianComponent implements OnInit {

  guardianForm!: FormGroup;
  guardian:GuardianDto = {} as GuardianDto;
  id!:number;
  editMode= false ;
  message!: string;
  constructor(  private fb: FormBuilder,
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
      country :[  this.guardian.country, Validators.required],
      city :[  this.guardian.city, Validators.required],
      town :[  this.guardian.town, Validators.required],
      street :[  this.guardian.street, Validators.required],
      boxNumber :[  this.guardian.boxNumber, Validators.required],
      address:[  this.guardian.address, Validators.required],
      imagePath:[  this.guardian.imagePath, Validators.required],
      school_Id:[  this.guardian, Validators.required]
    });
  }

  private initGuardianForm(){
    if(this.editMode){
      this.guardianService.getGuardianById(this.id).subscribe(response=>
        { this.guardian= response;
          this.loadForm();

        });
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

}
