import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusCompanyDto } from '../models/busCompanyDto';
import { BusCompanyParams } from '../models/busCompanyParams';
import { getPaginatedResult } from './paginationHelper';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class BusCompanyService {

  busCompanyCache = new Map();
  baseUrl = environment.apiUrl;
  busCompanyParams!: BusCompanyParams;
  schools: BusCompanyDto[] = [];
  school!: BusCompanyDto;

  editModSchool!: BusCompanyDto;
  editMode!:boolean;


  constructor( private http: HttpClient, private _snackBar: SnackBarService) { }


  getBusCompanyParams() {
    return this.busCompanyParams;
  }

  setBusCompanyParams(params: BusCompanyParams) {
    this.busCompanyParams = params;
  }

  async createBusCompany(busCompnyDto: BusCompanyDto){
    console.log(busCompnyDto);
    return this.http.post<any>(this.baseUrl +'BusCompany/SetBusCompany',busCompnyDto)
    .subscribe({
      next: (v: any) =>{
        console.log(v);
        this._snackBar.openSnackBar("Bus Company  is created");
      },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar("Bus Company Creation was Faild");
        },
        complete: () => console.info('complete')
    })
  }

  getBusCompany(){
      // let response= this.busCompanyCache.get(Object.values(this.busCompanyParams).join('-'));
    // if(response){
    //   return of(response);
    // }

    return getPaginatedResult<BusCompanyDto[]>(this.baseUrl + 'BusCompany/GetBusCompany', this.busCompanyParams.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.busCompanyCache.set(Object.values(this.busCompanyParams).join('-'),response);
        return response;
      }))
  }

  getBusCompanysPaging(Params:BusCompanyParams) {
    return getPaginatedResult<BusCompanyDto[]>(this.baseUrl + 'BusCompany/GetBusCompanyPaging', Params.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.busCompanyCache.set(Object.values(this.busCompanyParams).join('-'),response);
        return response;
      }))
  }

  getBusCompanyById(id: number): Observable<any>{
    return this.http.get<BusCompanyDto>(this.baseUrl+'BusCompany/GetBusCompany/'+id)
      .pipe(map(response=>{
        this.school= response;
        return this.school
      }));
  }

  getBusCompanyList() {
    return this.http
      .get<BusCompanyDto[]>(this.baseUrl + 'BusCompany/GetBusCompanyList')
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteBusCompany(id: number){
    return this.http.delete(this.baseUrl+'BusCompany/DelBusCompany/'+id).pipe(map((res)=>{
      return res;
    }));
  }

}
