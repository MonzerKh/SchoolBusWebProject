import { PaginationSource } from './pagination';

import { HttpClient, HttpParams } from '@angular/common/http';

export class BusParams {
  number!: string;
  marka!: string;
  capacity!: number;
  minimum!: number;
  large!: number;
  busCompany_Id!: number;
  company!: string;

  Pagination!:PaginationSource;

  constructor() {

    this.Pagination = new PaginationSource();
  }

  getHttpParams() {
    let Params = this.Pagination.getPaginationHeaders();

    if (this.number) { Params = Params.append('number', this.number.toString()); }
    if (this.marka) { Params = Params.append('marka', this.marka.toString()); }
    if (this.company) { Params = Params.append('company', this.company.toString()); }
    if (this.capacity) { Params = Params.append('capacity', this.capacity.toString()); }
    if (this.large) { Params = Params.append('large', this.large.toString()); }
    if (this.minimum) { Params = Params.append('minimum', this.minimum.toString()); }
    if (this.busCompany_Id) { Params = Params.append('busCompany_Id', this.busCompany_Id.toString()); }

    return Params;
  }

  setPagination(page:PaginationSource){
    this.Pagination.currentPage = page.currentPage;
    this.Pagination.totalItems = page.totalItems;
    this.Pagination.totalPages = page.totalPages;
    this.Pagination.itemsPerPage = page.itemsPerPage;
  }
}
