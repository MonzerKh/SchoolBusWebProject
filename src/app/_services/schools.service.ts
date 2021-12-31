import { MatTableDataSource } from '@angular/material/table';
import { SchoolDto } from './../models/schoolDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getPaginatedResult } from './paginationHelper';
import { SchoolParams } from '../models/schoolParams';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  schoolCache = new Map();
  baseUrl = environment.apiUrl;
  schools: SchoolDto[] = [];
  school!: SchoolDto;

  editModSchool!: SchoolDto;
  editMode!:boolean;


  constructor( private http: HttpClient, private _snackBar: SnackBarService) { }


  // getSchoolParams() {
  //   return this.schoolParams;
  // }

  // setSchoolParams(params: SchoolParams) {
  //   this.schoolParams = params;
  // }

  async createSchool(schoolDto: SchoolDto){
    console.log(schoolDto);
    return this.http.post<any>(this.baseUrl +'School/SetSchool',schoolDto)
    .subscribe({
      next: (v: any) =>{
        console.log(v);
        this._snackBar.openSnackBar("School Creation is Successed");
      },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar("School Creation was Faild");
        },
        complete: () => console.info('complete')
    })
  }

  getSchools(Params:SchoolParams) {
    // let response= this.schoolCache.get(Object.values(this.schoolParams).join('-'));
    // if(response){
    //   return of(response);
    // }

    return getPaginatedResult<SchoolDto[]>(this.baseUrl + 'School/GetSchool', Params.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.schoolCache.set(Object.values(this.schoolParams).join('-'),response);
        return response;
      }))
  }

  getSchoolsPaging(Params:SchoolParams) {
    return getPaginatedResult<SchoolDto[]>(this.baseUrl + 'School/GetSchoolPaging', Params.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.schoolCache.set(Object.values(this.schoolParams).join('-'),response);
        return response;
      }))
  }

  getSchoolById(id: number): Observable<any>{
    return this.http.get<SchoolDto>(this.baseUrl+'School/GetSchool/'+id)
      .pipe(map(response=>{
        this.school= response;
        return this.school
      }));
  }





}
