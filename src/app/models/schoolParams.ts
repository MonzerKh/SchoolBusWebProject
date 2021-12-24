
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationParams } from './paginationParams';


export class SchoolParams extends PaginationParams{
  school_Name! :string;
  address! :string;
  manager! :string;
  phone! :string;

  constructor() {
    super();
  }

  getHttpParams( ) {
    let schoolParams=this.getPaginationHeaders();

    // if(!this.school_Name){  schoolParams = schoolParams.append('school_Name', this.school_Name.toString());}
    // if(!this.address){  schoolParams = schoolParams.append('address', this.address.toString());}
    // if(!this.manager){  schoolParams = schoolParams.append('manager', this.manager.toString());}
    // if(!this.phone){  schoolParams = schoolParams.append('phone', this.phone.toString());}
    // if(!this.pageNumber){  schoolParams = schoolParams.append('pageNumber', this.pageNumber.toString());}
    // if(!this.pageSize){  schoolParams = schoolParams.append('pageSize', this.pageSize.toString());}

    return schoolParams;
  }
}

