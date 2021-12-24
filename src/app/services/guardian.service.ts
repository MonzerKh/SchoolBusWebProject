import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackBarService } from './snack-bar.service';
import { GuardianParams} from '../models/guardianParams';
import { environment } from '../../environments/environment.prod';
import { GuardianDto } from '../models/guardianDto';
import { getPaginatedResult } from './paginationHelper';
import { map } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardianService {

  baseUrl = environment.apiUrl;
  guardianCache = new Map();
  guardianParams!: GuardianParams;
  guardians: GuardianDto[]=[];
  guardian: GuardianDto = {} as GuardianDto;

  constructor(private http: HttpClient, private _snackBar: SnackBarService) { }

  getGuardianParams() {
    return this.guardianParams;
  }

  setGuardianParams(params: GuardianParams) {
    this.guardianParams = params;
  }

  async createGuardian(guardianDto: GuardianDto){
    console.log(guardianDto);
    return this.http.post<any>(this.baseUrl +'Guardian/SetGuardian',guardianDto)
    .subscribe({
      next: (v: any) =>{
        console.log(v);
        this._snackBar.openSnackBar("Guardian Creation is Successed");
      },
        error: (e: any) => {
          console.log(e);
          this._snackBar.openSnackBar("Guardian Creation was Faild");
        },
        complete: () => console.info('complete')
    })
  }

  getGuardians(){
    //     let response= this.guardianCache.get(Object.values(this.guardianParams).join('-'));
    // if(response){
    //   return of(response);
    // }

    return getPaginatedResult<GuardianDto[]>(this.baseUrl + 'Guardian/GetGuardian', this.guardianParams.getHttpParams(), this.http)
      .pipe(map(response => {
      //  this.guardianCache.set(Object.values(this.guardianParams).join('-'),response);
        return response;
      }))
  }

 getGuardianById(id: number){
  return  this.http.get<GuardianDto>(this.baseUrl+'Guardian/GetGuardian/'+id)
  .pipe(map(response=>{
    this.guardian= response;
    return this.guardian
  }));

  }
}