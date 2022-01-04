import { PaginationSource } from 'src/app/models/pagination';


export class StudentParams {
  full_Name! :string;
  address! :string;
  email! :string;
  phone! :string;
  national_Number!:number;



  Pagination!:PaginationSource;
  constructor() {
    this.Pagination = new PaginationSource();
  }

  getHttpParams() {
    let Params = this.Pagination.getPaginationHeaders();

    if (this.full_Name) { Params = Params.append('full_Name', this.full_Name.toString()); }
    if (this.address) { Params = Params.append('address', this.address.toString()); }
    if (this.email) { Params = Params.append('email', this.email.toString()); }
    if (this.phone) { Params = Params.append('phone', this.phone.toString()); }
    if (this.national_Number) { Params = Params.append('national_Number', this.national_Number.toString()); }

    return Params;
  }

  setPagination(page:PaginationSource){
    this.Pagination.currentPage = page.currentPage;
    this.Pagination.totalItems = page.totalItems;
    this.Pagination.totalPages = page.totalPages;
    this.Pagination.itemsPerPage = page.itemsPerPage;
  }
}
