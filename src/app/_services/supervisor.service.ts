import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SupervisorDto } from '../models/supervisorDto';
import { SupervisorParams } from '../models/supervisorParams';
import { getPaginatedResult } from './paginationHelper';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  supervisorCache = new Map();
  baseUrl = environment.apiUrl;
  schools: SupervisorDto[] = [];
  supervisor: SupervisorDto= {id:0} as SupervisorDto;
  supervisorParams!: SupervisorParams;

  constructor(private http: HttpClient, private _snackBar: SnackBarService) { }

  getSupervisorParams() {
    return this.supervisorParams;
  }

  setSupervisorParams(params: SupervisorParams) {
    this.supervisorParams = params;
  }

  createStudent(supervisorDto: SupervisorDto) {
    console.log(supervisorDto);
    return this.http
      .post<any>(this.baseUrl +'Supervisor/SetSupervisor',supervisorDto)
      .subscribe({
        next: (v: any) => {
          console.log(v);
          this._snackBar.openSnackBar('Supervisor Creation is Successed');
        },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar('Supervisor Creation was Faild');
        },
        complete: () => console.info('complete'),
      });
  }

  getSupervisorPaging(Params:SupervisorParams) {
    return getPaginatedResult<SupervisorDto[]>(this.baseUrl + 'Supervisor/GetSupervisorPaging', Params.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.supervisorCache.set(Object.values(this.supervisorParams).join('-'),response);
        return response;
      }))
  }

  getSupervisors(Params:SupervisorParams) {
    // let response= this.supervisorCache.get(Object.values(this.supervisorParams).join('-'));
    // if(response){
    //   return of(response);
    // }
    return getPaginatedResult<SupervisorDto[]>(this.baseUrl +'Supervisor/GetSupervisor', Params.getHttpParams(),this.http)
    .pipe(
      map((response) => {
        //  this.supervisorCache.set(Object.values(this.supervisorParams).join('-'),response);
        return response;
      })
    );
  }

  getSupervisortById(id: number): Observable<any> {
    return this.http
      .get<SupervisorDto>(this.baseUrl + 'Supervisor/GetSupervisor/'+id)
      .pipe(
        map((response) => {
          this.supervisor = response;
          return this.supervisor;
        })
      );
  }

  deleteSupervisor(id: number){
    return this.http.delete(this.baseUrl+'Supervisor/DelSupervisor/'+id).pipe(map((res)=>{
      return res;
    }));
  }


}
