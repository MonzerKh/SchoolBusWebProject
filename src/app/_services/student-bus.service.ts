import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BulkStudentBusDto } from '../models/bulkStudentBus';
import { StudentBusDto } from '../models/studentBusDto';
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
}