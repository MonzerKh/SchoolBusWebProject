import { PaginationSource } from 'src/app/models/pagination';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusCompanyDto } from 'src/app/models/busCompanyDto';
import { BusCompanyParams } from 'src/app/models/busCompanyParams';

import { BusCompanyService } from 'src/app/services/bus-company.service';

@Component({
  selector: 'app-bus-company-list',
  templateUrl: './bus-company-list.component.html',
  styleUrls: ['./bus-company-list.component.scss']
})
export class BusCompanyListComponent   implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BusCompanyDto>;

  BusCompanys!: BusCompanyDto[];
  pagination!: PaginationSource;
  busCompanyParams: BusCompanyParams= new BusCompanyParams();

  dataSource!: BusCompanyDto[];
  subscribe!: Subscription;
  id!: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'company', 'address', 'phone', 'logoPath', 'webSiteUrl', 'edit'];


  constructor(private busCompanyService: BusCompanyService,private route: ActivatedRoute, private router: Router){
    // this.dataSource = new SchoolDataTableDataSource();
  }

  ngOnInit(): void {
    this.loadBusCompanys();
  }

  loadBusCompanys() {
    this.busCompanyService.setBusCompanyParams(this.busCompanyParams);
    this.busCompanyService.getBusCompany().subscribe(response => {

      this.dataSource = response.result;
      this.pagination = response.Pagination;
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  pageChanged(event: any) {
    this.busCompanyParams.Pagination.currentPage = event.page;
    this.busCompanyService.setBusCompanyParams(this.busCompanyParams);
    this.loadBusCompanys();
  }

  onClickedRow(BusCompany:BusCompanyDto){
    this.id= BusCompany.id;
    console.log(BusCompany.id);
  }

  onAddBusCompany(){
    // this.router.navigate(['../school-register/new'], {relativeTo: this.route});
  }

  onEditBusCompany(BusCompany:BusCompanyDto){
    this.id= BusCompany.id;
    this.router.navigate(['../busCompany/edit/'+this.id], {relativeTo: this.route});
  }

  findBusCompanyByName(school_Name: HTMLInputElement){
    this.applyeFilter(school_Name.value);
  }

  applyeFilter(filterValue: string){
    filterValue= filterValue.trim();
    filterValue= filterValue.toLowerCase();
    // this.data = filterValue;
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
