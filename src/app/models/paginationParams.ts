import { HttpParams } from "@angular/common/http";


export class PaginationParams{
  pageNumber!: number;
  pageSize!: number;

  constructor(){}
  getPaginationHeaders() {
    let params = new HttpParams();
    // if(!this.pageNumber){  params = params.append('pageNumber', this.pageNumber.toString());}
    // if(!this.pageSize){  params = params.append('pageSize', this.pageSize.toString());}
    // params = params.append('pageNumber', this.pageNumber.toString());
    // params = params.append('pageSize', this.pageSize.toString());

    return params;
  }
}
