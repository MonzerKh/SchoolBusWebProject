
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,} from '@angular/forms';
import { GuardianDto } from 'src/app/models/guardianDto';
import { SchoolDto } from 'src/app/models/schoolDto';
import { StudentDto } from 'src/app/models/studentDto';
import { StudentService } from 'src/app/_services/student.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { SchoolsService } from 'src/app/_services/schools.service';
import { GuardianService } from 'src/app/_services/guardian.service';

import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateGuardianComponent } from 'src/app/guardians/create-guardian/create-guardian.component';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent implements OnInit {
  baseUrl = environment.apiUrl;
  school_IdControl = new FormControl();
  student: StudentDto = { id: 0 } as StudentDto;
  schools: SchoolDto[] = [];
  guardians: GuardianDto[] = [];
  editMode: boolean = false;
  studentForm!: FormGroup;
  id!: number;
  message!: string;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: SnackBarService,
    public dialog: MatDialog,
    private schoolService: SchoolsService,
    private guardianService: GuardianService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.editMode = true;
        console.log(this.editMode);
      }
      this.intitStudenForm();
    });
  }

  intitStudenForm() {
    if (this.editMode) {

      const student$ = this.http.get<StudentDto>(
        this.baseUrl + 'Student/GetStudent/' + this.id
      );
      const schools$ = this.http.get<SchoolDto[]>(
        this.baseUrl + 'School/GetSchool'
      );
      const guardians$ = this.http.get<GuardianDto[]>(
        this.baseUrl + 'Guardian/GetGuardian'
      );
      return forkJoin([student$, schools$, guardians$]).subscribe((data) => {
        this.student = data[0];
        this.schools = data[1];
        this.guardians = data[2];
        this.loadForm();
      });
    } else {
      const schools$ = this.http.get<SchoolDto[]>(
        this.baseUrl + 'School/GetSchool'
      );
      const guardians$ = this.http.get<GuardianDto[]>(
        this.baseUrl + 'Guardian/GetGuardian'
      );
      return forkJoin([schools$, guardians$]).subscribe((data) => {
        this.schools = data[0];
        this.guardians = data[1];
        this.loadForm();
      });
    }
  }

  private loadForm() {
    this.studentForm = this.fb.group({
      id: [this.student.id],
      national_Number: [this.student.national_Number],
      full_Name: [this.student.full_Name],
      email: [this.student.email],
      phone: [this.student.phone],
      father: [this.student.father],
      mother: [this.student.mother],
      birthDate: [this.student.birthDate],
      imagePath: [this.student.imagePath],
      guardian_Id: [this.student.guardian_Id],
      school_Id: [this.student.school_Id],
      country: [this.student.country, Validators.required],
      city: [this.student.city, Validators.required],
      town: [this.student.town, Validators.required],
      street: [this.student.street, Validators.required],
      address: [this.student.address, Validators.required],
      boxNumber: [this.student.boxNumber, Validators.required],
      // gender:[this.student.gender],
    });
  }

  onSubmit() {
    let studentDto: StudentDto = this.studentForm.value;
    this.studentService.createStudent(studentDto);
    this.message = 'the model was sent';
    this._snackBar.openSnackBar(this.message);
  }

  cancel() {
    this.studentForm.reset();
    this.router.navigate(['../student-list']);
  }

  openDialog() {
    const dialogRef=this.dialog.open(CreateGuardianComponent,{
      width:'800px', // height:'800px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(res=>{
      console.timeLog("dialog is closed")
    });
  }

  resetForm() {}

  ngOnDestroy() {}
}

