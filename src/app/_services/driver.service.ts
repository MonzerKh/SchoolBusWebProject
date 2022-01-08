import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DriverDto } from '../models/driverDto';
import { DriverParams } from '../models/driverParams';
import { getPaginatedResult } from './paginationHelper';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  driverCache = new Map();
  baseUrl = environment.apiUrl;
  drivers: DriverDto[] = [];
  driver: DriverDto = { id: 0 } as DriverDto;
  driverParams!: DriverParams;

  constructor(private http: HttpClient, private _snackBar: SnackBarService) {}

  getDriverParams() {
    return this.driverParams;
  }

  setDriverParams(params: DriverParams) {
    this.driverParams = params;
  }

  createDriver(driverDto: DriverDto) {
    console.log(driverDto);
    return this.http
      .post<any>(this.baseUrl + 'Driver/SetDriver', driverDto)
      .subscribe({
        next: (v: any) => {
          console.log(v);
          this._snackBar.openSnackBar('Driver Creation is Successed');
        },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar('Driver Creation was Faild');
        },
        complete: () => console.info('complete'),
      });
  }

  getDriverPaging(Params: DriverParams) {
    return getPaginatedResult<DriverDto[]>(
      this.baseUrl + 'Driver/GetDriverPaging',
      Params.getHttpParams(),
      this.http
    ).pipe(
      map((response) => {
        //  this.driverCache.set(Object.values(this.driverParams).join('-'),response);
        return response;
      })
    );
  }

  getDrivers(Params:DriverParams) {
    // let response= this.driverCache.get(Object.values(this.driverParams).join('-'));
    // if(response){
    //   return of(response);
    // }
    return getPaginatedResult<DriverDto[]>(
      this.baseUrl + 'Driver/GetDriver',
      Params.getHttpParams(),
      this.http
    ).pipe(
      map((response) => {
        //  this.driverCache.set(Object.values(this.driverParams).join('-'),response);
        return response;
      })
    );
  }

  getDriverById(id: number): Observable<any> {
    return this.http
      .get<DriverDto>(this.baseUrl + 'Driver/GetDriver/'+id)
      .pipe(
        map((response) => {
          this.driver = response;
          return this.driver;
        })
      );
  }

  deleteDriver(id: number){
    return this.http.delete(this.baseUrl+'Driver/DelDriver/'+id).pipe(map((res)=>{
      return res;
    }));
  }
}
