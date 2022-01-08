import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { BusDto } from '../models/busDto';
import { BusParams } from '../models/busParams';
import { getPaginatedResult } from './paginationHelper';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  busCache = new Map();
  baseUrl = environment.apiUrl;
  buses: BusDto[] = [];
  bus!: BusDto;

  constructor( private http: HttpClient, private _snackBar: SnackBarService) { }

  async createBus(busDto: BusDto){
    console.log(busDto);
    return this.http.post<any>(this.baseUrl +'Bus/SetBus',busDto)
    .subscribe({
      next: (v: any) =>{
        console.log(v);
        this._snackBar.openSnackBar("Bus Creation is Successed");
      },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar("Bus Creation was Faild");
        },
        complete: () => console.info('complete')
    })
  }

  getBuses(Params:BusParams) {
    // let response= this.busCache.get(Object.values(this.busParams).join('-'));
    // if(response){
    //   return of(response);
    // }

    return getPaginatedResult<BusDto[]>(this.baseUrl + 'Bus/GetBus', Params.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.busCache.set(Object.values(this.busParams).join('-'),response);
        return response;
      }))
  }

  getBusesPaging(Params:BusParams) {
    return getPaginatedResult<BusDto[]>(this.baseUrl + 'Bus/GetBusPaging', Params.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.busCache.set(Object.values(this.busParams).join('-'),response);
        return response;
      }))
  }

  getBusById(id: number): Observable<any>{
    return this.http.get<BusDto>(this.baseUrl+'Bus/GetBus/'+id)
      .pipe(map(response=>{
        this.bus= response;
        return this.bus
      }));
  }


  getBusist(busCompany_Id:number = 0) {
    return this.http.get<BusDto[]>(this.baseUrl + 'Bus/GetBus?BusCompany_Id='+busCompany_Id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  deleteBus(id: number): any{
    return this.http.delete<any>(this.baseUrl+'Bus/DelBus/'+id).pipe(map((res)=>{
      return res;
    }));
  }

}
