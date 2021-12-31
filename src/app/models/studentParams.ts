import { PaginationParams } from './paginationParams';


export class StudentParams extends PaginationParams{
  full_Name! :string;
  address! :string;
  email! :string;
  phone! :string;

  constructor() {
    super();
  }

  getHttpParams( ) {
    let studentParams=this.getPaginationHeaders();

    // if(!this.full_Name){  studentParams = studentParams.append('full_Name', this.full_Name.toString());}
    // if(!this.address){  studentParams = studentParams.append('address', this.address.toString());}
    // if(!this.email){  studentParams = studentParams.append('email', this.email.toString());}
    // if(!this.phone){  studentParams = studentParams.append('phone', this.phone.toString());}
    // if(!this.pageNumber){  studentParams = studentParams.append('pageNumber', this.pageNumber.toString());}
    // if(!this.pageSize){  studentParams = studentParams.append('pageSize', this.pageSize.toString());}

    return studentParams;
  }
}
