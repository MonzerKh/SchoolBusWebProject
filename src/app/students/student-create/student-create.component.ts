import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GuardianDto } from '../../models/guardianDto';
import { SchoolDto } from '../../models/schoolDto';
import { StudentDto } from '../../models/studentDto';
import { GuardianService } from '../../services/guardian.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { StudentService } from '../../services/student.service';
import { SchoolsService } from '../../services/schools.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent implements OnInit {
  student: StudentDto = { id: 0 } as StudentDto;
  schools: SchoolDto[] = [];
  guardians: GuardianDto[] = [];
  editMode: boolean = false;
  studentForm!: FormGroup;
  id!: number;
  message!: string;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: SnackBarService,
    private schoolService: SchoolsService,
    private guardianService: GuardianService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.editMode = true;
      }
      console.log(this.editMode);
      this.intitStudenForm();
    });
  }

  intitStudenForm() {
    if (this.editMode) {
      this.studentService.getstudentById(this.id).subscribe((data) => {
        this.student = data;
        // console.log(this.student);
        this.loadForm();
      });

      this.loadForm();
    } else {

      this.loadForm();

    }
  }

  //  private getScoolsData(){
  //     this.schoolService.getSchools().subscribe(res=> this.schools=res.result)
  //     console.log(this.schools);
  // }

  // private getGuardianData(){
  //   this.guardianService.getGuardians().subscribe(data=>this.guardians=data.result )
  //   console.log(this.guardians);
  // }

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
    // console.log(studentDto);
    this.message = 'the model was sent';
    this._snackBar.openSnackBar(this.message);
  }

  cancel() {
    this.studentForm.reset();
    this.router.navigate(['../student-list']);
  }

  openDialog() {}

  resetForm() {}

  ngOnDestroy() {}
}
