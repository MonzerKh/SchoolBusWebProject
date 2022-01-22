import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { ImageDto } from '../models/imageDto';
import { StudentBusDto } from '../models/studentBusDto';
import { StudentDto } from '../models/studentDto';
import { StudentParams } from '../models/studentParams';
import { getPaginatedResult } from './paginationHelper';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  student: StudentDto = { id: 0 } as StudentDto;
  students: StudentDto[] = [];
  studentCache = new Map();
  baseUrl = environment.apiUrl;
  studentParams!: StudentParams;
  editMode!: boolean;
  studentBus: StudentBusDto[] = [];
  ImageDto : ImageDto [] = [];

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
      .post<any>(this.baseUrl + 'Student/SetStudent', studentDto)
      .subscribe({
        next: (v: any) => {
          console.log(v);
          this._snackBar.openSnackBar('Student Creation is Successed');
          var item = this.ImageDto.find(r=>r.id = studentDto.id);
          if(item !=null){
            item.imageData = studentDto.personalImage;
          }
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

    return getPaginatedResult<StudentDto[]>(
      this.baseUrl + 'Student/GetStudent',
      this.studentParams.getHttpParams(),
      this.http
    ).pipe(
      map((response) => {
        //  this.studentCache.set(Object.values(this.studentParams).join('-'),response);
        return response;
      })
    );
  }

  getStudentsPaging(Params: StudentParams) {
    return getPaginatedResult<StudentDto[]>(
      this.baseUrl + 'Student/GetStudentPaging',
      Params.getHttpParams(),
      this.http
    ).pipe(
      map((response) => {
        //  this.studentCache.set(Object.values(this.studentParams).join('-'),response);
        return response;
      })
    );
  }

  getstudentById(id: number): Observable<any> {
    return this.http
      .get<StudentDto>(this.baseUrl + 'Student/GetStudent/' + id)
      .pipe(
        map((response) => {
          this.student = response;
          return this.student;
        })
      );
  }


  getStudentImage(id: number):Observable<ImageDto>{

    var item = this.ImageDto.find(x=>x.id == id);
    if(item !=null)
    return of(item);

    return this.http.get<ImageDto>(this.baseUrl+'Student/GetStudentImage/'+id).pipe(map(response=>{
      this.ImageDto.push(response);
      return response;
    }))
  }

  getStudentlist(school_Id:number = 0) {
    return this.http.get<StudentBusDto[]>(this.baseUrl + 'Student/GetStudentList?school_Id='+school_Id).pipe(
      map((response) => {
        //  this.studentCache.set(Object.values(this.studentParams).join('-'),response);
        return response;
      })
    );
  }

  deleteStudent(id: number){
    return this.http.delete(this.baseUrl+'Student/DelStudent/'+id).pipe(map((res)=>{
      return res;
    }));
  }
}
