import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationParams } from './paginationParams';


export class GuardianParams extends PaginationParams{
  gardian_Name! :string;
  address! :string;
  email! :string;
  phone! :string;

  constructor() {
    super();
  }

  getHttpParams( ) {
    let guardianParams=this.getPaginationHeaders();

    // if(!this.gardian_Name){  guardianParams = guardianParams.append('gardian_Name', this.gardian_Name.toString());}
    // if(!this.address){  guardianParams = guardianParams.append('address', this.address.toString());}
    // if(!this.email){  guardianParams = guardianParams.append('email', this.email.toString());}
    // if(!this.phone){  guardianParams = guardianParams.append('phone', this.phone.toString());}
    // if(!this.pageNumber){  guardianParams = guardianParams.append('pageNumber', this.pageNumber.toString());}
    // if(!this.pageSize){  guardianParams = guardianParams.append('pageSize', this.pageSize.toString());}

    return guardianParams;
  }
}
