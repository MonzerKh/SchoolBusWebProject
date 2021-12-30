import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { StudentDto } from '../models/studentDto';
import { StudentParams } from '../models/studentParams';
import { getPaginatedResult } from './paginationHelper';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  student: StudentDto  = {id:0} as StudentDto;
  students: StudentDto[] = [];
  studentCache = new Map();
  baseUrl = environment.apiUrl;
  studentParams!: StudentParams;
  editMode!: boolean;

  constructor(private http: HttpClient, private _snackBar: SnackBarService) {}

  getStudentParams() {
    return this.studentParams;
  }

  setStudentParams(params: StudentParams) {
    this.studentParams = params;
  }

  createStudent(studentDto: StudentDto) {
    console.log(studentDto);
    return this.http
      .post<any>(this.baseUrl +'Student/SetStudent',studentDto)
      .subscribe({
        next: (v: any) => {
          console.log(v);
          this._snackBar.openSnackBar('Student Creation is Successed');
        },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar('Student Creation was Faild');
        },
        complete: () => console.info('complete'),
      });
  }

  getStudents() {
    // let response= this.studentCache.get(Object.values(this.studentParams).join('-'));
    // if(response){
    //   return of(response);
    // }

    return getPaginatedResult<StudentDto[]>(this.baseUrl +'Student/GetStudent', this.studentParams.getHttpParams(),this.http)
    .pipe(
      map((response) => {
        //  this.studentCache.set(Object.values(this.studentParams).join('-'),response);
        return response;
      })
    );
  }

  getstudentById(id: number): Observable<any> {
    return this.http
      .get<StudentDto>(this.baseUrl + 'Student/GetStudent/'+id)
      .pipe(
        map((response) => {
          this.student = response;
          return this.student;
        })
      );
  }
}
