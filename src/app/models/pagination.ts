import { DataSource } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

export class PaginationSource {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(){
    this.currentPage = 0;
    this.itemsPerPage = 7;
  }

  getPaginationHeaders() {
    let params = new HttpParams();
     if(this.currentPage ){  params = params.append('pageNumber', this.currentPage.toString());}
     if(this.itemsPerPage){  params = params.append('pageSize', this.itemsPerPage.toString());}
    return params;
  }
}

export class PaginatedResult<T> extends PaginationSource{
  result!: T;
  Pagination!:PaginationSource;
 // dataSource! :  MatTableDataSource<T>

  constructor(){
    super();
   //  this.dataSource = new MatTableDataSource();
   //  this.dataSource.data
    //this.Pagination = new PaginationSource();
  }

}

