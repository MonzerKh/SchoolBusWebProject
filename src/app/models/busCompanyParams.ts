import { PaginationParams } from './paginationParams';


export class BusCompanyParams extends PaginationParams{
  company! :string;
  address! :string;
    email! :string;
  phone! :string;

  constructor() {
    super();
  }

  getHttpParams( ) {
    let busCompanyParams=this.getPaginationHeaders();

    return busCompanyParams;
  }
}
