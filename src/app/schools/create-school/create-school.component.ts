import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SchoolsService } from '../../services/schools.service';
import { SchoolDto } from '../../models/schoolDto';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.scss']
})
export class CreateSchoolComponent implements OnInit {

  school: SchoolDto  = {} as SchoolDto;
  editMode: boolean= false;
  id!: number;
  createScoolForm!: FormGroup;
  message!: string;

  constructor(private fb: FormBuilder, private schoolsService: SchoolsService,
              private route: ActivatedRoute, private router: Router,
              private _snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];  console.log(this.id);
      if(this.id){
        this.editMode=true;
      };  console.log(this.editMode);
      this.intitSchoolForm();
    });
  }

  private loadForm(){
    this.createScoolForm = this.fb.group({
      'id':[this.school.id],
      'school_Name': [ this.school.school_Name, Validators.required],
      'manager': [ this.school.manager, Validators.required],
      'phone': [ this.school.phone, Validators.required],
      'schoolUrl': [this.school.schoolUrl, Validators.required],
      'address': [this.school.address, Validators.required],
    });

  }

  private intitSchoolForm(){
    if(this.editMode){
      this.schoolsService.getSchoolById(this.id).subscribe(response=>
        { this.school= response;
          this.loadForm();

        });
    }else{
      this.loadForm();
    }
  }

  onSubmit(){
    let schoolDto: SchoolDto = this.createScoolForm.value;
    this.schoolsService.createSchool(schoolDto);
    this.message = "the model was sent";
    this._snackBar.openSnackBar(this.message);

  }

  cancelRegister(){
    this.createScoolForm.reset();
    this.router.navigate(['../school-data-table']);
  }

  resetForm() {
    }

  ngOnDestroy(){

  }

}
