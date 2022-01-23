import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BulkStudentBusDto } from '../models/bulkStudentBus';
import { StudentBusDto, StudentBusList, StudentBusTSP } from '../models/studentBusDto';
import { StudentDto } from '../models/studentDto';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class StudentBusService {

  student: StudentDto = { id: 0 } as StudentDto;
  students: StudentDto[] = [];
  studentBusCache = new Map();
  baseUrl = environment.apiUrl;
  studentBus: StudentBusDto[] = [];
  bulksStudentBus: BulkStudentBusDto[]=[];
  ulkStudentBusDto: BulkStudentBusDto = {} as BulkStudentBusDto;

  constructor(private http: HttpClient, private _snackBar: SnackBarService) { }

  createBulkStudentBus(bulkStudentBus: BulkStudentBusDto) {
    console.log(bulkStudentBus);
    return this.http
      .post<any>(this.baseUrl + 'Student_Bus/SetBulkStudentBus', bulkStudentBus)
      .subscribe({
        next: (v: any) => {
          console.log(v);
          this._snackBar.openSnackBar('Bulk_Student_Bus Creation is Successed');
        },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar('Bulk_Student_Bus Creation was Faild');
        },
        complete: () => console.info('complete'),
      });
  }

  deleteStudentBus(id: number){
    return this.http.delete(this.baseUrl+'Student_Bus/DelStudentBus/'+id)  .subscribe({
      next: (v: any) => {
        console.log(v);
        this._snackBar.openSnackBar('this Student_Bus  is deleted');
      },
      error: (e: any) => {
        console.log(e);
        this._snackBar.openSnackBar('this Student_Bus is not deleted');
      },
      complete: () => console.info('complete'),
    });
  }

  getSchoolBusList(scool_Id: number){
    return this.http.get<StudentBusList[]>(this.baseUrl+'Student_Bus/GetBusBySchool?School_Id='+scool_Id).pipe(map(response=>{
      // response.bus_Id== id;
      return response;
    }))
  }

  getBulkStudentBusDetails(bus_Id: number){
    return this.http.get<StudentBusList[]>(this.baseUrl+'Student_Bus/GetStudentBusList?IsActive=true&bus_Id='+bus_Id).pipe(map(response=>{
      // response.bus_Id== id;
      return response;
    }))
  }

  getStudentBusTSP(bus_Id: number , school_Id: number){
    return this.http.get<StudentBusTSP[]>(this.baseUrl+'Student_Bus/GetStudentBusTSP?IsActive=true&bus_Id='+bus_Id+'&school_Id='+school_Id).pipe(map(response=>{
      return response;
    }))
  }
}
