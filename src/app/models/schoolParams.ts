import { PaginationSource } from './pagination';

import { HttpClient, HttpParams } from '@angular/common/http';

export class SchoolParams {
  school_Name!: string;
  address!: string;
  manager!: string;
  phone!: string;

  Pagination!:PaginationSource;

  constructor() {

    this.Pagination = new PaginationSource();
  }

  getHttpParams() {
    let Params = this.Pagination.getPaginationHeaders();

    if (this.school_Name) { Params = Params.append('school_Name', this.school_Name.toString()); }
    if (this.address) { Params = Params.append('address', this.address.toString()); }
    if (this.manager) { Params = Params.append('manager', this.manager.toString()); }
    if (this.phone) { Params = Params.append('phone', this.phone.toString()); }

    return Params;
  }

  setPagination(page:PaginationSource){
    this.Pagination.currentPage = page.currentPage;
    this.Pagination.totalItems = page.totalItems;
    this.Pagination.totalPages = page.totalPages;
    this.Pagination.itemsPerPage = page.itemsPerPage;
  }
}

